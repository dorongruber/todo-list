import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  currentdate: {cd: number, cm: number, cy: number};
  currentUser: {username: string, phone: string, email: string};
  userId$: Observable<string>;
  uId: string;
  datetoShow: boolean;
  addtask = false;
  constructor(
    private userservice: UserService,
    private taskservice: TaskService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.userId$ = this.route.paramMap.pipe(
      switchMap(params => {
        return params.getAll('id');
      })
    );
    this.userId$.subscribe(res => {
      this.uId = res;
      this.taskservice.SetCurrentUser(res);
    });
    // console.log('this.uId -> ', this.uId);

    await this.GetUserFromDb().then(res => {
      this.currentUser = {
        username: res.username,
        phone: res.phone,
        email: res.email
      };

    });

    await this.GetCurrentDate()
    .then(res => {
      this.currentdate = {
        cd: res.cd,
        cm: res.cm,
        cy: res.cy
      };
    });
  }

  ChangeFormState() {
    this.addtask = ! this.addtask;
    console.log('this.addtask -> ', this.addtask);
    document.getElementById('new-task-btn').style.display = 'none';
  }

  CTState(btnstate: boolean) {

    if (btnstate) {
      this.addtask =  !this.addtask;
      // document.getElementById('new-task-btn').style.display = 'block';
      this.datetoShow =  !this.datetoShow;
    } else {
      this.addtask =  !this.addtask;
      // document.getElementById('new-task-btn').style.display = 'block';
    }
  }

  Selected(datef: boolean) {
    this.datetoShow = !this.datetoShow;
  }

  async GetUserFromDb() {
    let tempuser: {username: string, phone: string, email: string};
    return (await this.userservice.GetUser(this.uId)).toPromise().then(res => {
      const temp = Object.values(res);
      tempuser = {
        username: temp[0],
        phone: temp[1],
        email: temp[2]
      };
      return tempuser;
    });
  }

  async GetCurrentDate() {
    const date = new Date();
    const tempdate = {
      cd: date.getDate(),
      cm: date.getMonth(),
      cy: date.getFullYear()
    };
    return tempdate;
  }

}
