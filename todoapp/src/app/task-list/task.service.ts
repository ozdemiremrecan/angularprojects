import { Injectable } from "@angular/core";
import { Task } from "./task.model";

@Injectable({providedIn:"root"})
export class TaskService{
    tasks:Task[]=[];

    constructor(){
        const taskss=localStorage.getItem("tasks");
        if(taskss){
            this.tasks=JSON.parse(taskss)
        }
    }

    onAddTask(task:string){
        if(task.trim().length>0){
            this.tasks.push(new Task(this.tasks.length,task,false,Date(),""));
        }
        this.saveTasks()
    }
    onRemoveTask(id:number){
        this.tasks=this.tasks.filter(task=>task.id !== id);
        this.saveTasks()
    }
    onGetTasks(){
        return this.tasks;
    }
    onCompleteTask(id:number){
        const task=this.tasks.find((task)=>task.id===id);
        task!.isCompleted=true;
        task!.whenCompleted=Date();
        this.saveTasks();
    }
    private saveTasks(){
        localStorage.setItem("tasks",JSON.stringify(this.tasks));
    }
}