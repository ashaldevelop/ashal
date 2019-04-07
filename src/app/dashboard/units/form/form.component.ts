import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';
import { last } from '@angular/router/src/utils/collection';
import { AshalService } from '../../../shared/ashal.service';

interface User{
  firstName: string;
  lastName: string;
  id?: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  user: User;
  id: any;

  constructor(public fb: FormBuilder, private ashalService: AshalService){
    this.defaults();
    this.getUser();
    this.form = fb.group({
      firstName: [this.user.firstName],
      lastName: ['', Validators.required],
      id: [, Validators.required]
    });
  }

  defaults(){
    return this.ashalService.getId().subscribe(
      res => {
        this.getUser(res);
        this.form.controls.id.setValue(this.user.id)
      }
    );
  }

  getUser(id?: number){
    this.user = {
      firstName: 'Ahmed',
      lastName: 'Oudah',
      id: id + 1
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  submit(){
    if (this.form.valid) {

      this.user.firstName = this.form.controls.firstName.value;
        console.log(this.user);
    }


  }

}
