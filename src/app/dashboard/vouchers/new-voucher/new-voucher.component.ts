import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Voucher } from '../../../shared/voucher';

@Component({
  selector: 'app-new-voucher',
  templateUrl: './new-voucher.component.html',
  styleUrls: ['./new-voucher.component.css']
})
export class NewVoucherComponent implements OnInit {

  // حقل الفرق
  diff: number = 0;

  // new voucher defaults
  newGdheadID: number;
  newGdNo: number;
  accdefs: object;
  currencys: object;
  csts: object;
  balance:any;

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    ) {
  }

  ngOnInit() {
    this.addDetails();
    this.newVoucherDefaults();
  }

  newVoucherDefaults(){
    return this.ashalService.newVoucherDefaults().subscribe(
      res => {
        if(res){
          this.newGdheadID = res.newGdheadID;
          this.newGdNo = res.newGdNo;
          this.accdefs = res.accdefs;
          this.currencys = res.currencys;
          this.csts = res.csts;
        }
      }
    );
  }

  newForm = this.fb.group({

    gdHDate : ['', Validators.required],
    gdGDate : ['', Validators.required],
    gdCstNo : ['', Validators.required],
    RefNo : ['', Validators.required],
    madeenTotal : [0, Validators.required],
    daenTotal : [0, Validators.required],
    gdMem : ['', Validators.required],
    accdefActive : [''],
    currency : [''],
    balance : [''],

    
    details: this.fb.array([]) // details

  });

  // Using getters will make your code look pretty
  get gdHDate() { return this.newForm.get('gdHDate') }
  get gdGDate() { return this.newForm.get('gdGDate') }
  get gdCstNo() { return this.newForm.get('gdCstNo') }
  get RefNo() { return this.newForm.get('RefNo') }
  get madeenTotal() { return this.newForm.get('madeenTotal') }
  get daenTotal() { return this.newForm.get('daenTotal') }
  get gdMem() { return this.newForm.get('gdMem') }
  get accdefActive() { return this.newForm.get('accdefActive') }
  get detailsForm(){ return this.newForm.get('details') as FormArray }

  // add details to details form aray
  addDetails(){
    const details = this.fb.group({
      AccNo: [''],
      AccName: [''],
      gdDes: [''],
      madeen: [0],
      daen: [0],
      cst: [''],
      gdValue: [''],
      InvNo: [''],
    });

    this.detailsForm.push(details);

  }

  // remove details to details form aray
  removeDetails(i: number){
    this.detailsForm.removeAt(i);
    this.getTotal();
  }


  public newVoucher(){

    // if(!this.newForm.valid) return null;

    const voucher: Voucher = {
      gdTyp: 11,
      gdMem: this.gdMem.value,
      gdTot: 100,
      gdTgdLok: 1,
      gdHDate: this.gdHDate.value,
      gdGDate: this.gdGDate.value,
      gdMnd: 'gdMnd',
      CurTyp: 1,
      RefNo: 1,
      details: this.detailsForm.value
    }

    this.ashalService.newVoucher(voucher)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  

    console.log(voucher);
    

  }

  accdefChanged(value, i){
    this.detailsForm.controls[i].patchValue({AccName: value});
    this.detailsForm.controls[i].patchValue({AccNo: value});
    this.getActiveAccdefBalance(this.detailsForm.controls[i]['controls']['AccNo'].value);
    this.accdefActive.setValue(this.detailsForm.controls[i]['controls']['AccNo'].value);
  }

  getActiveAccdefBalance(AccNo:string){
    this.ashalService.getAccdefBalance(AccNo)
    .subscribe(
      res => {
        this.balance = res;
      },
      err => console.error(err)
    )
  }


  onChangeMadeenValue(value : number ,i: number) {

    if(value > 0)this.detailsForm.controls[i].patchValue({daen: 0})
    this.getTotal();

      // console.log(this.detailsForm.controls[0]['controls']['madeen'].value)


      // console.log(this.detailsForm.controls['madeen'].values)
    // console.log(this.detailsForm.value[i].madeen)
    // console.log()
  }

  onChangeDaenValue(value : number ,i: number) {

    if(value > 0)this.detailsForm.controls[i].patchValue({madeen: 0})
    this.getTotal();

    // console.log(this.detailsForm.value[i].madeen)
    // console.log()
  }

  getTotal(){
    var l;
    var madeenTotal: number = 0;
    var daenTotal: number = 0;
    for (l = 0; l < this.detailsForm.length; l++) { 
     madeenTotal += Number(this.detailsForm.controls[l]['controls']['madeen'].value);
     daenTotal += Number(this.detailsForm.controls[l]['controls']['daen'].value);
    }
    this.madeenTotal.setValue(madeenTotal);
    this.daenTotal.setValue(daenTotal);
    this.diff = this.madeenTotal.value - this.daenTotal.value;
  }

  checkGdNo(gdNo:string){
    this.ashalService.checkGdNo(gdNo)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  }

}
