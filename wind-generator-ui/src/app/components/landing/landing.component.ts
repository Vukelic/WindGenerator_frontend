import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  path1:any = "/assets/pic1.JPG";
  path2:any = "/assets/pic2.JPG";
  constructor() { }

  ngOnInit(): void {
  }

}
