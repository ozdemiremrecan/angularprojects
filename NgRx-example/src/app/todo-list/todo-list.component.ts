import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../store/todo.model';
import { Store } from '@ngrx/store';
import { todoSelectors } from '../store/selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TodoActions } from '../store/actions';
import { TodoEffects } from '../store/effects';
import { EffectSources } from '@ngrx/effects';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  data$: Observable<Todo>;
  private readonly _identifier = Guid.create().toString();
  constructor(
    private readonly _store: Store,
    private readonly _effects: TodoEffects,
    private readonly _effectSources: EffectSources
  ) {}

  ngOnInit() {
    this._effects.init(this._identifier);
    this._effectSources.addEffects(this._effects);
    this._store.dispatch(TodoActions.loadTodo({ id: '2',identifier:this._identifier}));
    this.data$ = this._store.select(todoSelectors.selectData);
  }
}
