import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { updateSelectedEvent, updateSelectedEventId } from '../../state/contract/contract.actions';
import { Summary } from '../../ethereum/contractProxyClasses/Summary';
import { toggleSidebar } from '../../state/mobileview/mobileview.actions';

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
  @Input() status: boolean = false;

  @Input() summary: Summary|null = null;

  constructor(private store: Store<AppState>){}

  topicSelectedHandler(selectedId: number){
    console.log("selecting this topic")
    console.log(selectedId);
    this.store.dispatch(updateSelectedEvent({summary: this.summary}));
    this.store.dispatch(updateSelectedEventId({id:selectedId}));
    //For mobile view, close the sidebar
    this.store.dispatch(toggleSidebar());
  }
}
