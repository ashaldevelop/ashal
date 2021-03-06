import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Unit } from './unit';
import { Category } from './category';
import { AccDef } from './accdef';
import { Item } from './item';
import { Voucher } from './voucher';

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

  viewUnit(Unit_No: string): Observable<Unit>{
    return this.http.get<Unit>('api/unit/' + Unit_No)
  }

  updateUnit(Unit_No: string, unit: Unit): Observable<Unit>{
    return this.http.put<Unit>('api/unit/' + Unit_No, unit)
  }

  deleteUnit(Unit_No: string): Observable<Unit>{
    return this.http.delete<Unit>('api/unit/' + Unit_No)
  }


  // categorys
  getCategorys(): Observable<Category[]>{
    return this.http
      .get<Category[]>('api/categorys-list')
      // .pipe(catchError(this.handleError('getTasks', [])))
  }

  newCategory(cat: Category): Observable<Category>{
    return this.http.post<Category>('api/new-category', cat)
  }

  viewCategory(CAT_No: string): Observable<Category>{
    return this.http.get<Category>('api/cat/' + CAT_No)
  }

  updateCategory(CAT_No: string, cat: Category): Observable<Category>{
    return this.http.put<Category>('api/cat/' + CAT_No, cat)
  }

  deleteCategory(CAT_No: string): Observable<Category>{
    return this.http.delete<Category>('api/cat/' + CAT_No)
  }


  // accdef
  getAccDef(): Observable<AccDef[]>{
    return this.http
      .get<AccDef[]>('api/accdef-list')
      // .pipe(catchError(this.handleError('getTasks', [])))
  }

  newAccDef(accDef: AccDef): Observable<AccDef>{
      return this.http.post<AccDef>('api/new-accdef', accDef)
  }

  viewAccdef(AccDef_No: string): Observable<AccDef>{
    return this.http.get<AccDef>('api/accdef/' + AccDef_No)
  }

  updateAccdef(AccDef_No: string, accDef: AccDef): Observable<Category>{
    return this.http.put<AccDef>('api/accdef/' + AccDef_No, accDef)
  }

  deleteAccdef(AccDef_No: string): Observable<AccDef>{
    return this.http.delete<AccDef>('api/accdef/' + AccDef_No)
  }


  // items
  preItem(): Observable<any>{
    return this.http.get('api/pre-item')
  }

  getItems(): Observable<Item[]>{
    return this.http
      .get<Item[]>('api/items-list')
      // .pipe(catchError(this.handleError('getTasks', [])))
  }

  getItem(id: string): Observable<any>{
    let params = new HttpParams().set('id', id);
    return this.http.get('api/get-item', { params })
  }

  newItem(item: Item): Observable<Item>{
    return this.http.post<Item>('api/new-item', item)
  }

  deleteItem(Itm_No: string): Observable<Unit>{
    return this.http.delete<Unit>('api/item/' + Itm_No)
  }


  // vouchers
  getVouchers(): Observable<Voucher[]>{
    return this.http
      .get<Voucher[]>('api/vouchers-list')
      // .pipe(catchError(this.handleError('getTasks', [])))
  }

  newVoucher(voucher: Voucher): Observable<Voucher>{
    return this.http.post<Voucher>('api/new-voucher', voucher)
  }

  checkGdNo(gdNo: string){
    let params = new HttpParams().set('gdNo', gdNo);
    return this.http.get('api/check-gd-no', { params })
  }

  getAccdefBalance(accdefNo: string){
    let params = new HttpParams().set('accdefNo', accdefNo);
    return this.http.get('api/sum-active-accdef', { params })
  }

  preVoucher(): Observable<any>{
    return this.http.get('api/pre-voucher')
  }

  getVoucher(id: string): Observable<any>{
    let params = new HttpParams().set('id', id);
    return this.http.get('api/get-voucher', { params })
  }

  // invoices
  preInvoice(): Observable<any>{
    return this.http.get('api/pre-invoice')
  }

  getInvoice(id: string): Observable<any>{
    let params = new HttpParams().set('id', id);
    return this.http.get('api/get-invoice', { params })
  }
  
  getItemData(Itm_No: string): Observable<any>{
    let params = new HttpParams().set('Itm_No', Itm_No);
    return this.http.get('api/get-item-data', { params })
  }
  
}
