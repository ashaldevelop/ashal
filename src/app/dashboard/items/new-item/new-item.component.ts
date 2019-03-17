import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Category } from 'src/app/shared/category';
import { Unit } from 'src/app/shared/unit';
import { AccDef } from 'src/app/shared/accdef';

import { Item } from 'src/app/shared/item';


@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  units: Unit[];
  categorys: Category[];
  accdef: AccDef[];

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    ) {
  }

  newForm = this.fb.group({

    Itm_No : [''],
    Group_Code : [''],
    ItmCat : [''],
    Arb_Des : [''],
    Eng_Des : [''],
    DefultVendor : [''],
    StartCost : [''],
    AvrageCost : [''],
    LastCost : [''],
    OpenQty : [''],
    Shipping_Cost : [''],
    SeaCost : [''],
    QtyMax : [''],
    ItmTyp : [''],
    Tax : [''],
    ItmNature : [''],
    QtyLvl : [''],
    ItmLoc : [''],
    Sn : [''],
    Lot : [''],
    DMY : [''],
    LrnExp : [''],
    Note : [''],

    // units

    // DefultUnit : this.fb.group({
    //   DefultUnit: ['']
    // }),
    
    DefultUnit : ['0'],
    
    Unit1 : [''],
    Pack1 : [''],
    UntPri1 : [''],
    BarCod1 : [''],

    // prices
    Price1 : [''],
    Price2 : [''],
    Price3 : [''],
    Price4 : [''],
    Price5 : [''],
    Price6 : [''],

  });
  
  // Using getters will make your code look pretty
  get Itm_No() { return this.newForm.get('Itm_No') }
  get ItmCat() { return this.newForm.get('ItmCat') }
  get Eng_Des() { return this.newForm.get('Eng_Des') }
  get Arb_Des() { return this.newForm.get('Arb_Des') }
  get OpenQty() { return this.newForm.get('OpenQty') }
  get Unit1() { return this.newForm.get('Unit1') }
  get Pack1() { return this.newForm.get('Pack1') }
  get UntPri1() { return this.newForm.get('UntPri1') }


  public newItem() {

    if (!this.newForm.valid) return null;
    const vals = this.newForm.value;
    
    const item: Item = {
      Itm_No: this.Itm_No.value,
      ItmCat: this.ItmCat.value,
      Eng_Des: this.Eng_Des.value,
      Arb_Des: this.Arb_Des.value,
      OpenQty: this.OpenQty.value,
      Unit1: this.Unit1.value,
      Pack1: this.Pack1.value,
      UntPri1: this.UntPri1.value
    }

    this.ashalService.newItem(item)
    .subscribe(
      res => {
        console.log(res);
        this.tostr.success('New Unit Created');
      },
      err => console.error(err)
    )


  }

  ngOnInit() {
    this.getOptions();
  }

  getOptions(){
    this.ashalService.getCategorys().subscribe(
      categorys =>{
         this.categorys = categorys
       } 
    );

    this.ashalService.getAccDef().subscribe(
      accdef =>{
         this.accdef = accdef
       } 
    );

    this.ashalService.getUnits().subscribe(
      units =>{
         this.units = units
       } 
    );

  }



}