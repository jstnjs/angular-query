import {
  injectQueryClient,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { TodoService } from './todo.service';
import { inject } from '@angular/core';
import { Todo } from './todo.types';

export const injectCreateTodo = () => {
  const todoService = inject(TodoService);
  return injectMutation((client) => ({
    mutationKey: ['addTodo'],
    mutationFn: (todo: Todo) => todoService.create({ id: 123, text: 'tesst' }),
    onSuccess: () => {
      return client.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  }));
};
