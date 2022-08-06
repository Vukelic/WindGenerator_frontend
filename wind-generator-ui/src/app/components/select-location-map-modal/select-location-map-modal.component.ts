import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapForSelectionComponent } from '../map-for-selection/map-for-selection.component';

@Component({
  selector: 'app-select-location-map-modal',
  templateUrl: './select-location-map-modal.component.html',
  styleUrls: ['./select-location-map-modal.component.scss']
})
export class SelectLocationMapModalComponent implements OnInit {

  @ViewChild(MapForSelectionComponent, { static: false }) child: MapForSelectionComponent;

  constructor(
    public selectFromMapModal: MatDialogRef<SelectLocationMapModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  confirmAdd() {
    this.selectFromMapModal.close({ userChoiceOk: true });
  }

  receiveDataFromChild(child: any) {
    // console.log(child);
    this.selectFromMapModal.close({ latlon: child });
  }

}
