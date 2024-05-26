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
import { FormsModule } from '@angular/forms';
import { injectCreateTodo } from './todo.try';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
  selector: 'todo-create',
  template: `
    <div>
      <label
        for="todo"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Add todo</label
      >
      <div class="mt-2">
        <input
          type="text"
          [(ngModel)]="todoText"
          name="todo"
          id="todo"
          class="block w-full rounded-md border-0 py-1.5 px-2.5 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="What should I do?"
        />
      </div>
    </div>

    <button
      (click)="addTodo()"
      type="button"
      class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Create
    </button>
  `,
})
export class TodoCreateComponent {
  todoService = inject(TodoService);
  todoText = signal('');

  createTodoMutation = this.todoService.createMutation;

  addTodo() {
    const newTodo = {
      id: Date.now(),
      text: this.todoText(),
    };
    this.createTodoMutation.mutate(newTodo);
    this.todoText.set('');
  }
}
