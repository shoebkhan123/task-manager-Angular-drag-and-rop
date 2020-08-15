import { Injectable } from '@angular/core';
import { BehaviorSubject,  } from 'rxjs';
import { delay, map, take, tap }  from 'rxjs/operators';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private tasks = new BehaviorSubject<Task[]>([
    new Task('12', 'Get up early', 'Good to health', 'High', new Date(new Date().toString()), 223232323),
    new Task('12233ee24', 'Go for walk', 'its vdery deficult', 'Normal', new Date(new Date().toString()), 3232),
    new Task('122334', 'Take a bath', 'its really good habit', 'Low', new Date(new Date().toString()), 34343434)
  ]);

  constructor() { }

  getTaskList() {
    return this.tasks.asObservable();
  }

  /* get task by id */
  getTask(taskId: string) {
    return this.tasks.pipe(
      take(1),
      map(tasks => {
        return { ...tasks.find(task => task.id == taskId ) };
      })
    )
  }

    /* Add task */
  addTask(title: string, description: string, priority: string, date: Date, time: number) {
    const newTask =  new Task(Math.random().toString(), title, description, priority, date, time);
    return this.tasks.pipe(take(1)).subscribe(tasks => {
      this.tasks.next(tasks.concat(newTask));
    });
  }

  /* Delete pending task by id */
  deleteTask(taskId: string) {
    return this.tasks.pipe(
      take(1),
      delay(800),
      tap(tasks => {
        this.tasks.next(tasks.filter(task => task.id !== taskId));
      })
    );
  }

  /* update pending task by id */
  updateTaskaddTask(taskId: string, title: string, description: string, priority: string, date: Date, time: number) {
   return this.tasks.pipe(take(1), delay(1000), tap(tasks => {
     const updateTaskIndex = tasks.findIndex(task => task.id === taskId);
     const updatedTask = [...tasks];
     const oldTask = updatedTask[updateTaskIndex];
     updatedTask[updateTaskIndex] = new Task(oldTask.id, title, description, priority, date, time);
     this.tasks.next(updatedTask);
   }))
  }

}
