import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  output,
} from '@angular/core';
import { Todo } from './todo.types';
import { NgClass } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
  selector: 'todo-list-item',
  template: `
    <li
      class="flex items-center justify-between gap-x-6 py-5"
      [ngClass]="{
        'opacity-50': state() === 'pending',
        'border-t-2 border-b-2 border-red-600 bg-red-100': state() === 'error'
      }"
    >
      <div class="min-w-0">
        <div class="flex items-start gap-x-3">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            {{ todo().text }}
          </p>
          @if (state() == 'pending') {
            <p
              class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-gray-700 bg-gray-50 ring-gray-600/20"
            >
              loading
            </p>
          }
          @if (state() == 'error') {
            <p
              class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20"
            >
              error
            </p>
          }
          <!-- <p
            class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20"
          >
            Complete
          </p> -->
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
        @if (state() === 'error') {
          <button
            (click)="retry.emit()"
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
  `,
})
export class TodoListItemComponent {
  todo = input.required<Todo>();
  state = input.required<'pending' | 'error' | 'success'>();

  retry = output();
}
