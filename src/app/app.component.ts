import { Component } from '@angular/core';
import * as UserData from './user.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'select-name-demo';
  public userData: any =
    Object.values(UserData)[Object.keys(UserData).length - 1];
  public isMention: boolean = false;
  public userName!: string;
  public selectedUser: any;

  constructor() {}

  /**
   * onKeyUp($event)
   */
  public onKeyUp(event: any) {
    if (event.code === 'Digit2' || event.code === 'ShiftLeft') {
      this.isMention = true;
    } else {
      this.isMention = false;
    }
  }

  /**
   * onClick()
   */
  public onClick(event: any) {
    if (event.target.value) {
      const user: any = this.userData.filter(
        (res: any) => res.id === Number(event.target.value)
      );
      this.selectedUser = user[0];
      // this.userName = `<b>${user[0].name}</b>`;
      this.userName = user[0].name;
      this.isMention = false;
    } else {
      this.isMention = true;
    }
  }
}
