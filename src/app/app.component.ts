import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, DoCheck, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from './service/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, AfterViewInit {
  title = 'newTask';
  @ViewChild('drawer', {static: false}) drawer!: MatSidenav;
  ismenurequired=false;
  isadminuser=false;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private service: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/menu.svg')
    );
  }
  ngAfterViewInit(): void {
    this.drawer.toggle();
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl=='/login' || currentUrl =='/register'){
      this.ismenurequired =false;
    }
    else{
      this.ismenurequired = true;
    }
    if (currentUrl == 'admin') {
      this.isadminuser = true;
    }else{
      this.isadminuser = false;
    }
  }
}
