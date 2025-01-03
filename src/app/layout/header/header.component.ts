import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { selectAccountAddress, selectAccountRole } from '../../state/account/account.selector';
import { AsyncPipe } from '@angular/common';
import { AccountRole } from '../../state/account/account.state';
import { AddressFormatterPipe } from "../../elements/address-formatter-pipe/address-formatter.pipe";
import { PbButtonComponent } from "../../elements/pb-button/pb-button.component";
import { newEventTopicIsNOTInprogress, selectLocalNetwork, selectSepoliaNetwork, unSelectedEvent, unSelectedEventId } from '../../state/contract/contract.actions';
import { WalletService } from '../../ethereum/wallet/wallet.service';
import { selectNetwork } from '../../state/contract/contract.selector';
import { toggleSidebar } from '../../state/mobileview/mobileview.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, AddressFormatterPipe, PbButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  accountRole$: Observable<AccountRole>;
  accountAddress$: Observable<string>;

  constructor(private store: Store<AppState>, private wallet: WalletService){
    this.accountRole$ = this.store.select(selectAccountRole);
    this.accountAddress$ = this.store.select(selectAccountAddress);
  }

  ngOnInit(){
    // this.accountConnected$ = this.store.select(selectConnectionStatus);
    // this.accountRole$.subscribe(val => console.log(val));
  }

  goToHome(){
    this.store.dispatch(newEventTopicIsNOTInprogress());
    this.store.dispatch(unSelectedEvent());
    this.store.dispatch(unSelectedEventId());
  }

  getSelectedNetwork($event: any){
    console.log("Selected n/w : "+$event.target.value);
    switch($event.target.value){
      case "sepolia": this.store.dispatch(selectSepoliaNetwork());
        break;
      case "local":
      default: this.store.dispatch(selectLocalNetwork());
    }
    
  }

  showSidebar(){
    console.log("showSidebar from header");
    this.store.dispatch(toggleSidebar());
  }

  connectToWallet(){
    this.store.select(selectNetwork).subscribe(
      (selectedNetwork)=>{
        this.wallet.getContract(selectedNetwork);
      }
    );
  }
}
