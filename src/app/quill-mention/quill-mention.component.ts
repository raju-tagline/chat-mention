import { QuillEditorComponent } from 'ngx-quill';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as UserData from '../user.json';

@Component({
  selector: 'app-quill-mention',
  templateUrl: './quill-mention.component.html',
  styleUrls: ['./quill-mention.component.scss'],
})
export class QuillMentionComponent implements OnInit {
  @ViewChild(QuillEditorComponent, { static: true }) editor!: QuillEditorComponent;

  modules = {
    toolbar: false,
    mention: {
      mentionListClass: 'ql-mention-list mat-elevation-z8',
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      showDenotationChar: false,
      spaceAfterInsert: false,
      onSelect: (item: any, insertItem: any) => {
        console.log('item', item.value);
        const editor: any = this.editor?.quillEditor;
        insertItem(item);
        // necessary because quill-mention triggers changes as 'api' instead of 'user'
        editor.insertText(editor.getLength() - 1, '', 'user');
      },
      source: (searchTerm: any, renderList: any) => {
        console.log('searchTerm :>> ', searchTerm);
        // const values = [
        //   { id: 1, value: 'Fredrik Sundqvist', age: 5 },
        //   { id: 200012, value: 'Patrik Sjölin', age: 20 },
        // ];

        const values:any = Object.values(UserData)[Object.keys(UserData).length - 1]

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches: any = [];

          values.forEach((entry:any) => {
            if (
              entry.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            ) {
              matches.push(entry);
            }
          });
          renderList(matches, searchTerm);
        }
      },
    },
  };

  constructor() {
    console.log('UserData', Object.values(UserData)[Object.keys(UserData).length - 1]);
    console.log('this.editor :>> ', this.editor);
  }

  ngOnInit(): void {}
}
