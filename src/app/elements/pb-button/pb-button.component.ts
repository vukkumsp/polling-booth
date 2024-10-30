import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pb-button',
  standalone: true,
  imports: [],
  templateUrl: './pb-button.component.html',
  styleUrl: './pb-button.component.css'
})
export class PbButtonComponent {
  @Input() disabled: boolean = false;
  @Input() value: string = "";
}
