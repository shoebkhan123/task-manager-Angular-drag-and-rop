import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() addTask = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  /* inform to add form */
  onAddTask() {
    this.addTask.emit();
  }

}
