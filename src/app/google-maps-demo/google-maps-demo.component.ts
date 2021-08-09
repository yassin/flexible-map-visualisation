import {Component, OnInit, ViewChild} from '@angular/core'
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps'


@Component({
  selector: 'google-maps-demo',
  templateUrl: './google-maps-demo.component.html',
})
export class GoogleMapsDemoComponent implements OnInit {
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap
  @ViewChild(MapInfoWindow, {static: false}) info: MapInfoWindow

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
  markers: Array<any> = []
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
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


    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        // @ts-ignore
        color: '#' + parseInt(Math.random() * 0xffffff).toString(16),
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      //options: {
        //animation: google.maps.Animation.BOUNCE,
      //},
    })
  }

  openInfo(marker: MapMarker,
           content:any) {
    this.infoContent = content
    this.info.open(marker)
  }
}
