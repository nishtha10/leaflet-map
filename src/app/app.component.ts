import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'osrtc';
  mapOptions: MapOptions;
  map: Map;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  onMapReady(map: Map): void {
    console.log(map, 'map');
    this.map = map;
    this.map.invalidateSize();
    this.addSampleMarker();
    // this.getLocation();
  }


  private initializeMapOptions(): void{
    this.mapOptions = {
      center: latLng(20.2664438, 85.8309644),
      zoom: 21,
      // zoomSnap: 0.1,
      // zoomControl: true,
      layers: [

        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxNativeZoom: 80,
          minNativeZoom: 5,
          // attribution: 'Map data © OpenStreetMap contributors'
        }),
      ],
      // layers: [grayscale, cities]
    };
    // this.ref.detectChanges();
    this.getLocation();
  }

  private addSampleMarker(): void {
    const marker = new Marker([20.2664438, 85.8309644]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      })
    );
    marker.addTo(this.map);
    // this.getLocation();
  }

  getLocation(): void {
    const  myStyle = {
      color: 'rgb(29, 79, 216)',
      weight: 2,
      opacity: 0.65,
    };
    this.http.get('assets/geoJSON/data.json').subscribe((res: any) => {
      console.log(res, 'res');
      const geojsonFeature = res;
      L.geoJSON(geojsonFeature, {
        style: myStyle,
        onEachFeature: function (feature, featureLayer) {
          featureLayer.bindPopup(feature.properties.name);
        },
      }).addTo(this.map);
      // this.map.setZoom(20);
    });
  }
}


