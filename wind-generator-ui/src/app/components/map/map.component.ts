import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { MarkerService } from 'src/app/services/marker.service';
import * as L from 'leaflet';
import $ from "jquery";
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { RoleKeys, UserServiceService } from 'src/app/services/user.service';
import { DtoWindGeneratorDeviceListResponse } from 'src/app/dto/DtoResponseObjectModels/WindGeneratorDevice/DtoWindGeneratorDeviceListResponse';

const iconRetinaUrl = '/assets/marker-icon-2x.png';
const iconUrl = '/assets/marker-icon.png';
const iconSelectedUrl = '/assets/marker-icon-selected.png';
const personalconUrl = '/assets/personalIcon.png'
const shadowUrl = '/assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

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
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public RoleKeys = RoleKeys;
  
  @ViewChild('resetViewButton', { static: true }) resetViewButton: any;
  private eventsSubscription: Subscription;
  @Input() realEstatesEvent: Observable<any>;
  @Input() dashboardLeftSidebarWidthEvent: Observable<any>;
  @Input() invalidateSizeMapEvent: Observable<any>;
  @Input() centerMapZoomEvent: Observable<any>;
  @Output() addNewRealEstateFromContextMenu = new EventEmitter<any>();
  leftSBW: any;
  leftSBState: any;
  contextMenuVisible = false;
  contextLatlng: any;

  map: any;
  markers: any;
  mapTiles: any;
  lastSelectedMarker: any;
  realestateMapList: any;
  mapSearchTerm: string = '';

  openStreetMap = 'openStreetMap';
  googleMap = 'googleMap';

  mapViewList: any[] = [
    { name: 'Open Street Map', key: 'open' },
    { name: 'Google Map', key: 'google-ter' },
    { name: 'Google Map (Satellite)', key: 'google-sat' },
    { name: 'Google Map (Hybrid)', key: 'google-hybrid' },
  ];

  mapViews = new FormControl(this.mapViewList[0], { updateOn: 'blur' });

  constructor(
    private markerService: MarkerService,
    private globalService: GlobalService,
    public userService: UserServiceService
  ) {
    this.mapViews.valueChanges.subscribe((item) => {
      this.changeLayoutTo(item);
    });

    // this.realestateMapList = this.globalService.globalREList;
    // this.globalService.globalREListChange.subscribe((res) => {
    //   this.realestateMapList = res;
    //   this.mapUpdates(this.realestateMapList);
    // });
  }

  ngOnInit() {
    this.initializeMap(null);

    this.eventsSubscription = this.realEstatesEvent.subscribe((data: any) => {
      // console.log('RELIST on Map', data)

      this.mapUpdatesAfterNew(data);
      this.realestateMapList = data;
    });

    this.eventsSubscription = this.dashboardLeftSidebarWidthEvent.subscribe(
      (res: any) => {
        // console.log('res', res);
        this.leftSBW = res;
        // this.leftSBState = res.opened;
        this.map.invalidateSize();
      }
    );

    this.eventsSubscription = this.invalidateSizeMapEvent.subscribe((res) => {
      this.map.invalidateSize();
    });

    this.eventsSubscription = this.centerMapZoomEvent.subscribe((res) => {
      // this.resetView();
    });


  }

  ngAfterViewInit(): void {}

  // First initialization of the map inside of component
  initializeMap(reList: any) {
    // console.log(reList)

    this.map = L.map('mapid', {
      center: [44.461785946875985, 20.66525214413524],
      zoom: 8,
      minZoom: 3,
    });

    this.changeLayoutTo(this.mapViewList[2]);

    this.markers = L.layerGroup().addTo(this.map);

    this.unselectMarkerOnMapClick();
    this.createBoundsAndMoveView(reList);
    this.map.invalidateSize();

    this.customContextMenu(this.map);

    // console.log(this.map)
  }

  mapUpdates(reList: any) {
    this.markers.clearLayers();
    this.makeCustomMarkers(this.map, reList); // refresh markera
    this.createBoundsAndMoveView(reList);
    this.map.invalidateSize();
  }

  mapUpdatesAfterNew(reList: any) {
    this.markers.clearLayers();
    this.makeCustomMarkers(this.map, reList); // refresh markera
    // this.createBoundsAndMoveView(reList);
    this.map.invalidateSize();
  }

  customContextMenu(map: any) {
    var info = L.control;
    // console.log(info)

    var contextMenu = $('#customContextMenu');
    var mapWindow = $('#mapid');

    const toggleMenu = (command: any) => {
      contextMenu.css(
        command === 'show' ? { display: 'block' } : { display: 'none' }
      );
      this.contextMenuVisible = !this.contextMenuVisible;
    };

    const setPosition = (origin: any) => {
      // contextMenu.css({left: `${left}px`})
      // contextMenu.css({top: `${top}px`})

      // console.log('origin', origin);

      // if ( (origin.windowWidth - origin.clickedX) < origin.menuWidth ) {
      //   contextMenu.css({left: `${origin.windowWidth - origin.clickedX}px`});
      // } else {
      //   contextMenu.css({left: `${origin.clickedX}px`});
      // }

      // if ( (origin.windowHeight - origin.clickedY) < origin.menuHeight ) {
      //   contextMenu.css({top: `${origin.windowHeight - origin.menuHeight}px`});
      // } else {
      //   contextMenu.css({top: `${origin.clickedY}px`});
      // }

      contextMenu.css({ left: `${origin.clickedX}px` });
      contextMenu.css({ top: `${origin.clickedY}px` });

      toggleMenu('show');
    };

    map.on('contextmenu', (e: any) => {
      e.originalEvent.preventDefault();
      this.contextLatlng = e.latlng;

      // console.log('clicked the map', e)

      var clickedX = e.originalEvent.pageX;
      var clickedY = e.originalEvent.pageY;
      var menuWidth = contextMenu.width() + 4;
      var menuHeight = contextMenu.height() + 4;
      var windowWidth = mapWindow.width();
      var windowHeight = mapWindow.height();

      // console.log(windowWidth);

      const origin = {
        clickedX,
        clickedY,
        menuWidth,
        menuHeight,
        windowWidth,
        windowHeight,
      };
      setPosition(origin);
      // return false;
    });

    $(document).on('mousedown', (e) => {
      if (this.contextMenuVisible) {
        toggleMenu('hide');
      }
    });

    map.on('zoomstart', () => {
      if (this.contextMenuVisible) {
        toggleMenu('hide');
      }
    });

    map.on('dragstart', () => {
      if (this.contextMenuVisible) {
        toggleMenu('hide');
      }
    });

    // Menu functions

    $('#addMarker').on('mousedown', (e) => {
      this.addNewRealEstateFromMap();
    });

    $('#checkPower').on('mousedown', (e) => {
      this.checkPowerFromMap();
    });

    $('#zoomIn').on('mousedown', (e) => {
      this.map.zoomIn();
    });

    $('#zoomOut').on('mousedown', (e) => {
      this.map.zoomOut();
    });

    $('#centerMarkers').on('mousedown', (e) => {
      this.resetView();
    });
  }

  checkPowerFromMap(){
    
  }

  addNewRealEstateFromMap() {
    this.addNewRealEstateFromContextMenu.emit(this.contextLatlng);
    let contextMenu = $('.custom-context-menu');

    const toggleMenu = (command:any) => {
      contextMenu.css(
        command === 'show' ? { display: 'block' } : { display: 'none' }
      );
      this.contextMenuVisible = !this.contextMenuVisible;
    };

    if (this.contextMenuVisible) {
      toggleMenu('hide');
    }
  }

  // Creating markers and adding them to marker layerGroup + adds info from marker to info box through markerService
  makeCustomMarkers(map: L.Map, realEstateMap: DtoWindGeneratorDevice[]): void {
    this.markerService.getAllGenerators().subscribe((response: any)=>{
      console.warn('response',response);
      if(response.Success){
      var realEstateMapList = response.Value;
      if (realEstateMapList && realEstateMapList.length > 0) {
        realEstateMapList.forEach((re:any, i:any, arr:any) => {

          
          console.warn('reeee', re);
          const lat = re.GeographicalLatitude;
          const lon = re.GeographicalLongitude;
          const val = re.ValueDec;
          //const marker = L.marker([lat, lon], { setForceZIndex: 1 }).addTo(
           const marker = L.marker([lat, lon], { }).addTo( this.markers);
          if(re.ParentUserId == this.userService.currentUser.Id){
           marker.setIcon(personalconUrlDefault)
           }
         // this.map.invalidateSize();
          // When marker is clicked, icon is changed to iconSelected, and it's placed on top of all markers to be visible at all zoom levels
          if(re.ParentUserId == this.userService.currentUser.Id){            
            marker.on('click', () => {
              // CLICK NA MARKER
              this.markers.eachLayer(function (layer:any) {
                layer.setZIndexOffset(1);
                layer.setIcon(personalconUrlDefault);
                // this.map.invalidateSize();
              });
              marker.setIcon(iconSelected);
              marker.setZIndexOffset(1000);
              map.panTo(marker.getLatLng());
    
              this.map.invalidateSize();
   
            });
          }else{
            marker.on('click', () => {
              // CLICK NA MARKER
              this.markers.eachLayer(function (layer:any) {
                layer.setZIndexOffset(1);
                layer.setIcon(iconDefault);
                // this.map.invalidateSize();
              });
              marker.setIcon(iconSelected);
              marker.setZIndexOffset(1000);
              map.panTo(marker.getLatLng());
    
              this.map.invalidateSize();
   
            });
          }
        
  
          // When clicked on map outside of marker, icon is set back to default
          if(re.ParentUserId != this.userService.currentUser.Id){
            map.on('click', () => {
              this.markers.eachLayer(function (layer:any) {
                marker.setZIndexOffset(1);
                layer.setIcon(iconDefault);
                // this.map.invalidateSize();
              });
              marker.setIcon(iconDefault);
    
              this.map.invalidateSize();
            });
           }else{
            map.on('click', () => {
              this.markers.eachLayer(function (layer:any) {
                marker.setZIndexOffset(1);
                layer.setIcon(personalconUrlDefault);
                // this.map.invalidateSize();
              });
              marker.setIcon(personalconUrlDefault);
    
              this.map.invalidateSize();
            });
           }
          
        
          this.markerService.updateMarkerInfo(re, i, marker, lat, lon);
        });
        
      }
    }
    });

    
  }

  // Creating bounds around filtered markers and centering them in view
  createBoundsAndMoveView(reList: any) {
    if (reList && reList.length > 0) {
      var coordListForBounds = <any>[];
      reList.forEach((item: any) => {
    //    coordListForBounds.push(item.coordinates);
    coordListForBounds.push([item.GeographicalLatitude, item.GeographicalLongitude]);
      });
      console.warn('reList',reList);
      var myBounds = new L.LatLngBounds(coordListForBounds);
      this.map.fitBounds(myBounds, { padding: [100, 200] });
    }
    this.map.invalidateSize();
  }

  // Unselects marker (hides info box thats showing while marker is selected)
  unselectMarkerOnMapClick() {
    this.map.on('click', () => {
      this.markerService.markerUnselect();
    });
  }

  refreshMarkerWhenDeselected(marker: any, reList: any) {
    this.map.on('click', () => {
      this.markerService.markerUnselect();
      // this.mapUpdates(reList);
    });
  }

  resetView() {
    if (this.realestateMapList != null) {
      var coordListForBounds = <any>[];
      this.realestateMapList.forEach((item: any) => {
      //  coordListForBounds.push(item.coordinates);
      coordListForBounds.push([item.GeographicalLatitude, item.GeographicalLongitude]);
      });

      var myBounds = new L.LatLngBounds(coordListForBounds);
      this.map.fitBounds(myBounds, { padding: [100, 100] });
    }
    this.map.invalidateSize();
  }

  // Adds pin on map
  addPin() {
    this.map.on('contextmenu', function (event: any) {
      // console.log("user right-clicked on map coordinates: " + event.latlng.toString());
      L.marker(event.latlng).addTo(event.target);
    });
  }

  testConsole() {
    // console.log('popup opened? ', this.map.popup.isOpen());
  }

  changeLayoutTo(view: any) {
    const openStreetMapTiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    const googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    const googleSat = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    const googleTerrain = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    const googleHybrid = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 19,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );

    if (this.mapTiles) {
      this.mapTiles.removeFrom(this.map);
    }

    if (view.key == 'open') {
      this.mapTiles = openStreetMapTiles.addTo(this.map);
    } else if (view.key == 'google-ter') {
      this.mapTiles = googleTerrain.addTo(this.map);
    } else if (view.key == 'google-sat') {
      this.mapTiles = googleSat.addTo(this.map);
    } else if (view.key == 'google-streets') {
      this.mapTiles = googleStreets.addTo(this.map);
    } else if (view.key == 'google-hybrid') {
      this.mapTiles = googleHybrid.addTo(this.map);
    } else {
      this.mapTiles = openStreetMapTiles.addTo(this.map);
    }
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
            this.map.setView(
              [cityFromSearch.lat, cityFromSearch.lon],
              12
            );
          }
        }
      }
    });
    // if (this.mapSearchTerm == '') {
    //   this.resetView();
    // } else {
    //   this.globalService
    //     .getMapViewFromSearchTerm(this.mapSearchTerm)
    //     .subscribe((res) => {
    //       // console.log('%cresults from search term map','color: cyan;')
    //       // console.log(res);
    //       if (res != null && res != undefined && res != []) {
    //         // console.log(res);
    //         let cityFromSearch;
    //         for (let i = 0; i < 1; i++) {
    //           cityFromSearch = res[0];
    //         }
    //         // console.log(cityFromSearch);
    //         if (cityFromSearch != null && cityFromSearch != undefined) {
    //           if (
    //             cityFromSearch.lat != undefined &&
    //             cityFromSearch.lon != undefined
    //           ) {
    //             this.map.setView([cityFromSearch.lat, cityFromSearch.lon], 12);
    //           }
    //         }
    //       }
    //     });
    // }
  }
}

