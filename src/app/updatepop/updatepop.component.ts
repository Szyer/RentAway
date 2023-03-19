import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Toast, ToastrService } from 'ngx-toastr'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-updatepop',
  templateUrl: './updatepop.component.html',
  styleUrls: ['./updatepop.component.css']
})
export class UpdatepopComponent implements OnInit {
  rolelist:any;
  editdata:any;
  constructor(
    private builder:FormBuilder,
    private service:AuthService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog:MatDialogRef<UpdatepopComponent>
  ){

  }
  ngOnInit(): void {
    this.service.getuserrole().subscribe(res=>{
      this.rolelist= res;
    })
    if(this.data.usercode!=null && this.data.usercode!=''){
      this.service.GetUserbyCode(this.data.usercode).subscribe(res=>{
      this.editdata = res;
      this.registerform.setValue({
        id:this.editdata.id,
        name:this.editdata.name,
        email:this.editdata.email,
        password:this.editdata.password,
        role:this.editdata.role,
        gender:this.editdata.gender,
        isactive:this.editdata.isactive
       })
    })
    
  
}
  }
registerform = this.builder.group({
  id: this.builder.control(''),
  name: this.builder.control(''),
  password: this.builder.control(''),
  email: this.builder.control(''),
  gender: this.builder.control('male'),
  role: this.builder.control('', Validators.required),
  isactive: this.builder.control(false)
}); 


  updateUser(){
    if(this.registerform.valid){
      this.service.updateuser(this.registerform.value.id, this.registerform.value).subscribe(res=>{
        this.toastr.success('Updated successfully');
        this.dialog.close();
      });
    }else{
      this.toastr.warning('Please select Role')
    }
  }
}
