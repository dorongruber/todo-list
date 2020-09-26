import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-taskslist',
  templateUrl: './taskslist.component.html',
  styleUrls: ['./taskslist.component.css']
})
export class TaskslistComponent implements OnInit , OnChanges {
  @Input()listdate: string;
  isempty = false;
  taskList: Task[] = [];
  constructor(private taskservice: TaskService) { }

  ngOnInit() {
    this.SetList();
  }

  ngOnChanges() {
    this.Redo();
  }
  SetList() {
    const date = this.taskservice.GetSelectedDate();
    this.taskservice.GetCurrentDayTasks(date)
    .subscribe(res => {
      const len = Object.values(res).length;
      for (let i = 0; i < len; i++ ) {
        this.taskList.push({
          title: res[i].title,
          content: res[i].content,
          date: res[i].date,
          color: res[i].color,
          id: res[i].id
        });
      }
      this.IsEmpty(this.taskList);
    });
  }
  Redo() {
    this.taskList = [];
    this.SetList();
  }
  DeleteTask(id: number) {
    this.taskservice.DeleteTask(id);
    this.taskList = this.taskList.filter(task => (task.id) !== id);
    this.IsEmpty(this.taskList);
  }

  IsEmpty(list: Task[]) {
    if ( list.length === 0) {
      this.isempty = true;
    } else {
      this.isempty = false;
    }
  }
}
