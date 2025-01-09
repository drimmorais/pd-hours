import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquadsService {

  constructor(private http: HttpClient) {  }

  getSquads():Observable<any> {
    return this.http.get('http://localhost:8080/squad');
  }

  getSquadMembers(id: number):Observable<any> {
    return this.http.get('http://localhost:8080/squad/' + id);
  }

  getTotalHours(id: number, startDate: string, endDate: string):Observable<any> {
    return this.http.get('http://localhost:8080/report/total-hours?' + 'squadId=' + id + '&startDate=' + startDate + '&endDate=' + endDate);
  }

  getHoursByEmployee(id: number, startDate: string, endDate: string):Observable<any> {
    return this.http.get('http://localhost:8080/report/hours-by-member?' + 'squadId=' + id + '&startDate=' + startDate + '&endDate=' + endDate);
  }

  getTotalAverage(id: number, startDate: string, endDate: string):Observable<any> {
    return this.http.get('http://localhost:8080/report/average-hours?' + 'squadId=' + id + '&startDate=' + startDate + '&endDate=' + endDate);
  }

  createReport(report: any):Observable<any> {
    const body = {
        description: report.description,
        employee: {
          id: report.id
        },
      spentHours: report.hours
    }
    return this.http.post('http://localhost:8080/report', body);
  }
}

