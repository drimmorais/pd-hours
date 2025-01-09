import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SquadsService {

  constructor(private http: HttpClient) {  }

  getSquads():Observable<any> {
    return this.http.get('http://localhost:8080/squads');
  }
}

