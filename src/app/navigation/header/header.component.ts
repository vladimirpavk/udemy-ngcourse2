import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public togleSidenv:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  private sidenavToggle(){
    this.togleSidenv.emit();
  }

}
