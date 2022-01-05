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
import { SelectLocationMapModalComponent } from '../select-location-map-modal/select-location-map-modal.component';

@Component({
  selector: 'app-wind-generator-config',
  templateUrl: './wind-generator-config.component.html',
  styleUrls: ['./wind-generator-config.component.scss']
})
export class WindGeneratorConfigComponent implements OnInit {

 

  windForm: FormGroup;
  choiceFromMap: boolean = true;

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

  currentWindGenerator: DtoWindGeneratorDevice = new DtoWindGeneratorDevice();
  constructor(
    public addRE: MatDialogRef<WindGeneratorConfigComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog, 
    private globalService: GlobalService,  
    private formBuilder: FormBuilder,
    private windGeneratorService: WindGeneratorDeviceService,
    private markerService: MarkerService) { }

  ngOnInit() {
    this.windForm = this.formBuilder.group({
      country: ['Country placeholder'],
      city: ['City placeholder'],
      name: [],
      description: ['Description placeholder'],
      lat: [this.data && this.data.lat ? this.data.lat : null, Validators.required],
      lon: [this.data && this.data.lng ? this.data.lng : null, Validators.required],
     // images: [`assets/gallery/gallery_image1.jpg\nassets/gallery/gallery_image2.jpg\nassets/gallery/gallery_image3.jpg\nassets/gallery/gallery_image4.jpg\nassets/gallery/gallery_image5.jpg\nassets/gallery/gallery_image6.jpg\nassets/gallery/gallery_image7.jpg\nassets/gallery/gallery_image8.jpg`],
    })

    if(this.data != null && this.data != undefined){
      if(this.data.Id) {
        this.currentWindGenerator = this.data;
        this.updatePropertiesFromObjectSetToFormGroup(this.windForm, this.data);
        console.warn('data', this.data);
      }else{
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
      }

    this.filteredOptions = this.filterAuto.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

    
      //ngOnInit(); 
  this.objSetConfigFormSubscription();
  //sa servera
  // this.updatePropertiesFromObjectSetToFormGroup(this.objSetConfigurationForm, this.objSet);
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
    console.warn('currentWindGenerator', this.currentWindGenerator);
  
    if(this.currentWindGenerator && this.currentWindGenerator.Id != 0){
      //update
      this.windGeneratorService.Put(this.currentWindGenerator.Id, this.currentWindGenerator).subscribe((res: DtoWindGeneratorDeviceResponse) => {
        this.addRE.close({ formData: formData });
        console.log('prosao');
       // this.getAllGenerators();
      }, (error: any) => {
        console.log(error);
      });
          }else{
      //add
          this.windGeneratorService.Post(this.currentWindGenerator).subscribe((res: DtoWindGeneratorDeviceResponse) => {
            this.addRE.close({ formData: formData });
            console.log('prosao');
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

}
