import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() public togleSidenv:EventEmitter<void>=new EventEmitter<void>();
  private isAuth:boolean = false;
  private authSubs:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authSubs = this.authService.authChanged.subscribe(
      (result)=>{       
        this.isAuth=result;
      }
    );
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }

  private sidenavToggle(){
    this.togleSidenv.emit();
  }

  public logoutClicked():void{
    this.authService.logout();
  }

}
