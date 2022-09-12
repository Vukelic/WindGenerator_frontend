import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { DtoWindGeneratorDeviceListResponse } from 'src/app/dto/DtoResponseObjectModels/WindGeneratorDevice/DtoWindGeneratorDeviceListResponse';
import { DtoWindGeneratorDeviceResponse } from 'src/app/dto/DtoResponseObjectModels/WindGeneratorDevice/DtoWindGeneratorDeviceResponse';
import { GlobalService } from 'src/app/services/global.service';
import { MarkerService } from 'src/app/services/marker.service';
import { WindGeneratorDeviceService } from 'src/app/services/wind-generator-device.service';
import { ProfitComponent } from '../../profit/profit.component';
import { SelectLocationMapModalComponent } from '../../select-location-map-modal/select-location-map-modal.component';
import { UserServiceService } from 'src/app/services/user.service';
import { getLocaleExtraDayPeriods } from '@angular/common';
import { WindGeneratorTypeService } from 'src/app/services/wind-generator-type.service';
import { DtoWindGeneratorType } from 'src/app/dto/DtoModels/WindGeneratorType/DtoWindGeneratorType';
@Component({
  selector: 'app-wind-generator-config',
  templateUrl: './wind-generator-config.component.html',
  styleUrls: ['./wind-generator-config.component.scss']
})
export class WindGeneratorConfigComponent implements OnInit {

  typeGenerator:any;
  checkProfitStatus: boolean = false;

  allTypes: any[] = [
    // {Title: "WT1", Angular_FullUrl:"/assets/wt1.JPG",ActiveSelect:false, Price: '1300e'}, 
    // {Title:"WT2",Angular_FullUrl:"/assets/wt2.JPG",ActiveSelect:false,Price: '1600e'},
    // {Title: "WT3",Angular_FullUrl:"/assets/wt3.JPG",ActiveSelect:false,Price: '2400e'},
    // {Title: "WT4",Angular_FullUrl:"/assets/wt4.JPG",ActiveSelect:false,Price: '2600e'},
  //  {Title:  "AC Asynchronous Generators",Angular_FullUrl:"/assets/turbine1.JPG",ActiveSelect:false,Price: '2600'}
  ];
  windForm: FormGroup;
  choiceFromMap: boolean = false;

  // filtersModal = {
  //   client: '',
  //   type: '',
  //   description: '',
  //   landSize: '',
  //   buildingSize: '',
  //   value: '',
  //   lat: '',
  //   lng: '',
  //   address: ''
  // }

  filterSelectionModal: any[] = [
    { value: null, viewValue: 'None' },
    { value: 'choice-1', viewValue: 'Stan' },
    { value: 'choice-2', viewValue: 'Kuca' },
    { value: 'choice-3', viewValue: 'Plac' }
  ];

  //autofill input
  filterAuto = new FormControl();
  optionsF: string[] = ['Novi Sad', 'Beograd', 'Kragujevac', 'Subotica', 'Nis'];
  filteredOptions: Observable<string[]>;

  selectedType: any = null;
  currentWindGenerator: DtoWindGeneratorDevice = new DtoWindGeneratorDevice();
  constructor(
    public addRE: MatDialogRef<WindGeneratorConfigComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog, 
    private globalService: GlobalService,  
    private formBuilder: FormBuilder,
    private windGeneratorService: WindGeneratorDeviceService,
    private markerService: MarkerService,
    public userService: UserServiceService,
    private windTypeService: WindGeneratorTypeService) { }

  ngOnInit() {
    this.getAllTypes();
    this.windForm = this.formBuilder.group({
      country: [],
      city: [],
      name: ['',Validators.required],
      description: [],
      lat: [this.data && this.data.lat ? this.data.lat : null, Validators.required],
      lon: [this.data && this.data.lng ? this.data.lng : null, Validators.required],
    //  typeId: [Validators.required]
     // images: [`assets/gallery/gallery_image1.jpg\nassets/gallery/gallery_image2.jpg\nassets/gallery/gallery_image3.jpg\nassets/gallery/gallery_image4.jpg\nassets/gallery/gallery_image5.jpg\nassets/gallery/gallery_image6.jpg\nassets/gallery/gallery_image7.jpg\nassets/gallery/gallery_image8.jpg`],
    })
    console.warn('data', this.data);
    if(this.data != null && this.data != undefined){
      if(this.data.Id) {
        this.currentWindGenerator = this.data;
        //this.updatePropertiesFromObjectSetToFormGroup(this.windForm, this.currentWindGenerator);
      
        //this.windTypeService.Get(this.currentWindGenerator.ParentWindGeneratorTypeId).subscribe((resp:any)=>{
         // this.currentWindGenerator.ParentWindGeneratorType = resp.Value;
          this.updatePropertiesFromObjectSetToFormGroup(this.windForm, this.currentWindGenerator);
       // });
        
        console.warn('this.currentWindGenerator', this.currentWindGenerator);
      }else{
       
      }

      if(this.data.lat != null && this.data.lat != undefined && this.data.lng != null && this.data.lng != undefined)
      this.globalService.getAdressFromCoords(this.data.lat, this.data.lng)
          .subscribe(res => {
            if(res != null && res != undefined) {
              if(res.address) {
                if(res.address.city) {
                  this.windForm.patchValue({city: res.address.city});  
                }
                if(res.address.country) {
                  this.windForm.patchValue({country: res.address.country});
                }
              }
            }
        });

    this.filteredOptions = this.filterAuto.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    console.warn('selectedType', this.selectedType);

  }




      //ngOnInit(); 
  this.objSetConfigFormSubscription();
  //sa servera
  // this.updatePropertiesFromObjectSetToFormGroup(this.objSetConfigurationForm, this.objSet);
  }

  getAllTypes(){
    this.windTypeService.GetList(null).subscribe((resp:any)=>{
      this.allTypes = resp.Value;
      if(this.allTypes){
        this.allTypes.forEach(element => {
          element.FullPrice = element.BasePrice + element.InstallationCosts;
        });
      }
      this.setType(this.currentWindGenerator.ParentWindGeneratorTypeId);
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsF.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  cancel(){
    this.addRE.close();
  }

  delete(){
    console.log('deletee');
    if(this.currentWindGenerator && this.currentWindGenerator.Id != 0){
      this.windGeneratorService.Delete(this.currentWindGenerator.Id).subscribe(res => {
        this.addRE.close();
        this.markerService.refresh.next(true);
  
       // this.getAllGenerators();
      });
    }
  }
  //#region  forms

  objSetConfigFormSubscription() {
    this.windForm.valueChanges.subscribe(x => {
      setTimeout(() => {
        this.updatePropertiesFromFormGroupToObject(this.windForm, this.currentWindGenerator);
      }, 0);
    });
  }

    updatePropertiesFromFormGroupToObject(formGroup:any, object:DtoWindGeneratorDevice) {
      console.warn('updatePropertiesFromFormGroupToObject');
      if (object) {
        object.Name = formGroup.getRawValue().name;
        object.Description = formGroup.getRawValue().description;
        object.Country = formGroup.getRawValue().country;
        object.City = formGroup.getRawValue().city;
        object.GeographicalLatitude = Number(formGroup.getRawValue().lat);
        object.GeographicalLongitude = Number(formGroup.getRawValue().lon);
      //  object.ParentWindGeneratorTypeId = formGroup.getRawValue().typeId;
      }
    }
  
    updatePropertiesFromObjectSetToFormGroup(formGroup:any, object:DtoWindGeneratorDevice) {
      if (object) {
        formGroup.setValue({
          name: object.Name || '',
          description: object.Description || '',
          country: object.Country || '',
          city: object.City || '',
          lat: object.GeographicalLatitude || 0,
          lon: object.GeographicalLongitude || 0,
       //   typeId : object?.ParentWindGeneratorTypeId || 0,
        });
      }
    }

    // this.objSetConfigurationForm.get("firstname").valueChanges.subscribe(x => {
    //   console.log('firstname value changed')
    //   console.log(x)
    // })
  //#endregion

  addWindGenerator() {

    
    let formData = this.windForm.value;
    // console.log(formData);
    if (this.windForm.invalid) {
      return;
    }
  
    this.currentWindGenerator.ParentUserId = Number(this.userService.currentUser.Id);
   // this.currentWindGenerator.ParentUser = this.userService.currentUser;

   
    console.warn('currentWindGenerator', this.currentWindGenerator);
    if(this.currentWindGenerator && this.currentWindGenerator.Id != 0){
      //update
      this.windGeneratorService.Put(this.currentWindGenerator.Id, this.currentWindGenerator).subscribe((res: DtoWindGeneratorDeviceResponse) => {
        this.addRE.close({ formData: formData });
        console.log('prosao');
        this.markerService.refresh.next(true);
       // this.getAllGenerators();
      }, (error: any) => {
        console.log(error);
      });
          }else{
      //add
          this.windGeneratorService.Post(this.currentWindGenerator).subscribe((res: DtoWindGeneratorDeviceResponse) => {
            this.addRE.close({ formData: formData });
            console.log('prosao');
            this.markerService.refresh.next(true);
           // this.getAllGenerators();
          }, (error: any) => {
            console.log(error); 
          });
          }
  }

  // getAllGenerators(){
  //   this.windGeneratorService.GetList(null).subscribe((res) => {
  //   console.warn('all ', res);
  //   }, (error: any) => {
  //     console.log(error);
    
  //   });
  // }

  openSelectFromMap() {
    // let filter;
    const dialogRef = this.dialog.open(SelectLocationMapModalComponent, {
      width: '800px',
      data: {},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.blockUI.start('');
      if(result != null && result != undefined) {
        if (result.latlon != null && result.latlon != undefined) {
          this.windForm.patchValue({lat: result.latlon.lat, lon: result.latlon.lng})
          // console.log(this.windForm.value);

          this.globalService.getAdressFromCoords(this.windForm.value.lat, this.windForm.value.lon)
          .subscribe(res => {
            if(res != null && res != undefined) {
              // console.log(res)
              this.windForm.patchValue({city: res.address.city, country: res.address.country});
            }
          });
        }
      }
    });
  }
currentType:any;
  changeSelectedCustom(data:any){
  //  this.currentWindGenerator.ParentWindGeneratorType = data;
  this.checkProfitStatus = false;
  this.currentType = data;
    this.currentWindGenerator.ParentWindGeneratorTypeId = data.Id;
  }

  setType(id:any){
    this.selectedType = this.allTypes.find( (v: DtoWindGeneratorType)=>v.Id == id);
    this.currentWindGenerator.ParentWindGeneratorType = this.selectedType;
    this.windTypeService.PreprocessObjectFromServer(this.selectedType);
  }

  
 profit: any;
 index:any;
  checkProfit(){
   
    console.warn('selectedType',this.selectedType);
    this.windGeneratorService.CalculateProfit(this.currentWindGenerator).subscribe(resp=>{
      this.checkProfitStatus = true;
      this.profit = Number(resp.Profit).toFixed(0);
      this.index = Number(resp.ProfitabillityIndex).toFixed(0);
      console.warn('************resp',resp);
    })
    // const dialogRef = this.dialog.open(ProfitComponent, {
    //   width: '500px',
    //   data: null,
    //   autoFocus: false
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //  // this.markerService.refresh.next(true);
      
    // });
  }
}
