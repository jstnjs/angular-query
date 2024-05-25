import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoCreateComponent } from './components/todo-create.component';
import { TodoListComponent } from './components/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoCreateComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
