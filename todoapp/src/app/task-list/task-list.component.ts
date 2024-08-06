import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { FormsModule } from "@angular/forms";
import { Task } from './task.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  taskName!:string;
  constructor(private taskService:TaskService){}

  getTasks():Task[]{
    return this.taskService.onGetTasks();
  }
  addTasks(){
    this.taskService.onAddTask(this.taskName);
    this.taskName="";
  }
  removeTask(id:number){
    this.taskService.onRemoveTask(id);
  }
  isCompleteTask(id:number){
    this.taskService.onCompleteTask(id);
  }
}
