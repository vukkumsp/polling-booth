import { Component } from '@angular/core';
import { ListingCardComponent } from "../../elements/listing-card/listing-card.component";
import { AddTopicCardComponent } from "../../elements/add-topic-card/add-topic-card.component";
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs';
import { AccountRole } from '../../state/account/account.state';
import { selectAccountRole } from '../../state/account/account.selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Summary } from '../../ethereum/contractProxyClasses/Summary';
import { selectEventSummaries } from '../../state/contract/contract.selector';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [ListingCardComponent, AddTopicCardComponent, AsyncPipe, JsonPipe],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {
  accountRole$: Observable<AccountRole>;
  eventSummaries$: Observable<Summary[]>;
  constructor(private store: Store<AppState>){
    this.accountRole$ = this.store.select(selectAccountRole);
    this.eventSummaries$ = this.store.select(selectEventSummaries);
  }

  ngOnInit(){
    this.eventSummaries$.subscribe(
      val => console.log(val)
    )
  }

  topics: any[] = [
    { id: 0, title: "Topic 1", desc: "About topic 1" },
    { id: 1, title: "Topic 2", desc: "About topic 2" },
    { id: 2, title: "Topic 3", desc: "About topic 3" },
    { id: 0, title: "Topic 1", desc: "About topic 1" },
    { id: 1, title: "Topic 2", desc: "About topic 2" },
    { id: 2, title: "Topic 3", desc: "About topic 3" },
    { id: 0, title: "Topic 1", desc: "About topic 1" },
    { id: 1, title: "Topic 2", desc: "About topic 2" },
    { id: 2, title: "Topic 3", desc: "About topic 3" },
    { id: 0, title: "Topic 1", desc: "About topic 1" },
    { id: 1, title: "Topic 2", desc: "About topic 2" },
    { id: 2, title: "Topic 3", desc: "About topic 3" },
    { id: 0, title: "Topic 1", desc: "About topic 1" },
    { id: 1, title: "Topic 2", desc: "About topic 2" },
    { id: 2, title: "Topic 3", desc: "About topic 3" },
  ];
}
