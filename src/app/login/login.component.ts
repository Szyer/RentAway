import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userdata: any;
  constructor(
    private builder: FormBuilder, 
    private service: AuthService, 
    private router: Router,
    private toastr: ToastrService
    ) {
      sessionStorage.clear();
     }

    loginform=this.builder.group({
      username:this.builder.control('',Validators.required),
      password:this.builder.control('', Validators.required)
    })

    proceedlogin() {
      // if (this.loginform.valid) {
      //   this.service.RegisterUser(this.loginform.value).subscribe(result => {
      //     this.toastr.success('Please contact admin for enable access.','Registered successfully')
      //     this.router.navigate(['login'])
      //   });
      // } else {
      //   this.toastr.warning('Please enter valid data.')
      // }
      this.service.GetUserbyCode(this.loginform.value.username).subscribe(res=>{
        this.userdata=res;
      console.log(this.userdata);     
      if(this.userdata.password === this.loginform.value.password){
        if(this.userdata.isactive){
          sessionStorage.setItem('username', this.userdata.id);
          sessionStorage.setItem('userrole', this.userdata.role);
          this.router.navigate(['/aboutus']);
        }else{
          this.toastr.error("Inactive User, Please Contact Admin")
        }
      } else{
        this.toastr.error('Invalid Credentials');
      }
    });

    }
}
