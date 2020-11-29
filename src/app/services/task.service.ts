import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { HttpClient } from '@angular/common/http';

const URI = 'https://calender-todolist.herokuapp.com/api/task/';
@Injectable({providedIn: 'root'})
export class TaskService {
  currentuser: {userid: string};
  date: string;
  constructor(private http: HttpClient) {}
  SetSelectedDate(date: string) {
    console.log('set date : ', date);
    this.date = date;
    return true;
  }

  GetSelectedDate() {
    return this.date;
  }

  SetCurrentUser(uid: string) {
    this.currentuser = {
      userid: uid
    };
  }

  NewTask(nt: Task) {
    const dbtaskformat = {
      title: nt.title,
      content: nt.content,
      date: nt.date,
      color: nt.color,
      id: nt.id,
      userid: this.currentuser.userid
    };
    return this.http.post(`${URI}newtask`, dbtaskformat);
    // look how to se response state
  }

  GetCurrentDayTasks(date: string) {
    // console.log('GetCurrentDayTasks : ', date);

    const uid = this.currentuser.userid;
    return this.http.get(`${URI}todaystasks/${date}/${uid}`);
  }

  DeleteTask(id: number) {
    this.http.delete(`${URI}removetask/${id}`).subscribe();
  }
}
