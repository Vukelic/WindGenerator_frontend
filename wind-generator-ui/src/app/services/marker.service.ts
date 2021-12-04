import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalService } from './global.service';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  myMarkers: string = '/assets/data/data.geojson';
  markerInfo = {};
  markerChange: Subject<any> = new Subject<any>();

  public isMarkerSelected: boolean = false;
  isMarkerSelectedChange: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private popupService: PopUpService,
    private globalService: GlobalService
  ) {}

  updateMarkerInfo(v: any, i:any, marker:any, lat:any, lon:any) {
    marker.on('click', () => {
      this.markerInfo = v;
      console.log(this.markerInfo);

      this.markerInfo = {
        index: i,
        id: v.id,
        country: v.country,
        city: v.city,
        type: v.type,
        client: v.client,
        value: v.value,
        description: v.description,
        shortName: v.shortName,
        land: v.land,
        buildingSize: v.buildingSize,
        additionalInfo: v.additionalInfo,
        coordinates: [lat, lon],
        // lat: lat,
        // lon: lon,
        images: v.images,
        documents: v.documents,
        plans: v.plans,
        connectedProjects: v.connectedProjects,
      };

      this.isMarkerSelected = true;
      this.markerChange.next(this.markerInfo);
      this.isMarkerSelectedChange.next(this.isMarkerSelected);
    });
  }

  markerUnselect() {
    this.isMarkerSelected = false;
    this.isMarkerSelectedChange.next(this.isMarkerSelected);
  }
}
