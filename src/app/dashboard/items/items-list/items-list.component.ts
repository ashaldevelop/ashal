import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AshalService } from '../../../shared/ashal.service';
import { Item } from 'src/app/shared/item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  dataSource = new MatTableDataSource();

  items: Item[];
  listData: any;
  serial: number = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['index', 'Itm_No', 'Eng_Des', 'Arb_Des', 'controls'];

  constructor(
    private tostr: ToastrService,
    private ashalService: AshalService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    return this.ashalService.getItems().subscribe(
      res => {
        if(res){
          this.dataSource.data = res
          this.listData = this.dataSource
          this.items = res
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

  onDelete(Itm_No: string){
    this.ashalService.deleteItem(Itm_No)
    .subscribe(
      res => {
        console.log(res);
        this.tostr.success('item deleted');
        this.getItems();
      },
      err => console.error(err)
    )
  }

}
