import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { UnitsListComponent } from './dashboard/units/units-list/units-list.component';
import { NewItemComponent } from './dashboard/items/new-item/new-item.component';
import { CategoryListComponent } from './dashboard/catogory/category-list/category-list.component';
import { AccdefListComponent } from './dashboard/accdef/accdef-list/accdef-list.component';
import { ItemsListComponent } from './dashboard/items/items-list/items-list.component';
import { VoucherComponent } from './dashboard/vouchers/voucher/voucher.component';
import { InvoiceComponent } from './dashboard/invoices/invoice/invoice.component';
import { ItemComponent } from './dashboard/items/item/item.component';

const routes: Routes = [
  { 
    path: "dashboard", component: SideNavComponent,
    children: [
      { path: "units-list", component: UnitsListComponent },
      { path: "categorys-list", component: CategoryListComponent },
      { path: "accdef-list", component: AccdefListComponent },
      { path: "items-list", component: ItemsListComponent },
      { path: "new-item", component: NewItemComponent },
      { path: "item/:id", component: ItemComponent },
      { path: "voucher/:id", component: VoucherComponent },
      { path: "invoice/:id", component: InvoiceComponent },
    ]
  },
  
    // {path: "units", component: UnitsComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
