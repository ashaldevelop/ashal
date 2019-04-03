import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Voucher } from '../../../shared/voucher';
import { isError } from 'util';
import { DatePipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css']
})
export class EditVoucherComponent implements OnInit {

  id:any;
  voucher: Voucher = {};
  totalDiff: number = 0;
  currencys: object;
  mndobs: object;
  accdefs: object;
  balance:any = '';
  gdCsts: object;

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute
    ){this.route.params.subscribe(params => {this.id = params.id})}

  ngOnInit() {
    this.getVoucher();
    this.newVoucherDefaults();
    this.accdefActive.disable();
    this.activeBalance.disable();
  }

  // totalDiffValidator(control: AbstractControl){
  //   if(control.value !== 0){
  //     return { isError: true }
  //   }
  //   return null;
  // }

  newVoucherDefaults(){
    return this.ashalService.newVoucherDefaults().subscribe(
      res => {
        if(res){
          this.currencys = res.currencys;
          this.mndobs = res.mndobs;
          this.accdefs = res.accdefs;
          this.gdCsts = res.gdCsts;
        }
      }
    );
  }


  getVoucher(){
    return this.ashalService.getVoucher(this.id).subscribe(
      voucher => {
        if(voucher){

          this.voucher = {
            gdhead_ID: voucher.GdHead.gdhead_ID,
            gdNo: voucher.GdHead.gdNo,
            gdMem: voucher.GdHead.gdMem,
            CurTyp: voucher.GdHead.CurTyp,
            gdMnd: voucher.GdHead.gdMnd,
            RefNo: voucher.GdHead.RefNo,

            details: voucher.GdDetails,

          }

          for(var i = 0; i < this.voucher.details.length; i++){
            this.loadedDetails(i);
            this.voucher.details[i].madeen = this.voucher.details[i].gdValue > 0 ? this.voucher.details[i].gdValue : 0;
            this.voucher.details[i].daen = this.voucher.details[i].gdValue < 0 ? Math.abs(this.voucher.details[i].gdValue) : 0;
          }

          this.getTotal();

          // console.log(this.voucher.details)



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
    CurTyp : [''],
    gdMnd : [''],
    activeBalance : [''],

    
    details: this.fb.array([]) // details

  });

  get detailsForm(){ return this.newForm.get('details') as FormArray }
  get accdefActive() { return this.newForm.get('accdefActive') }
  get madeenTotal() { return this.newForm.get('madeenTotal') }
  get daenTotal() { return this.newForm.get('daenTotal') }
  get activeBalance() { return this.newForm.get('activeBalance') }



  // add details to details form aray
  loadedDetails(i){

    const details = this.fb.group({
      AccNo: [''],
      AccName: [''],
      gdDes: [''],
      madeen: [0],
      daen: [0],
      gdCstNo: [''],
      InvNo: [''],
    });

    

    this.detailsForm.push(details);
    

  }

  addDetails(){

    this.voucher.details.push(
        
        {
          'AccNo' : '',
          'gdCstNo' : '1',
          'gdDes' : '',
          'InvNo' : '',
          'madeen' : 0,
          'daen' : 0,
          'gdValue' : 0,
        }

      )

    const details = this.fb.group({
      AccNo: [''],
      AccName: [''],
      gdDes: [''],
      madeen: [0],
      daen: [0],
      gdCstNo: [''],
      InvNo: [''],
    });

    this.detailsForm.push(details);

  }

  // remove details to details form aray
  removeDetails(i: number){
    if(this.voucher.details.length > 1){
      this.voucher.details.splice(i,1);
      this.detailsForm.removeAt(i);
      this.getTotal();
    }
  }

  getTotal(){
     var madeenTotal: number = 0;
     var daenTotal: number = 0;
     for (let i = 0; i < this.voucher.details.length; i++) { 
      madeenTotal += Number(this.voucher.details[i].madeen);
      daenTotal += Number(this.voucher.details[i].daen);
     }
     this.madeenTotal.setValue(madeenTotal);
     this.daenTotal.setValue(daenTotal);
     this.totalDiff = this.madeenTotal.value - this.daenTotal.value;
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

}
