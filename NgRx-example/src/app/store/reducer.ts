import { createFeature, createReducer, on } from "@ngrx/store";
import { Todo } from "./todo.model";
import { TodoActions } from "./actions";

export interface TodoState{
    todo:Todo
}
const initialState:TodoState={
    todo:{
        userId:0,
        id:0,
        title:"",
        completed:false,
    }
}
export const TodoFeature=createFeature({
    name:'Todo',
    reducer:createReducer(initialState,
        on(TodoActions.loadTodo,(state,{id})=>({...state,id})),
        on(TodoActions.loadTodoSuccess,(state, {todo})=>({...state,todo})),
        on(TodoActions.loadTodoFail,(state,{error})=>({...state,error})))
    }
)

//Bir aksiyon olduğunda bu veriler ne yapılacak. Onlar burada yapılıyor.