import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { SelectLocationMapModalComponent } from '../select-location-map-modal/select-location-map-modal.component';

@Component({
  selector: 'app-wind-generator-config',
  templateUrl: './wind-generator-config.component.html',
  styleUrls: ['./wind-generator-config.component.scss']
})
export class WindGeneratorConfigComponent implements OnInit {

 

  addNewReForm: FormGroup;
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

  constructor(
    public addRE: MatDialogRef<WindGeneratorConfigComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog, 
    private globalService: GlobalService,  
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addNewReForm = this.formBuilder.group({
      country: ['Country placeholder'],
      city: ['City placeholder'],
      type: ['Type placeholder'],
      client: ['Client placeholder'],
      shortName: ['Shortname placeholder'],
      description: ['Description placeholder'],
      land: ['Land placeholder'],
      buildingSize: ['Buildingsize placeholder'],
      value: ['Value placeholder'],
      additionalInfo: ['AdditionalInfo placeholder'],
      lat: [this.data.lat ? this.data.lat : null, Validators.required],
      lon: [this.data.lng ? this.data.lng : null, Validators.required],
      images: [`assets/gallery/gallery_image1.jpg\nassets/gallery/gallery_image2.jpg\nassets/gallery/gallery_image3.jpg\nassets/gallery/gallery_image4.jpg\nassets/gallery/gallery_image5.jpg\nassets/gallery/gallery_image6.jpg\nassets/gallery/gallery_image7.jpg\nassets/gallery/gallery_image8.jpg`],
      
      documents: ['color.docx\ndokument.docx\ntabela.xlsx'],
      plans: ['assets/gallery/plan1.png\nassets/gallery/plan2.png\nassets/gallery/plan3.png\nassets/gallery/plan4.png\nassets/gallery/plan5.png']
    })

    if(this.data != null && this.data != undefined) {
      if(this.data.lat != null && this.data.lat != undefined && this.data.lng != null && this.data.lng != undefined)
      this.globalService.getAdressFromCoords(this.data.lat, this.data.lng)
          .subscribe(res => {
            if(res != null && res != undefined) {
              if(res.address) {
                if(res.address.city) {
                  this.addNewReForm.patchValue({city: res.address.city});  
                }
                if(res.address.country) {
                  this.addNewReForm.patchValue({country: res.address.country});
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsF.filter(option => option.toLowerCase().includes(filterValue));
  }

  addRealEstate() {
    let formData = this.addNewReForm.value;
    // console.log(formData);
    if (this.addNewReForm.invalid) {
      return;
    }

    this.addRE.close({ formData: formData });
  }

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
          this.addNewReForm.patchValue({lat: result.latlon.lat, lon: result.latlon.lng})
          // console.log(this.addNewReForm.value);

          this.globalService.getAdressFromCoords(this.addNewReForm.value.lat, this.addNewReForm.value.lon)
          .subscribe(res => {
            if(res != null && res != undefined) {
              // console.log(res)
              this.addNewReForm.patchValue({city: res.address.city, country: res.address.country});
            }
          });
        }
      }
    });
  }

}
