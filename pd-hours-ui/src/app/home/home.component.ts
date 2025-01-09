import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SquadsComponent } from './squads/squads.component';
import { UsersComponent } from './users/users.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SquadsService } from '../services/squads.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    SquadsComponent,
    UsersComponent,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  newHoursForm!: FormGroup;
  squadError: boolean = false;

  constructor(
    private service: SquadsService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private fb: FormBuilder) {
    config.keyboard = false;
  }

  ngOnInit() {

    this.newHoursForm = this.fb.group({
      id: ['', Validators.required],
      hours: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
    });

  }

  open(content: any) {
    this.modalService.open(content);
  }

  addNewPDHours() {
    if (this.newHoursForm.valid) {
      const formData = this.newHoursForm.value;

      this.service.createReport(formData)
        .subscribe((data) => {
          this.modalService.dismissAll();
        });
    }
  }
}
