import { delay, http, HttpResponse } from 'msw';
import { Todo } from '../components/todo.types';

const items: Todo[] = [
  {
    id: Date.now(),
    text: ' First todo',
  },
];

export const handlers = [
  http.get('/todos', () => {
    return HttpResponse.json(items);
  }),
  http.post('/todos', async ({ request }) => {
    await delay(3000);
    const newTodo = (await request.json()) as Todo;

    // sometimes it will fail, this will cause a regression on the UI
    if (Math.random() > 0.0) {
      return HttpResponse.json(
        { message: 'Could not add item!' },
        {
          status: 500,
        },
      );
    }

    items.push(newTodo);

    return HttpResponse.json(newTodo);
  }),
];
