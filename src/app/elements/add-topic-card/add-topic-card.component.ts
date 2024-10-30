import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { newEventTopicIsInprogress } from '../../state/contract/contract.actions';

@Component({
  selector: 'app-add-topic-card',
  standalone: true,
  imports: [],
  templateUrl: './add-topic-card.component.html',
  styleUrl: './add-topic-card.component.css'
})
export class AddTopicCardComponent {

  constructor(private store: Store<AppState>){}

  addTopicHandler(){
    console.log("Adding new topic")
    this.store.dispatch(newEventTopicIsInprogress());
  }
}
