import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-marker-info-box',
  templateUrl: './marker-info-box.component.html',
  styleUrls: ['./marker-info-box.component.scss']
})
export class MarkerInfoBoxComponent implements OnInit {
  markerInfo: any;
  showMarkerInfoBlock: boolean;

  private eventsSubscription: Subscription;
  @Input() showMarkerInfoBlockO: Observable<void>;

  constructor(
    private markerService: MarkerService,
    private dialog: MatDialog,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.markerInfo = this.markerService.markerInfo;
    this.markerService.markerChange.subscribe((res) => {
      this.markerInfo = res;
      this.showMarkerInfoBlock = true;
    });

    this.showMarkerInfoBlock = this.markerService.isMarkerSelected;
    this.markerService.isMarkerSelectedChange.subscribe((res) => {
      this.showMarkerInfoBlock = res;
    });
  }

  ngOnInit() {
    this.showMarkerInfoBlock = false;
    this.eventsSubscription = this.showMarkerInfoBlockO.subscribe(() =>
      this.setVisibility()
    );
  }

  openRealEstateDetails() {
    // const dialogRef = this.dialog.open(ViewDetailsModalComponent, {
    //   width: '900px',
    //   // height: '94vh',
    //   panelClass: 'custom-scroll1',
    //   data: { markerInfo: this.markerInfo },
    //   autoFocus: false,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   // kad se ovaj zatvori treba refreshovati mapu
    // });
  }

  openAddToProject() {
    console.log('klik na mmarker +project');
    console.log(this.markerInfo);

    // najpre upisujemo podatke koje trebaju drugoj komponenti u globalnu promenjivu zatim je otvaramo putem routera.
    // posle toga druga komponenta mora da ih iscita iz globalne promenjive.
    // this.globalService.globalMarkerInfo = this.markerInfo; // DANAS
    // this.router.navigate(['/projects'], {
    //   queryParams: { openedbymarker: 1 },
    //   queryParamsHandling: 'merge',
    // }); // DANAS

    /*
    const dialogRef = this.dialog.open(SelectProjectComponent, {
      width: '900px',
      data: { markerInfo: this.markerInfo },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {

    });
    */
  }

  setVisibility() {
    this.showMarkerInfoBlock = false;
  }
}
