import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskManagerService } from './services/task-manager.service';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  /* Pending task list */
  taskList = [];
  /* in progress task list */
  inProgesstaskList = [];
  /* Completed task list */
  completedTaskList = [];
  /* Cancel the pending list subscription */
  private subscription: Subscription;

  constructor( private taskManageService: TaskManagerService, public dialog: MatDialog) {}

  ngOnInit() {
    /* Get pending list */
    this.subscription = this.taskManageService.getTaskList()
    .pipe(
       map(tasks => tasks.sort((a1: Task, a2: Task) => Number(a2.date) - Number(a1.date))),
       map(tasks => tasks.sort((a1: Task, a2: Task) => a2.time - a1.time ))
      )
    .subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /* Drop events */
  drop(event: CdkDragDrop<string[]>) {
       if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  /* Open dialog for add and update */
  addAndUpdateTask(placeId?: string) {
    this.dialog.open( AddTaskComponent, {
      disableClose: true,
      data: {
        productId: placeId? placeId: null,
        isUpdated: placeId? true: false
      }
    });
  }

  /* remove pending task by id */
  removeTask(taskId: string) {
    this.taskManageService.deleteTask(taskId).subscribe(() => {
    });
  }

  /* remove inprogess task by id */
  removeInprogessTask(taskId: string) {
    const inTask =  this.inProgesstaskList.filter(task => task.id !== taskId);
    this.inProgesstaskList = inTask;
  }


}
