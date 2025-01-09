import { Component, OnInit } from '@angular/core';
import { SquadsService } from '../../services/squads.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  visualizeUsers: string = 'NOT_SQUAD';
  squadForm!: FormGroup;
  userForm!: FormGroup;
  squadError: boolean = false;
  employees: any;

  constructor(
    private service: SquadsService,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    config: NgbModalConfig,
    private fb: FormBuilder) {
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getSquad();

    this.squadForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      hours: [null, [Validators.required, Validators.min(1)]],
      squad: ['', Validators.required],
    });
  }

  getSquad(): void {
    this.service.getSquads().subscribe(
      (response) => {
        if (response?.length > 0) {
          response.some((squad: any) => squad.employees?.length > 0) ? this.visualizeUsers = 'HAS_USER' : this.visualizeUsers = 'NOT_USER';
          this.employees = [];
          response.map((r: any) => {
            r.employees.map((e: any) => {
              this.employees.push({ name: e.name, hours: e.estimatedHours, squad: r.id });
            });
          })
        } else {
          this.visualizeUsers = 'NOT_SQUAD';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content);
  }

  openSquad(content: any) {
    const modalRef = this.modalService.open(content);
  }

  createSquad(): void {
    if (this.squadForm.valid) {
      const formData = this.squadForm.value;

      this.employeeService.createSquad(formData)
        .subscribe((data) => {
          this.getSquad();
          this.modalService.dismissAll();
        });
    }
  }

  createUser(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      this.employeeService.createEmployee(formData)
        .subscribe((data) => {
          this.getSquad();
          this.modalService.dismissAll();
        });
    }
  }
  

}
