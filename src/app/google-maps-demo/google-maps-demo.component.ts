import {Component, OnInit, ViewChild} from '@angular/core'
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps'
import {FileUploadService} from "../shared/services/file-upload.service";


@Component({
  selector: 'google-maps-demo',
  templateUrl: './google-maps-demo.component.html',
})
export class GoogleMapsDemoComponent implements OnInit {

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap
  @ViewChild(MapInfoWindow, {static: false}) info: MapInfoWindow

  constructor(private fileUploadService: FileUploadService) {
  }

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  }
  markers: Array<any> = [];
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.fileUploadService.subject.subscribe(res => {
      this.markers = res;
    });
  }

  zoomIn() {
    this.zoom++
  }

  zoomOut() {
    this.zoom--
  }

  click(event: google.maps.MapMouseEvent) {
    // Close the current InfoWindow.
    //this.info.close();
    console.log(JSON.stringify(event.latLng.toJSON(), null, 2))
    //this.info.open(map);
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker() {
    //this.fileUploadService.getSelectedDataMap().forEach(element => this.markers.push(element));
  }

  openInfo(marker: MapMarker,
           content: any) {
    this.infoContent = content
    this.info.open(marker)
  }
}
