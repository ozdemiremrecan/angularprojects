import { createActionGroup, props } from "@ngrx/store";
import { Todo } from "./todo.model";

export const stateActions=createActionGroup({
    source:'Todo',
    events:{
        'Destroy':props<{identifier:string}>()
    }
})

export const TodoActions=createActionGroup({
    source:"Todo",
    events:{
        "Load Todo":props<{id:string,identifier:string}>(),
        "Load Todo Success":props<{todo:Todo,identifier:string}>(),
        "Load Todo Fail":props<{error:Error,identifier:string}>(),
    }
})