import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Category } from 'src/app/shared/category';
import { Unit } from 'src/app/shared/unit';
import { AccDef } from 'src/app/shared/accdef';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  units: Unit[];
  categorys: Category[];
  accdef: AccDef[];
  newForm: FormGroup;

  constructor(
    private tostr: ToastrService,
    private router: Router,
    private ashalService: AshalService,
    public fb: FormBuilder,
    private http: HttpClient,
    ) {
  }

  ngOnInit() {
    this.unitForm();
    this.getCategorys();
    this.getUnits();
    this.getAccDef();
  }

  getCategorys(){
    this.ashalService.getCategorys().subscribe(
      categorys =>{
         this.categorys = categorys
         console.log(this.categorys)
       } 
    )
  }

  getAccDef(){
    this.ashalService.getAccDef().subscribe(
      accdef =>{
         this.accdef = accdef
         console.log(this.accdef)
       } 
    )
  }

  getUnits(){
    this.ashalService.getUnits().subscribe(
      units =>{
         this.units = units
         console.log(this.units)
       } 
    )
  }

  private unitForm() {
    this.newForm = this.fb.group({
      Eng_Des: ['', [Validators.required]],
      Arb_Des: ['', [Validators.required]]
    });
  }

  // Using getters will make your code look pretty
  get Eng_Des() { return this.newForm.get('Eng_Des') }
  get Arb_Des() { return this.newForm.get('Arb_Des') }

  public newUnit() {

    if (!this.newForm.valid) return null;
    const vals = this.newForm.value;
    
    const unit: Unit = {
      Eng_Des: this.Eng_Des.value,
      Arb_Des: this.Arb_Des.value
    }

    this.ashalService.newUnit(unit)
    .subscribe(
      res => {
        console.log(res);
        this.tostr.success('New Unit Created');
      },
      err => console.error(err)
    )


  }

}