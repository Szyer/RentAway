import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { UpdatepopComponent } from '../updatepop/updatepop.component';
import { UpdateCartComponent } from '../update-cart/update-cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    
  dataSource : any;
  productlist: any;

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

  productList:any;

  LoadUser(){
    this.service.Getallproduct().subscribe(res=>{
      this.productList = res;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    })

  }
  displayedColumns: string[] = ['id','name', 'price', 'quantity', 'action'];

  UpdateUser(code:any){
   const popup = this.DIALOG.open(UpdateCartComponent,{
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width:'50%',
      height:'10%',
      data:{
        usercode:code 
      }
    })
    popup.afterClosed().subscribe(res=>{
      this.LoadUser();
    })
  }
}
