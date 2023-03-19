import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { UpdatepopComponent } from '../updatepop/updatepop.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {
  
  dataSource : any;
  userlist: any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service:AuthService,
    private DIALOG: MatDialog
    ){
    this.LoadUser();
}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  userList:any;

  LoadUser(){
    this.service.Getall().subscribe(res=>{
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    })

  }
  displayedColumns: string[] = ['username', 'name', 'email', 'password', 'role', 'status', 'action'];

  UpdateUser(code:any){
   const popup = this.DIALOG.open(UpdatepopComponent,{
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width:'50%',
      data:{
        usercode:code 
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.LoadUser();
    })
  }

  opendialog(){
    
  }
}
