import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TodoStateModel } from './todo-state.model';
import { AddTodo } from './todo.actions';

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    items: [],
  },
})
@Injectable()
export class TodoState {

  @Selector()
  static async items(state: TodoStateModel) {
    if (state instanceof Promise) {
      state = await state
    }
    return state?.items;
  }

  @Action(AddTodo)
  async addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    const state = await ctx.getState();
    const length = state?.items?.length ?? 0;
    const newItem = {
      order: length + 1,
      title: action?.title,
      description: '',
      isActive: true,
    };
    if (!state) {
      ctx.setState({
        items: [newItem]
      })
      return;
    }

    console.log("Add TODO", state)

    ctx.setState({
      ...state,
      items: [...state?.items, newItem],
    });
  }
  removeTodo() {}
  updateTodo() {}
  changeStatus() {}
}
