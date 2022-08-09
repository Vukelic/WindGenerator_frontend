import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import L from 'leaflet';
import { GlobalService } from 'src/app/services/global.service';
import { MarkerService } from 'src/app/services/marker.service';


@Component({
  selector: 'app-map-for-selection',
  templateUrl: './map-for-selection.component.html',
  styleUrls: ['./map-for-selection.component.scss']
})
export class MapForSelectionComponent implements OnInit {

  @Output() latlonEmitter: EventEmitter<any[]> = new EventEmitter();

  lonlatToEmit: any;

  private mapForSelection: any;
  mapSearchTerm: string;
  inputSearchField = document.getElementById('inputMapSelectionSearchTerm');
lat: any = 45.2551338;
long: any = 19.8451756;
  constructor(
    private markerService: MarkerService,
    private http: HttpClient,
    private globalService: GlobalService,
    public selectFromMapModal: MatDialogRef<MapForSelectionComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if(this.data.object){
      this.lat = this.data.object.lat;
      this.long = this.data.object.long;
    }
    this.loadMapForSelection();
    this.selectLatLon();
    this.inputSearchMap();
  }

  loadMapForSelection() {
    this.mapForSelection = L.map('mapForSelection', {
      center: [this.lat, this.long],
      zoom: 8,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.mapForSelection);
  }

  passDataToParent() {
    this.latlonEmitter.emit(this.lonlatToEmit);
  }

  searchMap() {
    this.globalService
      .getMapViewFromSearchTerm(this.mapSearchTerm)
      .subscribe((res) => {
        if (res != null && res != undefined && res != []) {
          let cityFromSearch;
          for (let i = 0; i < 1; i++) {
            cityFromSearch = res[0];
          }
          if (cityFromSearch != null && cityFromSearch != undefined) {
            if (
              cityFromSearch.lat != undefined &&
              cityFromSearch.lon != undefined
            ) {
              this.mapForSelection.setView(
                [cityFromSearch.lat, cityFromSearch.lon],
                12
              );
            }
          }
        }
      });
  }

  selectLatLon() {
    this.mapForSelection.on('contextmenu', (event: any) => {
      this.lonlatToEmit = event.latlng;

      this.passDataToParent();
    });
  }

  inputSearchMap() {
    // this.inputSearchField.addEventListener("keyup", function(event) {
    //   // Number 13 is the "Enter" key on the keyboard
    //   if (event.keyCode === 13) {
    //     event.preventDefault();
    //     // this.searchMap();
    //     document.getElementById("searchMapSelectionButton").click();
    //   }
    // });
  }
}

