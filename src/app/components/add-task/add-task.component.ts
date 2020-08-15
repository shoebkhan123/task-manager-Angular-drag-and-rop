import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskManagerService } from '../../services/task-manager.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  /* Add task form */
  addTaskForm: FormGroup;

  /* Priorities list */
  priorities = ['High', 'Normal', 'Low'];

  isShowSpinner: boolean;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialogRef<AddTaskComponent>, private taskManagerService: TaskManagerService) {
    const currentYear = new Date().getFullYear();
  }
  ngOnInit(): void {
    this.prepareForm();
 }


 prepareForm() {
  this.addTaskForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    priority: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
  });


  /* Update form logic */
  if(this.data.productId) {
    /* Get task by id */
    this.taskManagerService.getTask(this.data.productId).subscribe(task => {
      /* Setting form value for update mode */
      this.addTaskForm.patchValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        date: task.date
      })
    });
  }
 }

  /* Submit add of dupdate form */
  onAddTask() {
    this.isShowSpinner = true;
    if(this.addTaskForm.invalid) {
      return;
    }

    if(!this.data.productId) {
      this.taskManagerService.addTask(
        this.addTaskForm.value.title,
        this.addTaskForm.value.description,
        this.addTaskForm.value.priority,
        this.addTaskForm.value.date,
        Date.now()
        );
        this.isShowSpinner = false;
        this.dialog.close();
    } else {
      this.taskManagerService.updateTaskaddTask(
        this.data.productId,
        this.addTaskForm.value.title,
        this.addTaskForm.value.description,
        this.addTaskForm.value.priority,
        this.addTaskForm.value.date,
        Date.now()
      ).subscribe(() => {
        this.isShowSpinner = false;
        this.dialog.close();
      })
    }
  }

}
