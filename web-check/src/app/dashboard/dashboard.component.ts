import { Component, OnInit } from '@angular/core';
declare var require: any
const cv = require("../opencv")
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
  ) { }
  hey = cv;
  ngOnInit() {
  }

  
}
