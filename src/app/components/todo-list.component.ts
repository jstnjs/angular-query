import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  injectMutationState,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { TodoService } from './todo.service';
import { Todo } from './todo.types';
import { JsonPipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe],
  selector: 'todo-list',
  template: ` <h2>List of todos</h2>
    <ul>
      @for (todo of todos.data(); track $index) {
        <li>{{ todo.text }}</li>
      }

      @for (todo of addTodoMutationState(); track $index) {
        {{ todo.text }}
      }

      <div class="bg-red-200">Test</div>

      <!-- @if (addTodoMutationState()) {
        {{ addTodoMutationState() | json }}
      } -->
    </ul>`,
})
export class TodoListComponent {
  todoService = inject(TodoService);

  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.get(),
  }));

  addTodoMutationState = injectMutationState(() => ({
    filters: { mutationKey: ['addTodo'], status: 'pending' },
    select: (mutation) => mutation.state.variables as Todo,
  }));
}
