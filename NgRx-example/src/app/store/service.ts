import { Injectable } from "@angular/core";
import { Todo } from "./todo.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})
export class TodoService{
    constructor(private http:HttpClient){}
    getData(id:string){
        return this.http.get<Todo>('https://jsonplaceholder.typicode.com/todos/'+id)
    }
}