import { defineStore } from 'pinia';
import { todoApi } from 'src/service/todo';

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as ITodo[],

    isFetching: false as boolean,
    isError: false as boolean,
  }),

  getters: {
    getTodosTotal(): number {
      return this.todos.length;
    },
  },

  actions: {
    async getTodos() {
      this.setLoading();

      const [error, response] = await todoApi.fetchTodos();

      if (error || response.error) {
        this.setError();
      }

      this.setLoaded(() => {
        this.todos = response;
      });
    },

    addTodo(body: Pick<ITodo, 'title' | 'completed'>) {
      const newTodo = {
        ...body,
        id: String(Math.random()),
      };

      this.todos = [newTodo, ...this.todos];
    },

    editTodo(id: string, body: Pick<ITodo, 'title' | 'completed'>) {
      this.todos = this.todos.map((item) => {
        if (item.id === id) {
          item = {
            id: item.id,
            ...body,
          };
        }

        return item;
      });
    },

    deleteTodo(todoId: string) {
      this.todos = this.todos.filter(({ id }) => id !== todoId);
    },

    setLoading(func?: () => void) {
      this.isError = false;
      this.isFetching = true;

      func?.();
    },

    setLoaded(func?: () => void) {
      this.isFetching = false;
      this.isError = false;

      func?.();
    },

    setError(func?: () => void) {
      this.isFetching = false;
      this.isError = true;

      func?.();
    },
  },
});
