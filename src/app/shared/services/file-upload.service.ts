import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {FileUpload} from '../models/file-upload.model';
import * as deepEqual from "fast-deep-equal";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private _selectedDataMap: Array<any> = [];
  private basePath = '/uploads';
  private dataMap: Array<any> = [];

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  subject = new Subject<Array<any>>();


  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  readFile(file: File) {
    var fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        console.log(JSON.parse(fileReader.result));
        let temp: Array<any>;
        temp = JSON.parse(fileReader.result);
        this.dataMap.push(temp);
      }
    };
    fileReader.readAsText(file);
  }

  selectDataMap(index: number) {
    this._selectedDataMap = this._selectedDataMap.concat(this.dataMap[index]);
    this.subject.next(this._selectedDataMap);
  }

  removeDataMap(index: number) {
    // @ts-ignore
    this.dataMap[index].forEach(element => {
      this._selectedDataMap.forEach((item, placement, object) => {
        // @ts-ignore
        if (deepEqual(element, item)) {
          object.splice(placement, 1);
        }
      })
    })
    this.subject.next(this._selectedDataMap);
  }

  get selectedDataMap(): Array<any> {
    return this._selectedDataMap;
  }


  clearSelectedDataMap() {
    this._selectedDataMap.splice(0, this._selectedDataMap.length);
    this.subject.next(this._selectedDataMap);
  }
}
