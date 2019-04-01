import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Voucher } from '../../../shared/voucher';
import { isError } from 'util';
import { DatePipe } from '@angular/common'

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
  gdCsts: object;
  mndobs:object;
  balance:any = '';

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    public datepipe: DatePipe
    ) {
  }

  ngOnInit() {
    this.addDetails();
    this.newVoucherDefaults();
  }


  totalDiffValidator(control: AbstractControl){
    if(control.value !== 0){
      return { isError: true }
    }
    return null;
  }

  newVoucherDefaults(){
    return this.ashalService.newVoucherDefaults().subscribe(
      res => {
        if(res){
          this.newGdheadID = res.newGdheadID;
          this.newGdNo = res.newGdNo;
          this.accdefs = res.accdefs;
          this.currencys = res.currencys;
          this.gdCsts = res.gdCsts;
          this.mndobs = res.mndobs;
        }
      }
    );
  }

  newForm = this.fb.group({

    gdHDate : [''],
    gdGDate : [''],
    RefNo : [''],
    madeenTotal : [0],
    daenTotal : [0],
    gdMem : [''],
    accdefActive : [''],
    currency : [''],
    mndob : [''],
    balance : [''],
    totalDiff : [0, this.totalDiffValidator],

    
    details: this.fb.array([]) // details

  });

  // Using getters will make your code look pretty
  get gdHDate() { return this.newForm.get('gdHDate') }
  get currency() { return this.newForm.get('currency') }
  get mndob() { return this.newForm.get('mndob') }
  get gdGDate() { return this.newForm.get('gdGDate') }
  get RefNo() { return this.newForm.get('RefNo') }
  get madeenTotal() { return this.newForm.get('madeenTotal') }
  get daenTotal() { return this.newForm.get('daenTotal') }
  get gdMem() { return this.newForm.get('gdMem') }
  get totalDiff() { return this.newForm.get('totalDiff') }
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
      gdCstNo: [''],
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

    if(!this.newForm.valid) return null;

    const voucher: Voucher = {
      gdTyp: 11,
      gdMem: this.gdMem.value,
      gdTot: this.madeenTotal.value,
      gdTgdLok: 0,
      gdHDate: this.gdHDate.value,
      gdGDate: this.datepipe.transform(this.gdGDate.value, 'yyyy/MM/dd'),
      gdMnd: this.mndob.value,
      CurTyp: this.currency.value,
      RefNo: this.RefNo.value,
      details: this.detailsForm.value
    }

    this.ashalService.newVoucher(voucher)
    .subscribe(
      res => {
        console.log(res);
        this.newVoucherDefaults();
        this.tostr.success('تم تسجيل سند القيد بنجاح');
      },
      err => console.error(err)
    )
  

    console.log(voucher);
    
    // console.log(this.totalDiff.value);
    console.log(this.datepipe.transform(this.gdGDate.value, 'yyyy-MM-dd'));

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
    this.totalDiff.setValue(this.madeenTotal.value - this.daenTotal.value);
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
