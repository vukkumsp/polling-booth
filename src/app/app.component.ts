import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesktopComponent } from "./views/desktop/desktop.component";
import { MobileComponent } from "./views/mobile/mobile.component";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, DesktopComponent, MobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'polling-booth';
  window: Window|null;
  constructor (@Inject(DOCUMENT) private document: Document){
    this.window = this.document.defaultView;
  }
}
