import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, EffectNotification, ofType, OnIdentifyEffects, OnRunEffects } from '@ngrx/effects';
import { TodoService } from './service';
import { stateActions, TodoActions } from './actions';
import { catchError, filter, map, Observable, of, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({providedIn:'root'})
export class TodoEffects implements OnIdentifyEffects,OnRunEffects,OnDestroy{
  private _identifier:string;
  init=(identifier:string)=>this._identifier=identifier
  constructor(
    private readonly _actions$: Actions,
    private readonly _service: TodoService,
    private readonly _store:Store
  ) {}

  

  $getData = createEffect(() => {
    return this._actions$.pipe(
      ofType(TodoActions.loadTodo),
      filter(({identifier})=>this._identifier==identifier),
      switchMap(({id}) =>
        this._service.getData(id).pipe(
          map((todo) => TodoActions.loadTodoSuccess({ todo,identifier:this._identifier })),
          catchError((error) => of(TodoActions.loadTodoFail({ error,identifier:this._identifier })))
        )
      )
    )
  });
  ngOnDestroy(): void {
    this._store.dispatch(stateActions.destroy({identifier:this._identifier}))
  }
  ngrxOnIdentifyEffects(): string {
    return this._identifier
  }
  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return resolvedEffects$.pipe(takeUntil(this._actions$.pipe(ofType(stateActions.destroy))))
  }

}
