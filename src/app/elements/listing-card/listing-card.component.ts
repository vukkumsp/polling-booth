import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [],
  providers:[FormsModule],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css'
})
export class ListingCardComponent {
  @Input() id: number = -1;
  @Input() cardTitle: string = "";
  @Input() cardDescription: string = "";

  topicSelectedHandler(selectedId: number){
    console.log("selecting this topic")
    console.log(selectedId);
  }
}
