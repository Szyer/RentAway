import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, DoCheck, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, AfterViewInit {
  title = 'newTask';
  @ViewChild('drawer', {static: false}) drawer!: MatSidenav;
  ismenurequired=false;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ){}
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
  }
}
