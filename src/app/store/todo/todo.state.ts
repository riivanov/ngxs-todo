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
  static items(state: Promise<TodoStateModel>) {
    return state.then(model => model.items)
  }

  @Action(AddTodo)
  async addTodo(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    const state = await ctx.getState();
    if (!state) {
      ctx.setState({
        items: []
      })
      return;
    }
    const length = state?.items?.length ?? 0;

    console.log("Add TODO", state)
    const newItem = {
      order: length + 1,
      title: action?.title,
      description: '',
      isActive: true,
    };

    ctx.setState({
      ...state,
      items: [...state?.items, newItem],
    });
  }
  removeTodo() {}
  updateTodo() {}
  changeStatus() {}
}
