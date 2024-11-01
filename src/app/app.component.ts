import { Component, HostListener, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesktopComponent } from "./views/desktop/desktop.component";
import { MobileComponent } from "./views/mobile/mobile.component";
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { WalletService } from './ethereum/wallet/wallet.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, DesktopComponent, MobileComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'polling-booth';
  windowWidth: number = window.innerWidth;
  constructor (private wallet: WalletService){
    // To trigger wallet connect on start up of app
    this.wallet.getContract();
  }

  //Listens to windowWidth
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth; // Update width on resize
  }
}
