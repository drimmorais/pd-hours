import { Component, OnInit, Pipe } from '@angular/core';
import { SquadsService } from '../../services/squads.service';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe, DatePipe, CommonModule } from '@angular/common';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-squads',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    DecimalPipe,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './squads.component.html',
  styleUrl: './squads.component.scss'
})
export class SquadsComponent implements OnInit {

  visualizeSquads: string = 'NONE';
  squads: any;
  hasSquadMembers = false;
  currentSquad!: string;
  currentId!: number;
  wasGetReport = false;
  employees: any;
  totalHours: number = 0;
  averageHours: number = 0;
  userForm!: FormGroup;
  hoursForm!: FormGroup;
  squadForm!: FormGroup;
  squadError: boolean = false;

  constructor(
    private service: SquadsService,
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private fb: FormBuilder) {
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      hours: [null, [Validators.required, Validators.min(1)]],
      squad: ['', Validators.required],
    });

    this.hoursForm = this.fb.group({
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });

    this.squadForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.getSquads();
  }


  getSquads() {
    this.service.getSquads()
      .subscribe((data) => {
        if(data.length){
          this.visualizeSquads = "ALL_SQUADS";
          this.squads = data;
          console.log("Data", data);
        }
      });
  }

  checkSquad(employeesSize: number, currentSquad: string, currentId: number) {
    this.currentSquad = currentSquad;
    this.currentId = currentId;
    employeesSize > 0 ? this.hasSquadMembers = true : this.hasSquadMembers = false;
    this.visualizeSquads = "SQUAD";
  }

  getReport() {
    const startDate = this.hoursForm.get('startDate')?.value.toISOString();
    const endDate = this.hoursForm.get('endDate')?.value.toISOString();
    if (startDate && endDate) {
      this.service.getTotalHours(this.currentId, startDate, endDate)
        .subscribe((data) => {
          this.totalHours = data
          this.wasGetReport = true;
        });


      this.service.getHoursByEmployee(this.currentId, startDate, endDate)
        .subscribe((data) => {
          this.employees = data;
        });

      this.service.getTotalAverage(this.currentId, startDate, endDate)
        .subscribe((data) => {
          this.averageHours = data;
        });

    }
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      selectedDate.setHours(0, 0, 0, 0);
      this.hoursForm.get('startDate')?.setValue(selectedDate);
    }
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      selectedDate.setHours(23, 59, 59, 0);
      this.hoursForm.get('endDate')?.setValue(selectedDate);
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openSquad(content: any) {
    const modalRef = this.modalService.open(content);
  }

  createUser(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.employeeService.createEmployee(formData)
        .subscribe((data) => {
          this.getSquads();
          this.modalService.dismissAll();
        });
    }
  }

  createSquad(): void {
    if (this.squadForm.valid) {
      const formData = this.squadForm.value;

      this.employeeService.createSquad(formData)
        .subscribe((data) => {
          this.getSquads();
          this.modalService.dismissAll();
        });
    }
  }

}
