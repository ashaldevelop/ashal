import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Invoice } from '../../../shared/invoice';
import { DatePipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {

  id:any;
  invoice: Invoice = {};

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute
    ){this.route.params.subscribe(params => {this.id = params.id})}

  ngOnInit() {
    
  }

  getInvoice(id:any){
    if(id == 0){
      this.invoice = {
        InvNo: '',
        HDat: '',
        GDat: '',
        LTim: '',
        InvCashPay: 0,
        CusVenNo: '',
        CusVenNm: '',
        CashAcc: '',
        CusVenTel: '',
        CusVenAdd: '',
        CurTyp: '',
        RefNo: '',
        ClcQnt: '',
        MndNo: '',
        Remark: '',
        Vat_No: '',
        InvCash: '',
        InvCstNo:'',
        InvCstNo1: '',
        CashPay: 0,
        InvTot: 0,
        InvTotLocCur: 0,
        InvQty: 0,
        InvDisVal: 0,
        InvDisValLoc: 0, 
        Commission: 0,
        InvDisPrs: 0,
        ShippingRates: 0,
        ShipExpens: 0,
        InvNet: 0,
        InvNetLocCur: 0,
        SHR_AccNo: '',
        SHR_AccName: '',
        OE_AccNo: '',
        OE_AccName: '',
        InvWight_T: 0,
        TaxTot: 0,
        IfDel: 0,
        details: []
      }
    }
  }

  newForm = this.fb.group({

    InvNo: [''],
    HDat: '',
    GDat: '',
    LTim: '',
    InvCashPay: 0,
    CusVenNo: '',
    CusVenNm: '',
    CashAcc: '',
    CusVenTel: '',
    CusVenAdd: '',
    CurTyp: '',
    RefNo: '',
    ClcQnt: '',
    MndNo: '',
    Remark: '',
    Vat_No: '',
    InvCash: '',
    InvCstNo:'',
    InvCstNo1: '',
    CashPay: 0,
    InvTot: 0,
    InvTotLocCur: 0,
    InvQty: 0,
    InvDisVal: 0,
    InvDisValLoc: 0, 
    Commission: 0,
    InvDisPrs: 0,
    ShippingRates: 0,
    ShipExpens: 0,
    InvNet: 0,
    InvNetLocCur: 0,
    SHR_AccNo: '',
    SHR_AccName: '',
    OE_AccNo: '',
    OE_AccName: '',
    InvWight_T: 0,
    TaxTot: 0,
    IfDel: 0,

    
    details: this.fb.array([]) // details

  });


}
