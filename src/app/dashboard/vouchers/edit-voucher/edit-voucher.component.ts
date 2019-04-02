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
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css']
})
export class EditVoucherComponent implements OnInit {

  head: any;
  details: any;
  voucher: Voucher = {};

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    public datepipe: DatePipe
    ) {
  }

  ngOnInit() {
    this.getVoucher();
  }


  getVoucher(){
    return this.ashalService.getVoucher('1').subscribe(
      voucher => {
        if(voucher){

          this.voucher = {
            gdMem: voucher.GdHead.gdMem
          }

          console.log(voucher);
        }
      }
    );
    
  }



  newForm = this.fb.group({


    
    details: this.fb.array([]) // details

  });

}
