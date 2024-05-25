import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  model,
  signal,
} from '@angular/core';
import { Todo } from './todo.types';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { TodoService } from './todo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'todo-create',
  template: ` Create a new todo <br />

    <button
      (click)="
        addTodo({ id: 1, title: 'Lorem ipsum', body: 'A nice description' })
      "
    >
      Add todo
    </button>`,
})
export class TodoCreateComponent {
  todoService = inject(TodoService);
  addTodoMutation = injectMutation((client) => ({
    mutationFn: (todo: Todo) => this.todoService.create(todo),
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  addTodo(todo: Todo) {
    this.addTodoMutation.mutate(todo);
  }
}
