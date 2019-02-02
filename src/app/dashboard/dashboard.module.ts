import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

// material module
import { MaterialModule } from '../../shared/material';

import { SideNavComponent } from './side-nav/side-nav.component';
import { UnitsListComponent } from './units/units-list/units-list.component';

@NgModule({
  declarations: [SideNavComponent, UnitsListComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }