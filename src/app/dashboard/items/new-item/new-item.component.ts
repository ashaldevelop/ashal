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
  accdefs: AccDef[];

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
    accdef : [''], // DefultVendor
    StartCost : [''],
    AvrageCost : [''],
    LastCost : [''],
    Shipping_Cost : [''],
    QtyMax : [''], // max qty
    ItmTyp : [''], //
    OpenQty : [''],
    SeaCost : [''],
    Tax : [''],
    ItmNature : [''],
    QtyLvl : [''],
    ItmLoc : [''],
    Sn : [''],
    Lot : [''],
    DMY : [''],
    LrnExp : [''],
    Note : [''],
    ItmPOS : ['0'], 
 
    // units

    // DefultUnit : this.fb.group({
    //   DefultUnit: ['']
    // }),
    
    DefultUnit : ['1'],
    
    // unit 1
    Unit1 : [''],
    Pack1 : [''],
    UntPri1 : [''],
    BarCod1 : [''],

    // unit 2
    Unit2 : [''],
    Pack2 : [''],
    UntPri2 : [''],
    BarCod2 : [''],


    // unit 3
    Unit3 : [''],
    Pack3 : [''],
    UntPri3 : [''],
    BarCod3 : [''],

    // unit 4
    Unit4 : [''],
    Pack4 : [''],
    UntPri4 : [''],
    BarCod4 : [''],

    // unit 5
    Unit5 : [''],
    Pack5 : [''],
    UntPri5 : [''],
    BarCod5 : [''],

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
  get accdef() { return this.newForm.get('accdef') }
  get StartCost() { return this.newForm.get('StartCost') }
  get LastCost() { return this.newForm.get('LastCost') }
  get AvrageCost() { return this.newForm.get('AvrageCost') }
  get QtyMax() { return this.newForm.get('QtyMax') }
  get ItmTyp() { return this.newForm.get('ItmTyp') }
  get QtyLvl() { return this.newForm.get('QtyLvl') }
  get ItmLoc() { return this.newForm.get('ItmLoc') }
  get Group_Code() { return this.newForm.get('Group_Code') }
  get Shipping_Cost() { return this.newForm.get('Shipping_Cost') }
  get SeaCost() { return this.newForm.get('SeaCost') }
  get Note() { return this.newForm.get('Note') }
  get ItmNature() { return this.newForm.get('ItmNature') }
  get Tax() { return this.newForm.get('Tax') }
  get ItmPOS() { return this.newForm.get('ItmPOS') }


  // unit 1
  get Unit1() { return this.newForm.get('Unit1') }
  get Pack1() { return this.newForm.get('Pack1') }
  get UntPri1() { return this.newForm.get('UntPri1') }

  // unit 2
  get Unit2() { return this.newForm.get('Unit2') }
  get Pack2() { return this.newForm.get('Pack2') }
  get UntPri2() { return this.newForm.get('UntPri2') }

  // unit 3
  get Unit3() { return this.newForm.get('Unit3') }
  get Pack3() { return this.newForm.get('Pack3') }
  get UntPri3() { return this.newForm.get('UntPri3') }

  // unit 4
  get Unit4() { return this.newForm.get('Unit4') }
  get Pack4() { return this.newForm.get('Pack4') }
  get UntPri4() { return this.newForm.get('UntPri4') }

  // unit 5
  get Unit5() { return this.newForm.get('Unit5') }
  get Pack5() { return this.newForm.get('Pack5') }
  get UntPri5() { return this.newForm.get('UntPri5') }

  
  // prices
  get Price1() { return this.newForm.get('Price1') }
  get Price2() { return this.newForm.get('Price2') }
  get Price3() { return this.newForm.get('Price3') }
  get Price4() { return this.newForm.get('Price4') }
  get Price5() { return this.newForm.get('Price5') }
  get Price6() { return this.newForm.get('Price6') }

  //Barcodes
  get BarCod1() { return this.newForm.get('BarCod1') } 
  get BarCod2() { return this.newForm.get('BarCod2') } 
  get BarCod3() { return this.newForm.get('BarCod3') } 
  get BarCod4() { return this.newForm.get('BarCod4') } 
  get BarCod5() { return this.newForm.get('BarCod5') } 

  public newItem() {

    if (!this.newForm.valid) return null;
    const vals = this.newForm.value;
    
    const item: Item = {
      Itm_No: this.Itm_No.value,
      ItmCat: this.ItmCat.value,
      Eng_Des: this.Eng_Des.value,
      Arb_Des: this.Arb_Des.value,
      OpenQty: this.OpenQty.value,
      DefultVendor: this.accdef.value,
      StartCost: this.StartCost.value,
      LastCost: this.LastCost.value,
      AvrageCost: this.LastCost.value,
      QtyMax: this.QtyMax.value,
      ItmTyp: this.ItmTyp.value,
      QtyLvl: this.QtyLvl.value,
      ItmLoc: this.ItmLoc.value,
      Group_Code: this.Group_Code.value,
      Shipping_Cost: this.Shipping_Cost.value,
      SeaCost: this.SeaCost.value,
      Note: this.Note.value,
      ItmNature: this.ItmNature.value,
      Tax: this.Tax.value,
      ItmPOS: this.ItmPOS.value,
      //Prices
      Price1:this.Price1.value,
      Price2:this.Price2.value,
      Price3:this.Price3.value,
      Price4:this.Price4.value,
      Price5:this.Price5.value,
      Price6:this.Price6.value,
      //Barcodes
      BarCod1:this.BarCod1.value,
      BarCod2:this.BarCod2.value,
      BarCod3:this.BarCod3.value,
      BarCod4:this.BarCod4.value,
      BarCod5:this.BarCod5.value,
      // unit1
      Unit1: this.Unit1.value,
      Pack1: this.Pack1.value,
      UntPri1: this.UntPri1.value,

      // unit2
      Unit2: this.Unit2.value,
      Pack2: this.Pack2.value,
      UntPri2: this.UntPri2.value,

      // unit3
      Unit3: this.Unit3.value,
      Pack3: this.Pack3.value,
      UntPri3: this.UntPri3.value,

      // unit4
      Unit4: this.Unit4.value,
      Pack4: this.Pack4.value,
      UntPri4: this.UntPri4.value,

      // unit5
      Unit5: this.Unit5.value,
      Pack5: this.Pack5.value,
      UntPri5: this.UntPri5.value,


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
      accdefs =>{
         this.accdefs = accdefs
       } 
    );

    this.ashalService.getUnits().subscribe(
      units =>{
         this.units = units
       } 
    );

  }



}