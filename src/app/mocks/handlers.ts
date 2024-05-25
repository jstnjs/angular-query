import { http, HttpResponse } from 'msw';
import { Todo } from '../components/todo.types';

const items: Todo[] = [
  {
    id: 1,
    title: 'First title',
    body: ' First body',
  },
];

export const handlers = [
  http.get('/todos', () => {
    return HttpResponse.json(items);
  }),
  http.post('/todos', async ({ request }) => {
    const newTodo = (await request.json()) as Todo;

    // sometimes it will fail, this will cause a regression on the UI
    if (Math.random() > 0.7) {
      return HttpResponse.json(
        { message: 'Could not add item!' },
        {
          status: 500,
        }
      );
    }

    items.push(newTodo);

    return HttpResponse.json(newTodo);
  }),
];
