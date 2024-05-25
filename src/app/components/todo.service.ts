import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Todo } from './todo.types';

@Injectable({ providedIn: 'root' })
export class TodoService {
  http = inject(HttpClient);

  get(): Promise<Todo[]> {
    return lastValueFrom(this.http.get<Todo[]>('/todos'));
  }

  create(todo: Todo): Promise<Todo> {
    return lastValueFrom(this.http.post<Todo>('/todos', todo));
  }
}
