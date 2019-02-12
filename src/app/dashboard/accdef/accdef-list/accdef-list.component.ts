import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AshalService } from '../../../shared/ashal.service';
import { AccDef } from 'src/app/shared/accdef';

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
    private ashalService: AshalService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient
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

}
