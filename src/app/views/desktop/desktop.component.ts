import { Component } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { LeftPanelComponent } from "../../layout/left-panel/left-panel.component";
import { RightPanelComponent } from "../../layout/right-panel/right-panel.component";

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [HeaderComponent, LeftPanelComponent, RightPanelComponent],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {

}
