import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  constructor(public globalService: GlobalService) {}

  makeCustomPopup(data: any): string {
    return (
      `` +
      `<div>Country: ${
        data.properties.country ? data.properties.country : '/'
      }</div>` +
      `<div>City: ${data.properties.city ? data.properties.city : '/'}</div>` +
      `<div>Type: ${data.properties.type ? data.properties.type : '/'}</div>` +
      `<div>Client: ${
        data.properties.client ? data.properties.client : '/'
      }</div>` +
      `<div>Short name: ${
        data.properties.shortName ? data.properties.shortName : '/'
      }</div>` +
      `<div>Land(sqm): ${
        data.properties.land ? data.properties.land : '/'
      }</div>` +
      `<div>Value(eur): ${
        data.properties.value ? data.properties.value : '/'
      }</div>`
    );
    // `<div><button (click)='`+ this.globalService.globalServiceTestFunc() +`'</button></div>`
    // return `` +
    //   `<img src="${ data.properties.image }" style="display: flex; width: 100%; margin-bottom: 10px;"></img>` +
    //   `<div>Adresa: ${ data.properties.street }</div>` +
    //   `<div>Grad: ${ data.properties.city }</div>` +
    //   `<div>Kvadratura: ${ data.properties.size }</div>`
  }
}
