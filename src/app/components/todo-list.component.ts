import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  injectMutation,
  injectMutationState,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { TodoService } from './todo.service';
import { Todo } from './todo.types';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { injectCreateTodo } from './todo.try';
import { TodoListItemComponent } from './todo-list-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe, NgClass, TodoListItemComponent],
  selector: 'todo-list',
  template: `
    <ul role="list" class="divide-y divide-gray-100">
      @for (todo of todos.data(); track $index) {
        <todo-list-item [todo]="todo" state="success" />
      }

      @if (createTodoMutation.isPending()) {
        <todo-list-item
          [todo]="createTodoMutation.variables()"
          state="pending"
        />
      }

      @if (createTodoMutation.isError()) {
        <todo-list-item
          [todo]="createTodoMutation.variables()"
          state="error"
          (retry)="
            this.createTodoMutation.mutate(createTodoMutation.variables())
          "
        />
      }
    </ul>
  `,
})
export class TodoListComponent {
  todoService = inject(TodoService);
  queryClient = injectQueryClient();

  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.get(),
  }));

  createTodoMutation = this.todoService.createMutation;
}
