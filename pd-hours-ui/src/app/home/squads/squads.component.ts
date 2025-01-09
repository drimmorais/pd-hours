import { Component, OnInit, Pipe } from '@angular/core';
import { SquadsService } from '../../services/squads.service';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-squads',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './squads.component.html',
  styleUrl: './squads.component.scss'
})
export class SquadsComponent implements OnInit {

  visualizeSquads: string = 'SQUAD';
  squads: any;
  hasSquadMembers = false;
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  currentSquad!: string;
  currentId!: number;
  wasGetReport = false;
  employees: any;
  totalHours: number = 0;
  averageHours: number = 0;

  constructor(private service: SquadsService) { }

  ngOnInit(): void {
    this.service.getSquads()
      .subscribe((data) => {
        this.visualizeSquads = "ALL_SQUADS";
        this.squads = data;
        console.log("Data", data);
      });

    this.startDate.valueChanges.subscribe(value => {
      console.log('Start Date:', value);
    });

    this.endDate.valueChanges.subscribe(value => {
      console.log('End Date:', value);
    });
  }

  addNewSquad() {
    
  }

  checkSquad(employeesSize: number, currentSquad: string, currentId: number) {
    this.currentSquad = currentSquad;
    this.currentId = currentId;
    employeesSize > 0 ? this.hasSquadMembers = true : this.hasSquadMembers = false;
    this.visualizeSquads = "SQUAD";
    // this.service.getSquadMembers(id)
    //   .subscribe((data) => {
    //     this.squadMembers = data;
    //   });
  }

  getReport() {
    console.log("Start Date", this.startDate.value);
    console.log("End Date", this.endDate.value);
    if (this.startDate.value && this.endDate.value) {
      this.service.getTotalHours(this.currentId, this.startDate.value.toISOString(), this.endDate.value.toISOString())
        .subscribe((data) => {
          this.totalHours = data
          this.wasGetReport = true;
        });


      this.service.getHoursByEmployee(this.currentId, this.startDate.value.toISOString(), this.endDate.value.toISOString())
        .subscribe((data) => {
          this.employees = data;
        });

      this.service.getTotalAverage(this.currentId, this.startDate.value.toISOString(), this.endDate.value.toISOString())
        .subscribe((data) => {
          this.averageHours = data;
        });

    }
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      selectedDate.setHours(0, 0, 0, 0);
      this.startDate.setValue(selectedDate);
    }
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = event.value;
      selectedDate.setHours(23, 59, 59, 0);
      this.endDate.setValue(selectedDate);
    }
  }
  
}
