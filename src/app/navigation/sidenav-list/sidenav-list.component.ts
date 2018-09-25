import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromAuthReducer from '../../auth/store/auth.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent{

  @Output('anchorActivated') public activated:EventEmitter<void> = new EventEmitter<void>();
  private isAuth$:Observable<boolean> = this.store.select(fromAuthReducer.getIsAuthenticated);

  constructor(
    private authService:AuthService,
    private store:Store<fromAuthReducer.AuthState>
  ) { }

  anchorClicked(){
    this.activated.emit();    
  }

  private ejectButtonClicked():void{
    this.authService.logout();
  }

}
