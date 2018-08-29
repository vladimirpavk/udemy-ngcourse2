import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output('anchorActivated') public activated:EventEmitter<void> = new EventEmitter<void>();
  private isAuth:boolean = false;
  private authSubs:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authSubs = this.authService.authChanged.subscribe(
      (result)=>{
        this.isAuth = result;
      }
    )
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }

  anchorClicked(){
    this.activated.emit();    
  }

  private ejectButtonClicked():void{
    this.authService.logout();
  }

}
