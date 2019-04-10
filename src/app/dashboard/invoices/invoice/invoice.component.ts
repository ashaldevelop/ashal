import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Invoice } from '../../../shared/invoice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  form: FormGroup;
  save: string;
  invoice: Invoice = {};
  id: any;

  // invoice defaults
  accdefs: object;
  cashAccdefs: object;
  currencys: object; // العملات
  csts: object; // مركز التكلفة
  mndobs: object; // المندوبين
  items: object; // الأصناف
  stores: object; // المستودعات
  
  // get units based on selected item
  units: any;
  
  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: { id: any; }) => { this.id = params.id; });
    this.preInvoice();
    this.getInvoice();
    this.form = fb.group({
      InvNo : [],
      InvCashPay : [0],
      CusVenNo : [""],
      CashAcc : [1020001],
      CusVenTel : [],
      CusVenAdd : [],
      CurTyp : [1],
      RefNo : [],
      MndNo : [""],
      Remark : [],
      Vat_No : [],
      CustPri : [0],
      InvCstNo : [1],
      InvCstNo1 : [1],
      accdefActive : [],
      CashPay : [],
      InvTot : [],
      InvQty : [],
      InvDisVal : [],
      Commission : [],
      InvDisPrs : [],
      ShippingRates : [],
      InvNet : [],
      ShipExpens : [],
      InvWight_T : [],
      TaxTot : [],
      details: fb.array([]), // details
    });
  }

  get detailsForm(){ return this.form.get('details') as FormArray }

  // add details to details form aray
  addDetails(){
    const details = this.fb.group({
      ItmNo : [""],
      ItmDes : [],
      ItmUnt : [],
      StoreNo : [1],
      Qty : [],
      Price : [],
      ItmDis : [],
      Amount : [],
    });

    this.detailsForm.push(details);

  }

  preInvoice(){
    this.ashalService.preInvoice().subscribe(

      preInvoice => {
        this.currencys = preInvoice.currencys;
        this.mndobs = preInvoice.mndobs;
        this.accdefs = preInvoice.accdefs;
        this.cashAccdefs = preInvoice.cashAccdefs;
        this.csts = preInvoice.csts;
        this.stores = preInvoice.stores;
        this.items = preInvoice.items;
      }


    );
  }

  getInvoice(){
    this.ashalService.getInvoice(this.id).subscribe(
      invoice => {
        this.invoice = invoice;

        if(this.id==0){

          this.form.patchValue({
            InvNo: parseInt(this.invoice.INVHED.InvNo) + 1,
          });

          this.addDetails();

        }else{
          this.form.patchValue({
          });

          for(var i = 0; i < this.invoice.INVDET.length; i++){
            this.addDetails();
          }
          
        }

      }
    );
  }

  accdefChanged(value: string){
    this.form.controls['CusVenNo'].patchValue(this.form.controls['CusVenNo'].value);
    this.form.controls['accdefs'].patchValue(this.form.controls['CusVenNo'].value);
  }

  // get item desc when item changed  
  itemChanged(ItmNo: string, i:number){
    this.ashalService.getItemData(ItmNo).subscribe(
      res => {
        this.detailsForm.controls[i]['controls']['ItmDes'].patchValue(res.arbDesc);
        this.detailsForm.controls[i]['controls']['ItmUnt'].patchValue(res.defaultUnit);
        this.units = res.units;
        this.unitChanged(this.detailsForm.controls[i]['controls']['ItmUnt'].patchValue(res.defaultUnit), i);
      }
    );
  }

  // get price of unit
  unitChanged(ItmUnt: string, i:number){
    console.log(this.detailsForm.controls[i]['controls']['ItmUnt'].value);
    console.log(this.detailsForm.controls[i]['controls']['ItmNo'].value);
  }

  ngOnInit() {
    this.save = this.id == 0 ? 'save' : 'update';
    this.form.controls['InvNo'].disable();
  }

}
