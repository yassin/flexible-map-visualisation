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

  zoom = 9
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 5000,
    minZoom: 8,
  }
  markers: Array<any> = [];
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      // @ts-ignore
      this.center = {
        // @ts-ignore
        lat: "49.59913037902855",
        // @ts-ignore
        lng: "6.133036534410118",
      }
    });
    this.fileUploadService.subject.subscribe(res => {
      this.markers = res;
    });
  }


  click(event: google.maps.MapMouseEvent) {
    // Close the current InfoWindow.
    //this.info.close();
    console.log(JSON.stringify(event.latLng.toJSON(), null, 2))
    //this.info.open(map);
  }



  openInfo(marker: MapMarker,
           content: any) {
    this.infoContent = content
    this.info.open(marker)
  }
}
