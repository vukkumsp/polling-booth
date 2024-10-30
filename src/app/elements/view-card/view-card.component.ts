import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { selectIsNewEventTopicInProgress } from '../../state/contract/contract.selector';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { newEventTopicIsNOTInprogress } from '../../state/contract/contract.actions';

@Component({
  selector: 'app-view-card',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})
export class ViewCardComponent {
  isNewEventTopicInprogress$: Observable<boolean>;
  tempOptionsLength: number = 1;

  constructor(private store: Store<AppState>){
    this.isNewEventTopicInprogress$ = store.select(selectIsNewEventTopicInProgress);
  }

  createAndSubmitNewTopic(formObject: any){
    console.log(formObject.form.value);
  }

  cancelNewTopic(){
    this.store.dispatch(newEventTopicIsNOTInprogress());
  }
}
