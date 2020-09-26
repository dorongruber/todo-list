import { Component, OnInit, OnChanges , Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit , OnChanges {
  @Input() formState: boolean;
  @Output() addBtnstate = new EventEmitter<boolean>();
  displayForm = 'none';
  color = '';
  isinvalid = false;
  constructor(private taskservice: TaskService) { }

  ngOnInit() {
    this.displayForm = 'none';
  }
  ngOnChanges() {
    this.displayForm = 'block';
  }

  NewTask(task: NgForm) {
    if (this.color === '') {
      this.color = 'WHITE';
    }
    const nid = this.taskservice.GetSelectedDate();
    const newtask = {
      title: task.value.title,
      content: task.value.content,
      date: nid,
      color: this.color,
      id: Date.now()
    };
    if ( this.taskservice.NewTask(newtask)) {
      this.color = '';
      // console.log('new task : ', newtask);
    }
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

      this.addBtnstate.emit(true);
    } else {
      // cancele option selected
      this.addBtnstate.emit(false);
      // console.log('cancele selected');
    }
    this.displayForm = 'none';
    task.resetForm();
  }

  checkEvent(event) {
    // through event we find selected color in drop down, defualt color white
    this.color = event.srcElement.innerHTML;
    console.log('color checkevent ; ', this.color);

  }
}
