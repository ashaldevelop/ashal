import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AshalService } from '../../../shared/ashal.service';
import { AccDef } from 'src/app/shared/accdef';
import { NewAccdefComponent } from '../new-accdef/new-accdef.component';

@Component({
  selector: 'app-accdef-list',
  templateUrl: './accdef-list.component.html',
  styleUrls: ['./accdef-list.component.css']
})
export class AccdefListComponent implements OnInit {

  dataSource = new MatTableDataSource();

  accdef: AccDef[];
  listData: any;
  serial: number = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['index', 'Eng_Des', 'Arb_Des', 'AccDef_No'];

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAccDef();
  }

  getAccDef(){
    return this.ashalService.getAccDef().subscribe(
      res => {
        if(res){
          this.dataSource.data = res
          this.listData = this.dataSource
          this.accdef = res
        }
      }
    );
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  // new
  onCreateNew(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    const dialogCallBack = this.dialog.open(NewAccdefComponent, dialogConfig);
    dialogCallBack.afterClosed().subscribe(() => {
      this.getAccDef();
    });
  }

  // edit
  onEdit(Unit_No: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    dialogConfig.data = Unit_No;
    const dialogCallBack = this.dialog.open(NewAccdefComponent, dialogConfig);
    dialogCallBack.afterClosed().subscribe(() => {
      this.getAccDef();
    });
  }

  // delete
  onDelete(accdef: string){
    this.ashalService.deleteAccdef(accdef)
    .subscribe(
      res => {
        console.log(res);
        this.tostr.success('accdef deleted');
        this.getAccDef();
      },
      err => console.error(err)
    )
}

}
