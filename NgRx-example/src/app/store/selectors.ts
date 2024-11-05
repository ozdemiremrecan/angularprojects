import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "./reducer";

const selectFeatureState=createFeatureSelector<TodoState>('Todo')
const selectData=createSelector(selectFeatureState,(state)=>{
    return state.todo
})
export const todoSelectors={
    selectData
}