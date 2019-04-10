import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Voucher } from '../../../shared/voucher';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  form: FormGroup;
  save: string;
  voucher: Voucher = {};
  id: any;

  // voucher defaults
  accdefs: object;
  currencys: object; // العملات
  csts: object; // مركز التكلفة
  mndobs: object; // المندوبين

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: { id: any; }) => { this.id = params.id; });
    this.preVoucher();
    this.getVoucher();
    this.form = fb.group({
      gdhead_ID : [],
      gdNo : [, Validators.required],
      gdMnd : [1, Validators.required],
      RefNo : [''],
      CurTyp : [1,Validators.required],
      details: fb.array([]), // details
      accdefActive : [''],
      balance : [''],
      madeenTotal : [0],
      daenTotal : [0],
      gdMem : [''],
      totalDiff : [0],
    });
  }

  get detailsForm(){ return this.form.get('details') as FormArray }

  // add details to details form aray
  addDetails(){
    const details = this.fb.group({
      AccNo: ['', Validators.required],
      AccName: ['', Validators.required],
      gdDes: ['', Validators.required],
      madeen: [0, Validators.required],
      daen: [0, Validators.required],
      gdCstNo: [1],
      InvNo: [''],
    });

    this.detailsForm.push(details);

  }

  // remove details row
  removeDetails(i: number){
    this.form.controls['accdefActive'].patchValue("");
    this.form.controls['balance'].patchValue("");
    if(this.detailsForm.length ==1){
        this.detailsForm.removeAt(i);
        this.addDetails();
        return false;
    }
    this.detailsForm.removeAt(i);
  }

  preVoucher(){
    this.ashalService.preVoucher().subscribe(

      preVoucher => {

        this.currencys = preVoucher.currencys;
        this.mndobs = preVoucher.mndobs;
        this.accdefs = preVoucher.accdefs;
        this.csts = preVoucher.csts;
      }

    );
  }

  getVoucher(){
    this.ashalService.getVoucher(this.id).subscribe(
      voucher => {
        this.voucher = voucher;

        if(this.id==0){

          this.form.patchValue({
            gdhead_ID: this.voucher.GdHead.gdhead_ID + 1,
            gdNo: parseInt(this.voucher.GdHead.gdNo) + 1
          });

          this.addDetails();

        }else{
          this.form.patchValue({
            gdhead_ID: this.voucher.GdHead.gdhead_ID,
            gdNo: this.voucher.GdHead.gdNo,
            gdMnd: this.voucher.GdHead.gdMnd,
            CurTyp: this.voucher.GdHead.CurTyp,
            RefNo: this.voucher.GdHead.RefNo,
            gdMem: this.voucher.GdHead.gdMem,
          });

          for(var i = 0; i < this.voucher.GdDetails.length; i++){
            this.addDetails();
            this.detailsForm.controls[i]['controls']['AccNo'].patchValue(this.voucher.GdDetails[i].AccNo);
            this.detailsForm.controls[i]['controls']['AccName'].patchValue(this.voucher.GdDetails[i].AccNo);
            this.detailsForm.controls[i]['controls']['gdDes'].patchValue(this.voucher.GdDetails[i].gdDes);
            this.detailsForm.controls[i]['controls']['madeen'].patchValue(this.voucher.GdDetails[i].gdValue > 0 ? this.voucher.GdDetails[i].gdValue : 0);
            this.detailsForm.controls[i]['controls']['daen'].patchValue(this.voucher.GdDetails[i].gdValue < 0 ? Math.abs(this.voucher.GdDetails[i].gdValue) : 0);
            this.detailsForm.controls[i]['controls']['gdCstNo'].patchValue(this.voucher.GdDetails[i].gdCstNo);
            this.detailsForm.controls[i]['controls']['InvNo'].patchValue(this.voucher.GdDetails[i].InvNo);
          }
          
        }

      }
    );
  }

    accdefChanged(value: string, i){
      this.detailsForm.controls[i].patchValue({AccName: value});
      this.detailsForm.controls[i].patchValue({AccNo: value});
      this.form.controls['accdefActive'].patchValue(this.detailsForm.controls[i]['controls']['AccNo'].value);
      this.getActiveAccdefBalance(this.detailsForm.controls[i]['controls']['AccNo'].value);
    }

  getActiveAccdefBalance(AccNo:string){
    this.ashalService.getAccdefBalance(AccNo)
    .subscribe(
      res => {
        this.form.controls['balance'].patchValue(res);
    },
      err => console.error(err)
    )
  }

  onChangeMadeenValue(value : number ,i: number) {
    if(value > 0)this.detailsForm.controls[i].patchValue({daen: 0})
    this.getTotal();
  }

  onChangeDaenValue(value : number ,i: number) {
    if(value > 0)this.detailsForm.controls[i].patchValue({madeen: 0})
    this.getTotal();
  }

  getTotal(): number{
    var madeenTotal: number = 0;
    var daenTotal: number = 0;
    for (let i = 0; i < this.detailsForm.length; i++) { 
     madeenTotal += Number(this.detailsForm.controls[i]['controls']['madeen'].value);
     daenTotal += Number(this.detailsForm.controls[i]['controls']['daen'].value);
    }
    this.form.controls['madeenTotal'].setValue(madeenTotal);
    this.form.controls['daenTotal'].setValue(daenTotal);
    this.form.controls['totalDiff'].setValue(this.form.controls['madeenTotal'].value - this.form.controls['daenTotal'].value);
    return this.form.controls['totalDiff'].value;
 }


  submit(){
    this.voucher = this.form.value;

    this.ashalService.newVoucher(this.voucher)
    .subscribe(
      res => {
        console.log(res);
        this.tostr.success('تم تسجيل سند القيد بنجاح');
        while(this.detailsForm.length !==0){
          this.detailsForm.removeAt(0);
        }
        this.form.reset();
        this.preVoucher();
        this.getVoucher();
      },
      err => console.error(err)
    )

  }

  ngOnInit(){
    this.save = this.id == 0 ? 'save' : 'update';
    this.form.controls['gdhead_ID'].disable();
    this.form.controls['accdefActive'].disable();
    this.form.controls['balance'].disable();
    this.form.controls['totalDiff'].disable();

    if(this.id !=0)this.form.controls['gdNo'].disable();


  }

}
