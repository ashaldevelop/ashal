import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
// material module
import { MaterialModule } from '../shared/material';

import { SideNavComponent } from './side-nav/side-nav.component';
import { UnitsListComponent } from './units/units-list/units-list.component';
import { NewUnitComponent } from './units/new-unit/new-unit.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { NewItemComponent } from './items/new-item/new-item.component';
import { CategoryListComponent } from './catogory/category-list/category-list.component';
import { NewCategoryComponent } from './catogory/new-category/new-category.component';
import { AccdefListComponent } from './accdef/accdef-list/accdef-list.component';
import { NewAccdefComponent } from './accdef/new-accdef/new-accdef.component';
import { VoucherComponent } from './vouchers/voucher/voucher.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { ItemComponent } from './items/item/item.component';
import { VouchersListComponent } from './vouchers/vouchers-list/vouchers-list.component';

@NgModule({
  declarations: [SideNavComponent,
    UnitsListComponent,
    NewUnitComponent,
    ItemsListComponent,
    NewItemComponent,
    CategoryListComponent,
    NewCategoryComponent,
    AccdefListComponent,
    NewAccdefComponent,
    VoucherComponent,
    InvoiceComponent,
    ItemComponent,
    VouchersListComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  entryComponents:[NewUnitComponent, NewCategoryComponent, NewAccdefComponent, VouchersListComponent]
})
export class DashboardModule { }
