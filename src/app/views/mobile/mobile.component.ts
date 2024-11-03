import { Component } from '@angular/core';
import { LeftPanelComponent } from "../../layout/left-panel/left-panel.component";
import { RightPanelComponent } from "../../layout/right-panel/right-panel.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { PbButtonComponent } from "../../elements/pb-button/pb-button.component";
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { toggleSidebar } from '../../state/mobileview/mobileview.actions';
import { Observable, of } from 'rxjs';
import { selectMobileviewState, selectSidebarToggleStatus } from '../../state/mobileview/mobileview.selector';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [LeftPanelComponent, RightPanelComponent, HeaderComponent, PbButtonComponent, AsyncPipe, NgStyle],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.css'
})
export class MobileComponent {
  showSidebar$: Observable<boolean>;
  opacity20 = {
    opacity: '20%'
  }
  opacity100 = {
    opacity: '100%'
  }

  constructor(private store: Store<AppState>){
    this.showSidebar$ = this.store.select(selectSidebarToggleStatus);
  }

  showSidebar(){
    this.store.dispatch(toggleSidebar());
  }
}

