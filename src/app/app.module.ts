import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { Material } from './material/material.module';


// import { DragDropModule } from '@angular/cdk/drag-drop';
// import {MatListModule} from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon'
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatInputModule} from '@angular/material/input';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import {MatSelectModule} from '@angular/material/select';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { MatButtonModule } from '@angular/material/button';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Material,

    // DragDropModule,
    // MatListModule,
    // MatIconModule,
    // MatToolbarModule,
    // MatDialogModule,
    // MatDialogModule,
    // MatInputModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatSelectModule,
    // MatButtonModule,
    // MatProgressSpinnerModule

  ],
  providers: [],
  entryComponents: [AddTaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
