import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material module
import { MaterialModule } from '../shared/material';

import { SideNavComponent } from './side-nav/side-nav.component';
import { UnitsListComponent } from './units/units-list/units-list.component';

@NgModule({
  declarations: [SideNavComponent, UnitsListComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
