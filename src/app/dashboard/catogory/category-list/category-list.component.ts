import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AshalService } from '../../../shared/ashal.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  dataSource = new MatTableDataSource();

  categorys: Category[];
  listData: any;
  serial: number = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['index', 'Eng_Des', 'Arb_Des', 'CAT_No'];

  constructor(
    private ashalService: AshalService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCategorys();
  }

  getCategorys(){
    return this.ashalService.getCategorys().subscribe(
      res => {
        if(res){
          this.dataSource.data = res
          this.listData = this.dataSource
          this.categorys = res
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
    const dialogCallBack = this.dialog.open(NewCategoryComponent, dialogConfig);
    dialogCallBack.afterClosed().subscribe(() => {
      this.getCategorys();
    });
  } 

}
