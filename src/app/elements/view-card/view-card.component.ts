import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { selectIsNewEventTopicInProgress } from '../../state/contract/contract.selector';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { newEventTopicIsNOTInprogress } from '../../state/contract/contract.actions';
import { PbButtonComponent } from "../pb-button/pb-button.component";
import { AddTopicCardComponent } from "../add-topic-card/add-topic-card.component";

@Component({
  selector: 'app-view-card',
  standalone: true,
  imports: [AsyncPipe, FormsModule, PbButtonComponent, AddTopicCardComponent],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})
export class ViewCardComponent {
  isNewEventTopicInprogress$: Observable<boolean>;
  tempOptions: string[] = [""]

  constructor(private store: Store<AppState>){
    this.isNewEventTopicInprogress$ = store.select(selectIsNewEventTopicInProgress);
  }

  createAndSubmitNewTopic(formObject: any){
    console.log(formObject.form.value);
  }

  cancelNewTopic(){
    this.tempOptions = [""];
    this.store.dispatch(newEventTopicIsNOTInprogress());
  }

  addAnotherOption(){
    this.tempOptions.push("");
  }

  removeLastOption(){
    this.tempOptions.pop();
  }
}