import { Component, OnInit, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ToastrService } from 'ngx-toastr';
import { AshalService } from '../../../shared/ashal.service';
import { AccDef } from 'src/app/shared/accdef';

@Component({
  selector: 'app-new-accdef',
  templateUrl: './new-accdef.component.html',
  styleUrls: ['./new-accdef.component.css']
})
export class NewAccdefComponent implements OnInit {

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<NewAccdefComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
  }

  newForm = this.fb.group({

    Eng_Des : ['', Validators.required],
    Arb_Des : ['', Validators.required]

  });

  ngOnInit() {
    if(this.data)this.setValues();
  }

  // set form values if edit
  private setValues(){

    this.ashalService.viewAccdef(this.data).subscribe(
      res => {
        this.newForm.patchValue({
          Eng_Des: res.Eng_Des,
          Arb_Des: res.Arb_Des
        });
      },
      err => console.error(err)
    )

  }


  // Using getters will make your code look pretty
  get Eng_Des() { return this.newForm.get('Eng_Des') }
  get Arb_Des() { return this.newForm.get('Arb_Des') }


  // new or update accdef
  public newAccdef() {

    if(!this.newForm.valid) return null;
    const vals = this.newForm.value;
    
    const accdef: AccDef = {
      Eng_Des: this.Eng_Des.value,
      Arb_Des: this.Arb_Des.value
    }


    // if update
    if(this.data){
      this.ashalService.updateAccdef(this.data, accdef)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
          this.tostr.success('accdef updated');
        },
        err => console.error(err)
      )
    }

    // if new
    else{
      this.ashalService.newAccDef(accdef)
      .subscribe(
        res => {
          console.log(res);
          this.dialogRef.close();
          this.tostr.success('New AccDef Created');
        },
        err => console.error(err)
      )
    }


  }


  // close popup form
  onClose(){
    // this.newBreadwinnerForm.reset();
    this.dialogRef.close();
  }

}