import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, Subject } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { MarkerService } from 'src/app/services/marker.service';
import $ from "jquery"; 
import { WindGeneratorConfigComponent } from '../modals/wind-generator-config/wind-generator-config.component';
import { WindGeneratorDeviceService } from 'src/app/services/wind-generator-device.service';
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { MyAccountComponent } from '../my-account/my-account.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  title = 'nekretnine-app';

  @ViewChild('left', { static: true }) leftSidenav:any;
  @ViewChild('right', { static: true }) rightSidenav:any;
  emitRealEstates: Subject<void> = new Subject<void>();
  emitLeftSidebarWidth: Subject<any> = new Subject<any>();
  emitInvalidateSizeMap: Subject<any> = new Subject<any>();
  emitCenterMarkers: Subject<any> = new Subject<any>();

  totalLength: any;
  page: number = 1;

  realEstates: DtoWindGeneratorDevice[] = [];

  options: FormGroup;
  isOpened: boolean = false;

  markerInfo: any;
  // _subscriptionMarkerInfo:any;
  showMarkerInfoBlock: boolean;

  filters = <any>{
    city: '',
    landFrom: null,
    landTo: null,
    buildingSize: null,
    value: null,
    selectedProjectFilter: '',
  };

  realEstateFilters: FormGroup;

  // static projs
  projectsList: any[] = [];

  projects = <any>[];

  rightSidenavDisplayedColumns: string[] = [
    'country',
    'city',
    'type',
    'client',
    'shortName',
    'description',
    'land',
    'buildingSize',
    'value',
    'additionalInfo',
  ];

  //autofill input
  filterAuto = new FormControl();
  optionsF: string[] = ['Novi Sad', 'Beograd', 'Kragujevac', 'Subotica', 'Nis'];
  filteredOptions: Observable<string[]>;

  eventSubjectInfoBox: Subject<void> = new Subject<void>();

  clicks = 0;
  leftSidenavOpened: boolean = true;
  rightSidenavOpened: boolean = false;
  rightSideFullscreen: boolean = false;

  constructor(
    fb: FormBuilder,
    public dialog: MatDialog,
    private markerService: MarkerService,
    private globalService: GlobalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private windGeneratorService: WindGeneratorDeviceService
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });

    this.markerInfo = this.markerService.markerInfo;
    this.markerService.markerChange.subscribe((res) => {
      this.markerInfo = res;
      this.showMarkerInfoBlock = true;
    });

    this.showMarkerInfoBlock = this.markerService.isMarkerSelected;
    this.markerService.isMarkerSelectedChange.subscribe((res) => {
      this.showMarkerInfoBlock = res;
    });

    this.markerService.refresh.subscribe(res=>{
      console.warn('aaaaaaaaaaaaaaa',res);
      this.getAllGenerators();
    })
  }

  ngOnInit() {
    this.realEstateFilters = this.formBuilder.group({
      city: [''],
      landFrom: [null, Validators.min(0)],
      landTo: [null, Validators.min(0)],
      buildingSizeFrom: [null, Validators.min(0)],
      buildingSizeTo: [null, Validators.min(0)],
      valueFrom: [null, Validators.min(0)],
      valueTo: [null, Validators.min(0)],
      selectedProjectFilter: [null],
    });

    console.log('dashboard this.route');
    console.log(this.route);

    console.log('dashboard cita global marker info');
    //console.log(this.globalService.globalMarkerInfo);

    console.log('rl', this.realEstateFilters);

   // this.getRealEstates(null);
  //  this.getProjects();

    this.filteredOptions = this.filterAuto.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    // this.projectsList = [
    //   { value: null, viewValue: 'None' },
    //   { value: 'proj1', viewValue: 'Project 1' },
    //   { value: 'proj2', viewValue: 'Project 2' },
    // ];

    this.getAllGenerators();
  }

  getAllGenerators(){
    console.warn('getAllGenerators ');
    this.windGeneratorService.GetList(null).subscribe((res:any) => {
      this.emitRealEstates.next(<any>res.Value);
      this.realEstates = res.Value;
    console.warn('all ', res);
    });
  }

  ngAfterViewInit() {
    var tmpleft = $('#leftSidenav').width();
    // console.log('dashboard left width', tmpleft);
    this.emitLeftSidebarWidth.next(tmpleft);
  }

  // getRealEstates(realEstateFilters) {
  //   this.apifb.getRealEstates(realEstateFilters).subscribe((res) => {
  //     // console.log('RealEstate', res);
  //     this.emitRealEstates.next(<any>res);
  //     this.realEstates = res;
  //     console.log('realEstates', this.realEstates);
  //   });
  // }

  // getProjects() {
  //   this.globalService.getProjects().subscribe((res) => {
  //     // console.log(res);
  //     this.projects = res;
  //   });
  // }

  openSidebar() {
    setTimeout(() => {
      this.leftSidenav.toggle();
    }, 700);
  }

  openWindGenerator(e:any) {
    console.warn('openWindGenerator');
    const dialogRef = this.dialog.open(WindGeneratorConfigComponent, {
      width: '1000px',
      data: e,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.markerService.refresh.next(true);
      
    });
  }

  addNewWind(e:any){
    const dialogRef = this.dialog.open(WindGeneratorConfigComponent, {
      width: '1000px',
      data: e,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined) {
        if (result.formData != null && result.formData != undefined) {

          let imageList = <any>[];
          let documentList =  <any>[];
          let planList =  <any>[];

          if (result.formData.images != null && result.formData.images != undefined) {
            let tmpImages = result.formData.images;
            // tmpImages = tmpImages.replace('/n', '');
            // tmpImages = tmpImages.replace('/t', '');
            // tmpImages = tmpImages.replace(' ', '');
            tmpImages.split('\n').forEach((image:any) => {
              if (image != '') {
                imageList.push({ source: image });
              }
            });
          }

          if (result.formData.documents != null && result.formData.documents != undefined) {
            let tmpDocuments = result.formData.documents;
            tmpDocuments.split('\n').forEach((document:any) => {
              if (document != '') {
                let extension = document.substr(document.lastIndexOf('.') + 1);
                documentList.push({ source: document, extension: extension });
              }
            });
          }

          if (result.formData.plans != null && result.formData.plans != undefined) {
            let tmpPlans = result.formData.plans;

            tmpPlans.split('\n').forEach((plan:any) => {
              if (plan != '') {
                planList.push({ source: plan });
              }
            });
          }

          let newRealEstate = {
            coordinates: [result.formData.lat, result.formData.lon],
            country: result.formData.country,
            city: result.formData.city,
            type: result.formData.type,
            client: result.formData.client,
            shortName: result.formData.shortName,
            description: result.formData.description,
            land: result.formData.land,
            buildingSize: result.formData.buildingSize,
            value: result.formData.value,
            additionalInfo: result.formData.additionalInfo,
            street: "",
            images: imageList,
            documents: documentList,
            plans: planList,
            connectedProjects: <any>[]
          };

          this.globalService.createRealEstate(newRealEstate);
         // this.getRealEstates(null);
         this.getAllGenerators();
        }
      }
    });
  }

  filterByValue() {
    let formData = this.realEstateFilters.value;

    if (this.realEstateFilters.invalid) {
      return;
    }

    //this.getRealEstates(formData);
    this.emitCenterMarkers.next('');
    this.eventSubjectInfoBox.next();
  }

  getRealEstates(realEstateFilters:any) {
    this.globalService.getRealEstates(realEstateFilters).subscribe(res => {
      this.emitRealEstates.next(<any>res);
      // console.log(res);
    }, er => {

    })
  }
  resetFilters() {
    // this.filters = {
    //   city: '',
    //   land: null,
    //   buildingSize: null,
    //   value: null,
    //   selectedProjectFilter: null
    // }
   // this.getRealEstates(null);
    this.eventSubjectInfoBox.next();
    this.realEstateFilters.reset();
    // this.initGetRE();
  }

  toggleRightSidenav(e:any) {
    // var rightSidenav = $('#rightSidenavFullscreenToggleButton');
    $('.right-sidenav').css({ width: '50vw' });

    this.rightSidenavOpened = !this.rightSidenavOpened;
    this.rightSidenav.toggle();
    setTimeout(() => {
      this.emitInvalidateSizeMap.next('');
    }, 400);

    $('#rightSidenavFullscreenToggleButton').on('click', () => {
      if (this.rightSidenavOpened) {
        if (this.rightSideFullscreen) {
          $('.right-sidenav').css({ width: '50vw' });
          this.rightSideFullscreen = false;
        } else {
          $('.right-sidenav').css({ width: '100vw' });
          this.rightSideFullscreen = true;
        }
      }
      this.emitInvalidateSizeMap.next('');
    });
  }

  resetWidth() {
    $('.right-sidenav').css({ width: '800px' });
  }

  hideMarkerInfoBox() {
    this.showMarkerInfoBlock = false;
  }

  gotoProjects() {
    // DANAS
   // this.router.navigate(['/projects']);
  }

  // openRealEstateDetails() {
  //   const dialogRef = this.dialog.open(ViewDetailsModalComponent, {
  //     width: '900px',
  //     data: {},
  //     autoFocus: false,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {});
  // }

  // openAddToProject() {
  //   const dialogRef = this.dialog.open(SelectProjectComponent, {
  //     width: '900px',
  //     data: { markerInfo: this.markerInfo },
  //     autoFocus: false,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {});
  // }

  saveToFile() {
    // var tmpObject = JSON.stringify(this.testObject);
    // // tmpObject.push(this.testObject).toString();
    // console.log(tmpObject);
    // var file = new Blob([tmpObject], {type: "application/json;charset=utf-8"})
    // FileSaver.saveAs(file, "reList.json");
  }

  consoleTest() {
    // console.log($('#leftSidenav').width());
  }

  sessionStorageTest() {
    // this.clicks++;
    // sessionStorage.setItem('clickCounter', this.clicks.toString());
    // console.log(sessionStorage.getItem('clickCounter'));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsF.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  //   getLeftSidebarWidth() {
  //     console.log($('#leftSidenav').width());
  //     var tmpleft = $('#leftSidenav').width();
  //     this.emitLeftSidebarWidth.next(tmpleft);
  //  }

  toggleLeftSidenav(event:any) {
    this.leftSidenavOpened = !this.leftSidenavOpened;
    var tmpleft = $('#leftSidenav').width();
    this.emitLeftSidebarWidth.next(tmpleft);
    // console.log(this.leftSidenav.toggle()._animationDoneListener(event));

    this.leftSidenav.toggle();

    setTimeout(() => {
      this.emitInvalidateSizeMap.next('');
    }, 300);
  }

  toggleLeftSidenavDone() {
    var tmpleft = $('#leftSidenav').width();
    if (this.leftSidenav._opened) {
      this.emitLeftSidebarWidth.next({
        left: tmpleft,
        opened: this.leftSidenav._opened,
      });
    } else {
      this.emitLeftSidebarWidth.next({
        left: 0,
        opened: this.leftSidenav._opened,
      });
    }
  }

  gotoUserSettings() {
    //this.router.navigate(['/users']);
  }
  gotoLogout(){
    this.router.navigate(['/login']);
  }

  gotoAccountSettings() {
      const dialogRef = this.dialog.open(MyAccountComponent, {
       width: '400px',
      data: {},
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }

  gotoAuditLog() {
    //this.router.navigate(['/audit-log']);
  }

   openChooseFiltersModal() {
  //   const dialogRef = this.dialog.open(ChooseFiltersComponent, {
  //     // width: '900px',
  //     data: {},
  //     autoFocus: false,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {});
   }

  gotoClients() {
    //this.router.navigate(['/clients']);
  }

  gotoManageUsers() {
   // this.router.navigate(['/users']);
  }
}

