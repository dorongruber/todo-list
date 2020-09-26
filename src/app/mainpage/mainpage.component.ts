import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  datetoShow: boolean;
  addtask = false;
  constructor() { }

  ngOnInit() {
  }
  ChangeFormState() {
    this.addtask = ! this.addtask;
    document.getElementById('new-task').style.visibility = 'hidden';
  }

  CTState(btnstate: boolean) {
    if (btnstate) {
      document.getElementById('new-task').style.visibility = 'visible';
      this.datetoShow = !this.datetoShow;
    } else {
      document.getElementById('new-task').style.visibility = 'visible';
    }
  }

  Selected(datef: boolean) {
    this.datetoShow = datef;
  }

}
