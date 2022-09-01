import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import L from 'leaflet';
import { GlobalService } from 'src/app/services/global.service';
import { MarkerService } from 'src/app/services/marker.service';
import { UserServiceService } from 'src/app/services/user.service';

const iconRetinaUrl = '/assets/personalIcon.png';
const personalconUrl = '/assets/personalIcon.png';
const shadowUrl = '/assets/marker-shadow.png';
const iconSelectedUrl = '/assets/marker-icon-selected.png';
const personalconUrlDefault = L.icon({
  iconRetinaUrl,
  iconUrl: personalconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
const iconSelected = L.icon({
  iconUrl: iconSelectedUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

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
  markers: any;
  PersonalStatus: boolean = false;

  constructor(
    private markerService: MarkerService,
    private http: HttpClient,
    private globalService: GlobalService,
    public selectFromMapModal: MatDialogRef<MapForSelectionComponent>, 
    private userService: UserServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.warn('**data',this.data)
    if(this.data.object){
      this.lat = this.data.object.GeographicalLatitude;
      this.long = this.data.object.GeographicalLongitude;
      this.PersonalStatus = true;
    }
    this.loadMapForSelection();
    this.selectLatLon();
    this.inputSearchMap();
    this.addMarker();
  }

  addMarker(){
    this.markers = L.layerGroup().addTo(this.mapForSelection);
    const marker = L.marker([this.lat, this.long], { }).addTo( this.markers);
    if(this.data.object.ParentUserId == this.userService.currentUser.Id)
    {            
      marker.on('click', () => {
        // CLICK NA MARKER
        this.markers.eachLayer(function (layer:any) {
          layer.setZIndexOffset(1);
          layer.setIcon(iconSelected);
          // this.map.invalidateSize();
        });
        marker.setIcon(iconSelected);
        marker.setZIndexOffset(1000);
        this.mapForSelection.panTo(marker.getLatLng());

        this.mapForSelection.invalidateSize();

      });

      this.mapForSelection.on('click', () => {
        this.markers.eachLayer(function (layer:any) {
          marker.setZIndexOffset(1);
          layer.setIcon(iconSelected);
          // this.map.invalidateSize();
        });
        marker.setIcon(iconSelected);

        this.mapForSelection.invalidateSize();
      });
     
      this.markerService.updateMarkerInfo(this.data.object, 0, marker, this.lat, this.long);
    }
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
    if(!this.PersonalStatus){
    this.mapForSelection.on('contextmenu', (event: any) => {
      this.lonlatToEmit = event.latlng;

      this.passDataToParent();
    });
  }
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

