import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Actions, Store } from '@ngxs/store';
import { AddTodo } from './store/todo/todo.actions';
import { TodoState } from './store/todo/todo.state';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  newTitle = 'ngxs-todo';
  items$ = inject(Store).selectSignal(TodoState.items);
  actions$ = inject(Actions);

  constructor(private store: Store) {}

  async add() {
    this.store.dispatch(new AddTodo(this.newTitle));
    this.newTitle = '';
  }

  changeDescription(title: string, order: number) {}

  public log(obj) {
    console.log(obj);
    return obj;
  }
}
