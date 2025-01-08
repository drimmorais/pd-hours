import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SquadsComponent } from './squads/squads.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    SquadsComponent,
    UsersComponent,
    MatTabsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {

  }

  addNewPDHours() {
    return true
  }
}
