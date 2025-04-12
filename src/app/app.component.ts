import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, firstValueFrom } from 'rxjs';
import { TodoStateModel } from './store/todo/todo-state.model';
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
  items$;

  constructor(private store: Store) {}

  async ngOnInit() {
    this.items$ = await this.store.selectSignal(TodoState.items)();
    console.log(this.items$)
  }

  async add() {
    this.store.dispatch(new AddTodo(this.newTitle));
    this.newTitle = '';
    // console.log(this.items$);
  }

  changeDescription(title: string, order: number) {}

  public  log(obj) {
    console.log(obj)
    return obj
  }
}
