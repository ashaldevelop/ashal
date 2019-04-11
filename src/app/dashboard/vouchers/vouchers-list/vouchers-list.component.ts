import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AshalService } from '../../../shared/ashal.service';
import { Voucher } from 'src/app/shared/voucher';

@Component({
  selector: 'app-vouchers-list',
  templateUrl: './vouchers-list.component.html',
  styleUrls: ['./vouchers-list.component.css']
})
export class VouchersListComponent implements OnInit {

  dataSource = new MatTableDataSource();

  vouchers: Voucher[];
  listData: any;
  serial: number = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['index', 'gdNo', 'gdMem', 'gdGDate', 'gdTot',  'controls'];

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getVouchers();
  }

  getVouchers(){
    return this.ashalService.getVouchers().subscribe(
      res => {
        if(res){
          this.dataSource.data = res
          this.listData = this.dataSource
          this.vouchers = res
          console.log(res)
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

  // onDelete(Itm_No: string){
  //   this.ashalService.deleteItem(Itm_No)
  //   .subscribe(
  //     res => {
  //       console.log(res);
  //       this.tostr.success('item deleted');
  //       this.getVouchers();
  //     },
  //     err => console.error(err)
  //   )
  // }

}
