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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [JsonPipe, NgClass],
  selector: 'todo-list',
  template: `
    <ul role="list" class="divide-y divide-gray-100">
      @for (todo of todos.data(); track $index) {
        <li class="flex items-center justify-between gap-x-6 py-5">
          <div class="min-w-0">
            <div class="flex items-start gap-x-3">
              <p class="text-sm font-semibold leading-6 text-gray-900">
                {{ todo.text }}
              </p>
              <p
                class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20"
              >
                Complete
              </p>
            </div>
            <div
              class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
            >
              <p class="whitespace-nowrap">
                Due on <time datetime="2023-03-17T00:00Z">March 17, 2023</time>
              </p>
              <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <p class="truncate">Created by Leslie Alexander</p>
            </div>
          </div>
          <div class="flex flex-none items-center gap-x-4">
            <div class="relative flex-none">
              <button
                type="button"
                class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                id="options-menu-0-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open options</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </li>
      }
      @for (todo of addTodoMutationState(); track $index) {
        @if (todo.status === 'pending' || todo.status === 'error') {
          <li
            class="flex items-center justify-between gap-x-6 py-5"
            [ngClass]="{ 'opacity-25': todo.status === 'pending' }"
          >
            <div class="min-w-0">
              <div class="flex items-start gap-x-3">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  {{ todo.variables.text }}
                </p>
                @if (todo.status == 'pending') {
                  <p
                    class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-gray-700 bg-gray-50 ring-gray-600/20"
                  >
                    loading
                  </p>
                }
                @if (todo.status == 'error') {
                  <p
                    class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20"
                  >
                    error
                  </p>
                }
              </div>
              <div
                class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
              >
                <p class="whitespace-nowrap">
                  Due on
                  <time datetime="2023-03-17T00:00Z">March 17, 2023</time>
                </p>
                <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="truncate">Created by Leslie Alexander</p>
              </div>
            </div>
            <div class="flex flex-none items-center gap-x-4">
              @if (todo.status === 'error') {
                <button
                  (click)="reset()"
                  class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  Retry
                </button>
              }

              <div class="relative flex-none">
                <button
                  type="button"
                  class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                  id="options-menu-0-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open options</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        }
      }
    </ul>

    @if (addTodoMutationState()) {
      <!-- {{ addTodoMutationState() | json }} -->

      @for (todo of addTodoMutationState(); track $index) {
        @if (todo.status === 'pending') {
          pending
        }

        @if (todo.status === 'error') {
          errorr...
        }

        <!-- @if (todo.status === 'error') {
          error:
          <button (click)="this.addTodoMutation.mutate(todo.variables)">
            Retry
          </button>
        } -->
      }
    }
    <!-- <button>Retry</button> -->

    <!-- 
    <ul>
      @for (todo of addTodoMutationState(); track $index) {
        {{ todo.text }}
      }

      <div class="bg-red-200">Test</div>

      
    </ul> -->
  `,
})
export class TodoListComponent {
  todoService = inject(TodoService);
  queryClient = injectQueryClient();

  todos = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.get(),
  }));

  addTodoMutationState = injectMutationState(() => ({
    filters: { mutationKey: ['addTodo'] },
    select: (mutation) => {
      return {
        status: mutation.state.status,
        variables: mutation.state.variables as Todo,
      };
    },
  }));

  addTodoMutation = this.todoService.createTodo;

  reset() {
    console.log('komt hier');
    this.addTodoMutation.reset();
    // this.addTodoMutation.mutate({ id: 123, text: 'lol' });
  }
}
