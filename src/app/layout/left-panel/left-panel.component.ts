import { Component } from '@angular/core';
import { ListingCardComponent } from "../../elements/listing-card/listing-card.component";
import { AddTopicCardComponent } from "../../elements/add-topic-card/add-topic-card.component";

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [ListingCardComponent, AddTopicCardComponent],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {
  user: string = "OWNER";
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
