import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Unit } from './unit';

@Injectable({
  providedIn: 'root'
})
export class AshalService {

  constructor(private http: HttpClient) { }

  getUnits(): Observable<Unit[]>{
    return this.http
      .get<Unit[]>('api/units-list')
      // .pipe(catchError(this.handleError('getTasks', [])))
  }

}
