import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notify-us',
  templateUrl: './notify-us.component.html',
  styleUrls: ['./notify-us.component.css']
})
export class NotifyUsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back();

  }

}
