import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { UnitsListComponent } from './dashboard/units/units-list/units-list.component';
import { NewItemComponent } from './dashboard/items/new-item/new-item.component';
import { CategoryListComponent } from './dashboard/catogory/category-list/category-list.component';

const routes: Routes = [
  { 
    path: "dashboard", component: SideNavComponent,
    children: [
      { path: "units-list", component: UnitsListComponent },
      { path: "categorys-list", component: CategoryListComponent },
      { path: "new-item", component: NewItemComponent },
    ]
  },
  
    // {path: "units", component: UnitsComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
