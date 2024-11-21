import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskLogComponent } from './task-log/task-log.component';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskLogComponent,
    NewTaskModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}