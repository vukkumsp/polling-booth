import { Component } from '@angular/core';
import { LeftPanelComponent } from "../../layout/left-panel/left-panel.component";
import { RightPanelComponent } from "../../layout/right-panel/right-panel.component";
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [LeftPanelComponent, RightPanelComponent, HeaderComponent],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.css'
})
export class MobileComponent {

}
