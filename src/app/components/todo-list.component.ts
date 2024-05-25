import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { TodoService } from './todo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'todo-list',
  template: ` <h2>List of todos</h2>
    <ul>
      @for (todo of todos.data(); track $index) {
      <li>{{ todo.text }}</li>
      }
    </ul>`,
})
export class TodoListComponent {
  todoService = inject(TodoService);

  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.get(),
  }));
}
