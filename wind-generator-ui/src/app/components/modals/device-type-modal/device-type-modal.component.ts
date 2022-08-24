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
    Turbines: new FormControl('',[Validators.required]),
    PowerOfTurbines: new FormControl('',[Validators.required]),
    HeightOfWing: new FormControl('',[Validators.required]),
    WidthOfWing: new FormControl('',[Validators.required]),
    Weight: new FormControl('',[Validators.required]),
    MaxPowerTurbine: new FormControl('',[Validators.required]),
    MaxSpeedTurbine: new FormControl('',[Validators.required]),
    GeneratorPower: new FormControl('',[Validators.required]),
    Guarantee: new FormControl('',[Validators.required]),
    ImageInput: new FormControl('',[Validators.required]),
  });

  selectedFileTitle: string = 'No file selected.';
  currentType: DtoWindGeneratorType;
  constructor(  public deviceTypeModalComponent: MatDialogRef<DeviceTypeModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public windGeneratorTypeService: WindGeneratorTypeService) { }

  ngOnInit(): void {
  
    console.warn('data',this.data);
    if(this.data){
      this.currentType = this.data?.type;  
    }else{
      this.currentType = new DtoWindGeneratorType();
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

    updatePropertiesFromFormGroupToObject(formGroup:any, object:any) {
      console.warn('updatePropertiesFromFormGroupToObject');
      if (object) {
        object.Name = formGroup.getRawValue().Name;
        object.Turbines = formGroup.getRawValue().Turbines;
        object.PowerOfTurbines = formGroup.getRawValue().PowerOfTurbines;
        object.HeightOfWing = formGroup.getRawValue().HeightOfWing;
        object.WidthOfWing = formGroup.getRawValue().WidthOfWing;
        object.Weight = formGroup.getRawValue().Weight;
        object.MaxPowerTurbine = formGroup.getRawValue().MaxPowerTurbine;
        object.MaxSpeedTurbine = formGroup.getRawValue().MaxSpeedTurbine;
        object.GeneratorPower = formGroup.getRawValue().GeneratorPower;
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
          MaxPowerTurbine: object?.MaxPowerTurbine,
          MaxSpeedTurbine: object?.MaxSpeedTurbine,
          GeneratorPower: object?.GeneratorPower,
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
  
      this.currentType.File = file;
  }

}
