import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, switchScan } from 'rxjs';
import { AppState } from '../../state/app.state';
import { selectEventSummaries, selectIsNewEventTopicInProgress, selectSelectedEventSummary } from '../../state/contract/contract.selector';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { newEventTopicIsNOTInprogress } from '../../state/contract/contract.actions';
import { PbButtonComponent } from "../pb-button/pb-button.component";
import { AddTopicCardComponent } from "../add-topic-card/add-topic-card.component";
import { WalletService } from '../../ethereum/wallet/wallet.service';
import { Summary } from '../../ethereum/contractProxyClasses/Summary';
import { AccountRole } from '../../state/account/account.state';
import { selectAccountRole } from '../../state/account/account.selector';

@Component({
  selector: 'app-view-card',
  standalone: true,
  imports: [AsyncPipe, FormsModule, PbButtonComponent, AddTopicCardComponent],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})
export class ViewCardComponent {
  isNewEventTopicInprogress$: Observable<boolean>;
  tempOptions: string[] = [""];

  selectedEventSummary$: Observable<Summary|null>;
  summary: Summary | null = null;

  accountRole$: Observable<AccountRole>;

  constructor(private store: Store<AppState>, private wallet: WalletService){
    this.isNewEventTopicInprogress$ = store.select(selectIsNewEventTopicInProgress);
    this.selectedEventSummary$ = store.select(selectSelectedEventSummary);
    this.accountRole$ = this.store.select(selectAccountRole);
  }

  ngOnInit(){
    this.selectedEventSummary$.subscribe(data => {this.summary = data;
      console.log(">>>>>>>>>>>"+data);
    });
  }

  createAndSubmitNewTopic(formObject: any){
    let formData = formObject.form.value;
    let topic = formData.topic;
    let options: any = [];
    console.log(formData);
    //validate all fields
    if(topic.length>0){
      console.log(topic.length);
      for(let i=0;i<Object.keys(formData).length-1;++i){
        options.push(formData["option-"+i]);
      }
    }
    console.log("options given", options);
    this.wallet.startVotingEvent(topic, options);
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