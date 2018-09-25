import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromAuthReducer from '../../auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  @Output() public togleSidenv:EventEmitter<void>=new EventEmitter<void>();
  private isAuth$:Observable<boolean> = this.store.select(fromAuthReducer.getIsAuthenticated);

  constructor(
    private authService:AuthService,
    private store:Store<fromAuthReducer.AuthState>
  ) { }

  ngOnInit() {
    
  }
  
  private sidenavToggle(){
    this.togleSidenv.emit();
  }

  public logoutClicked():void{
    this.authService.logout();
  }

}
