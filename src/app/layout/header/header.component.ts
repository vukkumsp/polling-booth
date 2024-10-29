import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { selectAccountAddress, selectAccountRole } from '../../state/account/account.selector';
import { AsyncPipe } from '@angular/common';
import { AccountRole } from '../../state/account/account.state';
import { AddressFormatterPipe } from "../../elements/address-formatter-pipe/address-formatter.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, AddressFormatterPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  accountRole$: Observable<AccountRole>;
  accountAddress$: Observable<string>;

  constructor(private store: Store<AppState>){
    this.accountRole$ = this.store.select(selectAccountRole);
    this.accountAddress$ = this.store.select(selectAccountAddress);
  }

  ngOnInit(){
    // this.accountConnected$ = this.store.select(selectConnectionStatus);
    // this.accountRole$.subscribe(val => console.log(val));
  }
}
