import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Todo } from './todo.types';
import { injectCreateTodo } from './todo.try';
import { injectMutation } from '@tanstack/angular-query-experimental';

@Injectable({ providedIn: 'root' })
export class TodoService {
  http = inject(HttpClient);

  createTodo = injectMutation((client) => ({
    mutationKey: ['addTodo'],
    mutationFn: (todo: Todo) => this.create({ id: 123, text: 'tesst' }),
  }));

  get(): Promise<Todo[]> {
    return lastValueFrom(this.http.get<Todo[]>('/todos'));
  }

  create(todo: Todo): Promise<Todo> {
    return lastValueFrom(this.http.post<Todo>('/todos', todo));
  }
}
