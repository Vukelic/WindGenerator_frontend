import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-items',
  templateUrl: './chart-items.component.html',
  styleUrls: ['./chart-items.component.scss']
})
export class ChartItemsComponent implements OnInit {
  @Input() selectedItems: any;
  @Input() displayedColumnsItem: any;
  @Input() type: any;

  //  data: any = [
  //   [10,11],
  //   [10,2],
  //   [10,2],

  // ];
 // type:any= 'LineChart';
  // columns:any = ['Task', 'Hours per Day'];

  // constructor() { }
  // title = 'Items chart';
  // type: any = 'Pie';
  // options = {
  //   colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true,
  //   legend: {
  //     position: 'top',
  //     textStyle: { fontSize: 12 }
  //   }
  // };
   width = 550;
 height = 400;

  chartData:any = {
    type: 'LineChart',
    data: [
      [1, 37.8, 80.8, 41.8],
      [2, 30.9, 69.5, 32.4],
      [3, 25.4, 57, 25.7],
      [4, 11.7, 18.8, 10.5],
      [5, 11.9, 17.6, 10.4],
      [6, 8.8, 13.6, 7.7],
      [7, 7.6, 12.3, 9.6],
      [8, 12.3, 29.2, 10.6],
      [9, 16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11, 5.3, 7.9, 4.7],
      [12, 6.6, 8.4, 5.2],
      [13, 4.8, 6.3, 3.6],
      [14, 4.2, 6.2, 3.4]
      
  ]};
  columnNames: ["Day", "Guardians of the Galaxy", "The Avengers", "Transformers: Age of Extinction"];
  options: {
  hAxis: {
       title: 'Box Office Earnings in First Two Weeks of Opening'
    },
    vAxis:{
       title: 'in millions of dollars (USD)'
    },
  };
  // width: 1000;
  // height: 400;

  ngOnInit(): void {
    console.warn('selectedItems', this.selectedItems);
    console.warn('displayedColumnsItem', this.displayedColumnsItem);

    if(!this.type){
      this.type = 'LineChart';
    }
  }
}
