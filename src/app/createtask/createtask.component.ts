import { Component, OnInit, OnChanges , Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit , OnChanges {
  @Input() formState: boolean;
  @Output() addBtnstate = new EventEmitter<boolean>();
  displayForm: string;
  color = '';
  isinvalid = false;
  constructor(private taskservice: TaskService) { }

  ngOnInit() {
    this.displayForm = 'none';
  }
  ngOnChanges() {
    console.log('ngOnChanges ');
    document.getElementById('task-form').style.visibility = 'block';
  }

  NewTask(task: NgForm) {
    if (this.color === '') {
      this.color = 'WHITE';
    }
    const nid = this.taskservice.GetSelectedDate();
    console.log('new task -> ', nid);
    const newtask = {
      title: task.value.title,
      content: task.value.content,
      date: nid,
      color: this.color,
      id: Date.now()
    };
    this.taskservice.NewTask(newtask).subscribe((res: {message: string, flag: boolean}) => {
      if (res.flag) {
        this.addBtnstate.emit(true);
      }
    });
  }
  //
  ChooseEvent(event: any, task: NgForm) {
    // event -> mouse event
    if (event.srcElement.innerHTML === 'done_outline') {
      if ( task.invalid) {
        this.isinvalid = true;
        return;
      }
      this.NewTask(task);

    } else {
      // cancele option selected
      this.addBtnstate.emit(false);
      // console.log('cancele selected');
    }
    document.getElementById('task-form').style.display = 'none';
    task.resetForm();
  }

  checkEvent(event) {
    // through event we find selected color in drop down, defualt color white
    this.color = event.srcElement.innerHTML;
    console.log('color checkevent ; ', this.color);

  }
}
