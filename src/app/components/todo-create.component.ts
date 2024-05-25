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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
  selector: 'todo-create',
  template: ` Create a new todo <br />

    <input type="text" [(ngModel)]="todoText" />
    <button (click)="addTodo()">Add todo</button>`,
})
export class TodoCreateComponent {
  todoService = inject(TodoService);
  todoText = signal('');
  addTodoMutation = injectMutation((client) => ({
    mutationFn: (todo: Todo) => this.todoService.create(todo),
    onSuccess: () => {
      this.todoText.set('');
      return client.invalidateQueries({ queryKey: ['todos'] });
    },
  }));

  addTodo() {
    const newTodo = {
      id: Date.now(),
      text: this.todoText(),
    };
    this.addTodoMutation.mutate(newTodo);
  }
}
