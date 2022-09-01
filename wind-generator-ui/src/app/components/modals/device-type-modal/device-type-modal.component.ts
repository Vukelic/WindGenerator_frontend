import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DtoWindGeneratorDevice } from 'src/app/dto/DtoModels/WindGeneratorDevice/DtoWindGeneratorDevice';
import { DtoWindGeneratorType } from 'src/app/dto/DtoModels/WindGeneratorType/DtoWindGeneratorType';
import { WindGeneratorTypeService } from 'src/app/services/wind-generator-type.service';

@Component({
  selector: 'app-device-type-modal',
  templateUrl: './device-type-modal.component.html',
  styleUrls: ['./device-type-modal.component.scss']
})
export class DeviceTypeModalComponent implements OnInit {

  typeForm:FormGroup = new FormGroup({
    Name: new FormControl('',[Validators.required]),
    Turbines: new FormControl(''),
    PowerOfTurbines: new FormControl('',[Validators.required]),
    HeightOfWing: new FormControl(''),
    WidthOfWing: new FormControl(''),
    Weight: new FormControl(''),
    BasePrice: new FormControl(0),
    InstallationCosts: new FormControl(0),
   // GeneratorPower: new FormControl('',[Validators.required]),
    Guarantee: new FormControl(''),
    ImageInput: new FormControl('',[Validators.required]),
  });

  selectedFileTitle: string = 'No file selected.';
  currentType: DtoWindGeneratorType = new DtoWindGeneratorType();;
  constructor(  public deviceTypeModalComponent: MatDialogRef<DeviceTypeModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public windGeneratorTypeService: WindGeneratorTypeService) { }

  ngOnInit(): void {
  
    console.warn('data',this.data);
    if(this.data?.type){
      this.currentType = this.data?.type;  
    }
    this.updatePropertiesFromObjectSetToFormGroup(this.typeForm, this.currentType);
    this.objSetConfigFormSubscription();
   
  }

   //#region  forms

   objSetConfigFormSubscription() {
    this.typeForm.valueChanges.subscribe(x => {
      setTimeout(() => {
        this.updatePropertiesFromFormGroupToObject(this.typeForm, this.currentType);
      }, 0);
    });
  }

    updatePropertiesFromFormGroupToObject(formGroup:any, object:DtoWindGeneratorType) {
      console.warn('updatePropertiesFromFormGroupToObject');
      if (object) {
        object.Name = formGroup.getRawValue().Name;
        object.Turbines = formGroup.getRawValue().Turbines;
        object.PowerOfTurbines = formGroup.getRawValue().PowerOfTurbines;
        object.HeightOfWing = formGroup.getRawValue().HeightOfWing;
        object.WidthOfWing = formGroup.getRawValue().WidthOfWing;
        object.Weight = formGroup.getRawValue().Weight;
        if(formGroup.getRawValue().BasePrice){
          object.BasePrice = Number(formGroup.getRawValue().BasePrice);
        }else{
          object.BasePrice = 0;
        }
     
        object.InstallationCosts = Number(formGroup.getRawValue().InstallationCosts) | 0;
       // object.GeneratorPower = formGroup.getRawValue().GeneratorPower;
        object.Guarantee = formGroup.getRawValue().Guarantee;
        object.ImageUrl =   formGroup.getRawValue().ImageInput || object.ImageUrl;
        object.Angular_FullUrl =  ('/assets/' + formGroup.getRawValue().ImageInput);
      }
    }
  
    updatePropertiesFromObjectSetToFormGroup(formGroup:any, object:any) {
      if (object) {
        formGroup.setValue({
          Name: object?.Name,
          Turbines: object?.Turbines,
          PowerOfTurbines: object?.PowerOfTurbines,
          HeightOfWing: object?.HeightOfWing,
          WidthOfWing: object?.WidthOfWing,
          Weight: object?.Weight,
          BasePrice: object?.BasePrice,
          InstallationCosts: object?.InstallationCosts,
         // GeneratorPower: object?.GeneratorPower,
          Guarantee: object?.Guarantee,
          ImageInput: object?.ImageUrl || '',
        });
      }
    }
  //#endregion

  save(){
    console.warn('currentType', this.currentType);
    this.deviceTypeModalComponent.close({ userClickOk: true, currentType: this.currentType });
  }

  cancel(){
    this.deviceTypeModalComponent.close({ userClickOk: false });
  }


onImageChange(event: any): any {

      this.selectedFileTitle = event.target.files[0].name ?? '';
  
      let file = event.target.files[0];
      // Proceed only if file is selected
      if (!file) {
        return true;
      }
  
      let reader = new FileReader();
      reader.onload = () => {
        let img: any = document.getElementById('image-preview');
        img.src = reader.result;
        img.style.visibility = 'visible';
        this.typeForm.controls['ImageInput'].setValue(file ? file.name : ''); // <-- Set Value for Validation
      };
      reader.readAsDataURL(file);
  
      if(this.currentType){
      this.currentType.File = file;
      }
  }

}
