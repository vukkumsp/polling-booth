import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css'
})
export class ListingCardComponent {
  @Input() cardTitle: string = "";
  @Input() cardDescription: string = "";
}
