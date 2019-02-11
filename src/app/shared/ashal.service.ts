import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Unit } from './unit';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class AshalService {

  constructor(private http: HttpClient) { }

  // units
  getUnits(): Observable<Unit[]>{
    return this.http
      .get<Unit[]>('api/units-list')
      // .pipe(catchError(this.handleError('getTasks', [])))
  }

  newUnit(unit: Unit): Observable<Unit>{
      return this.http.post<Unit>('api/new-unit', unit)
  }

  // categorys
  getCategorys(): Observable<Category[]>{
    return this.http
      .get<Category[]>('api/categorys-list')
      // .pipe(catchError(this.handleError('getTasks', [])))
  }

  newCategorys(Category: Category): Observable<Category>{
      return this.http.post<Category>('api/new-Category', Category)
  }


}
