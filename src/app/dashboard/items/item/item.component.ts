import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Item } from '../../../shared/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  form: FormGroup;
  save: string;
  item: Item = {};
  id: any;

  // item defaults
  accdefs: object;
  categorys: object; // مجموعات الأصناف
  units: object; // الوحدات

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: { id: any; }) => { this.id = params.id; });
    this.preItem();
    this.getItem();
    this.form = fb.group({
      Itm_No : ["", Validators.required],
      Group_Code : [],
      ItmCat : [""],
      Arb_Des : [],
      Eng_Des : [],
      DefultVendor : [""],
      StartCost : [0],
      AvrageCost : [0],
      LastCost : [0],
      OpenQty : [0],
      Shipping_Cost : [0],
      SeaCost : [0],
      QtyMax : [],
      ItmTyp : [0],
      Tax : [],
      ItmNature : [0],
      QtyLvl : [],
      ItmLoc : [],
      Sn : [0],
      Lot : [],
      DMY : [0],
      LrnExp : [],
      Note : [],


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
      Price1 : [0],
      Price2 : [0],
      Price3 : [0],
      Price4 : [0],
      Price5 : [0],
      Price6 : [0],

      // qtys
      qty1 : [0],
      qty2 : [0],
      qty3 : [0],
      qty4 : [0],
      qty5 : [0],
      
      // costs
      cost1 : [0],
      cost2 : [0],
      cost3 : [0],
      cost4 : [0],
      cost5 : [0],
      
      });
  }

  preItem(){
    this.ashalService.preItem().subscribe(
      preItem => {
        this.accdefs = preItem.accdefs;
        this.categorys = preItem.categorys;
        this.units = preItem.units;
      }
    );
  }

  getItem(){
    if(this.id !=0){

      this.ashalService.getItem(this.id).subscribe(
        item => {
          this.form.patchValue({

            Itm_No : item.Itm_No,
            Group_Code : item.Group_Code,
            ItmCat : item.ItmCat,
            Arb_Des : item.Arb_Des,
            Eng_Des : item.Eng_Des,
            DefultVendor : item.DefultVendor,
            StartCost : item.StartCost,
            AvrageCost : item.AvrageCost,
            LastCost : item.LastCost,
            OpenQty : item.OpenQty,
            Shipping_Cost : item.Shipping_Cost,
            QtyMax : item.QtyMax,
            ItmTyp : item.ItmTyp,
            Tax : item.Tax,
            ItmNature : item.ItmNature,
            QtyLvl : item.QtyLvl,
            ItmLoc : item.ItmLoc,
            Sn : parseInt(item.Sn),
            Lot : parseInt(item.Lot),
            DMY : item.DMY,
            Note : item.Note,


            Unit1 : item.Unit1,
            Unit2 : item.Unit2,
            Unit3 : item.Unit3,
            Unit4 : item.Unit4,
            Unit5 : item.Unit5,
            
            Pack1 : item.Pack1,
            Pack2 : item.Pack2,
            Pack3 : item.Pack3,
            Pack4 : item.Pack4,
            Pack5 : item.Pack5,

            UntPri1 : item.UntPri1,
            UntPri2 : item.UntPri2,
            UntPri3 : item.UntPri3,
            UntPri4 : item.UntPri4,
            UntPri5 : item.UntPri5,

            Price1 : item.Price1,
            Price2 : item.Price2,
            Price3 : item.Price3,
            Price4 : item.Price4,
            Price5 : item.Price5,
            Price6 : item.Price6,

          });
          this.form.controls['Itm_No'].disable();
        }
      );

    }
  }

  submit(){
    this.item = this.form.value;


      this.ashalService.newItem(this.item)
      .subscribe(
        res => {
          console.log(res);
          this.tostr.success('New Unit Created');
          this.form.reset();
          this.preItem();
          },
        err => console.error(err)
      )
        

  }

  ngOnInit() {
    this.save = this.id == 0 ? 'save' : 'update';
    this.form.controls['OpenQty'].disable();

    this.form.controls['qty1'].disable();
    this.form.controls['qty2'].disable();
    this.form.controls['qty3'].disable();
    this.form.controls['qty4'].disable();
    this.form.controls['qty5'].disable();

    this.form.controls['cost1'].disable();
    this.form.controls['cost2'].disable();
    this.form.controls['cost3'].disable();
    this.form.controls['cost4'].disable();
    this.form.controls['cost5'].disable();
  }

}
