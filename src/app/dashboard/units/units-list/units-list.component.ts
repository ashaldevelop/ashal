import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AshalService } from '../../../shared/ashal.service';
import { NewUnitComponent } from '../new-unit/new-unit.component';
import { Unit } from 'src/app/shared/unit';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.css']
})
export class UnitsListComponent implements OnInit {

  dataSource = new MatTableDataSource();

  units: Unit[];
  listData: any;
  serial: number = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['index', 'Eng_Des', 'Arb_Des', 'Unit_No'];

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getUnits();
  }

  getUnits(){
    return this.ashalService.getUnits().subscribe(
      res => {
        if(res){
          this.dataSource.data = res
          this.listData = this.dataSource
          this.units = res
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

  onCreateNew(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    const dialogCallBack = this.dialog.open(NewUnitComponent, dialogConfig);
    dialogCallBack.afterClosed().subscribe(() => {
      this.getUnits();
    });
  }

  onEdit(Unit_No: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';
    dialogConfig.data = Unit_No;
    const dialogCallBack = this.dialog.open(NewUnitComponent, dialogConfig);
    dialogCallBack.afterClosed().subscribe(() => {
      this.getUnits();
    });
  }

  onDelete(Unit_No: string){
    this.ashalService.deleteUnit(Unit_No)
    .subscribe(
      res => {
        console.log(res);
        this.tostr.success('unit deleted');
        this.getUnits();
      },
      err => console.error(err)
    )
}

}
