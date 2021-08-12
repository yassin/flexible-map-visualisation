import {Component, Input, OnInit} from '@angular/core';
import {FileUploadService} from 'src/app/shared/services/file-upload.service';
import {FileUpload} from 'src/app/shared/models/file-upload.model';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: FileUpload;
  @Input() index!: number;

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

  selectFileToShow(event: Event, index: number) {
    // @ts-ignore
    if (event.target.checked) {
      this.uploadService.selectDataMap(index);
    } else {
      this.uploadService.removeDataMap(index);
    }
  }
}
