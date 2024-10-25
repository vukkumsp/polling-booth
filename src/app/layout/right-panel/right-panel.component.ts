import { Component } from '@angular/core';
import { ViewCardComponent } from "../../elements/view-card/view-card.component";

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [ViewCardComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {

}
