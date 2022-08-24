import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GlobalService } from './global.service';
import { PopUpService } from './pop-up.service';
import { WindGeneratorDeviceService } from './wind-generator-device.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  myMarkers: string = '/assets/data/data.geojson';
  markerInfo = {};
  markerChange: Subject<any> = new Subject<any>();

  public isMarkerSelected: boolean = false;
  isMarkerSelectedChange: Subject<any> = new Subject<any>();

  public refresh: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient,
    private popupService: PopUpService,
    private globalService: GlobalService,
    private windGeneratorService: WindGeneratorDeviceService
  ) {}

  getAllGenerators(): Observable<any>
  {
   return this.windGeneratorService.GetList(null);
  }

  updateMarkerInfo(v: any, i:any, marker:any, lat:any, lon:any) {
    console.warn('marker',v);
    marker.on('click', () => {
      this.markerInfo = v;
      console.log(this.markerInfo);

      this.markerInfo = {
        index: i,
        id: v.Id,
        country: v.Country,
        city: v.City,
       // type: v.type,
       // client: v.client,
        value: v.ValueDec,
        description: v.Description,
        name: v.Name,
      //  land: v.land,
      //  buildingSize: v.buildingSize,
       // additionalInfo: v.additionalInfo,
        coordinates: [lat, lon],
         lat: lat,
         lon: lon,
         ParentUserId: v.ParentUserId,
         ParentWindGeneratorTypeId: v.ParentWindGeneratorTypeId
     //   images: v.images,
     //   documents: v.documents,
     //   plans: v.plans,
     //   connectedProjects: v.connectedProjects,
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
