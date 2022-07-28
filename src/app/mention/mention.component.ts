import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as UserData from '../user.json';
@Component({
  selector: 'app-mention',
  templateUrl: './mention.component.html',
  styleUrls: ['./mention.component.scss'],
})
export class MentionComponent implements OnInit {
  public items: any = Object.values(UserData)[Object.keys(UserData).length - 1];
  public mentionUserForm!: FormGroup;
  public selectedUserData: any;

  constructor() {
    this.mentionUserForm = new FormGroup({
      user: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  public submit() {
    if (this.mentionUserForm.value?.user?.length > 1) {
      this.items.forEach((res: any) => {
        const str: string = this.mentionUserForm.value.user.replace(/@/g, '');
        if (res.name === str) {
          this.selectedUserData = res;
        }
      });
    } else {
      this.selectedUserData = {};
    }
  }
}
