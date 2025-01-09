import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {  }

  createEmployee(employee: any):Observable<any> {
    const body = {
      name: employee.name,
      estimatedHours: employee.hours,
      squad: {
          id: employee.squad
      }
    }
    return this.http.post('http://localhost:8080/employee', body);
  }

  createSquad(squad: any):Observable<any> {
    const body = {
      name: squad.name
    }
    return this.http.post('http://localhost:8080/squad', body);
  }
}
