import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Todo } from './todo.types';

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
  addTodo(todo: Todo) {
    console.log(todo);
  }
}
