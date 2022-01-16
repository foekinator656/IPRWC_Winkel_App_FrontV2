import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {ManageService} from "./manage.service";

@Component({
  selector: 'app-beheer',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public showUserToggle: boolean = false;
  public showOrdersToggle: boolean = false;

  constructor(public manageService: ManageService, private authService: AuthService) { }

  ngOnInit(): void {
  }


  onShowUserToggle() {
    this.showUserToggle = !this.showUserToggle;

  }

  onShowOrdersToggle() {
    this.showOrdersToggle = !this.showOrdersToggle;
  }
}
