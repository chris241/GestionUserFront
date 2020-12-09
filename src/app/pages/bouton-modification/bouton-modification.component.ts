import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'bouton-modification',
  templateUrl: './bouton-modification.component.html',
  styleUrls: ['./bouton-modification.component.scss']
})
export class BoutonModificationComponent implements OnInit {
  @Input() value: string;
  @Output() data: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }
  afficher() {
    this.data.next(this.value);
  }
}