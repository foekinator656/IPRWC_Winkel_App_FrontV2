import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beheer',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  manageView: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
