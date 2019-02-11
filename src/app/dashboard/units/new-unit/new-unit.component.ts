import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { Unit } from 'src/app/shared/unit';


@Component({
  selector: 'app-new-unit',
  templateUrl: './new-unit.component.html',
  styleUrls: ['./new-unit.component.css']
})
export class NewUnitComponent implements OnInit {

  newForm: FormGroup;

  constructor(
    private tostr: ToastrService,
    private router: Router,
    private ashalService: AshalService,
    public fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<NewUnitComponent>,
    ) {
  }

  ngOnInit() {
    this.unitForm();
  }

  private unitForm() {
    this.newForm = this.fb.group({
      Eng_Des: ['', [Validators.required]],
      Arb_Des: ['', [Validators.required]]
    });
  }

  // Using getters will make your code look pretty
  get Eng_Des() { return this.newForm.get('Eng_Des') }
  get Arb_Des() { return this.newForm.get('Arb_Des') }

  public newUnit() {

    if (!this.newForm.valid) return null;
    const vals = this.newForm.value;
    
    const unit: Unit = {
      Eng_Des: this.Eng_Des.value,
      Arb_Des: this.Arb_Des.value
    }

    this.ashalService.newUnit(unit)
    .subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();
        this.tostr.success('New Unit Created');
      },
      err => console.error(err)
    )


  }

  onClose(){
    // this.newBreadwinnerForm.reset();
    this.dialogRef.close();
  }

}