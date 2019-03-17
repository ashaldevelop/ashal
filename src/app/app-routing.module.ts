import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { UnitsListComponent } from './dashboard/units/units-list/units-list.component';
import { NewItemComponent } from './dashboard/items/new-item/new-item.component';
import { CategoryListComponent } from './dashboard/catogory/category-list/category-list.component';
import { AccdefListComponent } from './dashboard/accdef/accdef-list/accdef-list.component';
import { NewVoucherComponent } from './dashboard/vouchers/new-voucher/new-voucher.component';
import { ItemsListComponent } from './dashboard/items/items-list/items-list.component';

const routes: Routes = [
  { 
    path: "dashboard", component: SideNavComponent,
    children: [
      { path: "units-list", component: UnitsListComponent },
      { path: "categorys-list", component: CategoryListComponent },
      { path: "accdef-list", component: AccdefListComponent },
      { path: "items-list", component: ItemsListComponent },
      { path: "new-item", component: NewItemComponent },
      { path: "new-voucher", component: NewVoucherComponent },
    ]
  },
  
    // {path: "units", component: UnitsComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
