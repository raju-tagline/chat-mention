import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import User from '../user.json';
import 'quill-mention';
import Quill from 'quill';

interface User {
  email: string;
  id: number;
  name: string;
  user_name: string;
}

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
})
export class QuillComponent implements OnInit {
  @ViewChild(QuillEditorComponent, { static: true })
  editor!: QuillEditorComponent;

  public text!: String;
  public text1!: String;
  public userData: User[] = User;
  public quillForm!: FormGroup;

  modules = {
    toolbar: false,
    mention: {
      mentionListClass: 'ql-mention-list mat-elevation-z8',
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      showDenotationChar: false,
      spaceAfterInsert: false,
      onSelect: (item: any, insertItem: any) => {
        const editor = this.editor.quillEditor;
        insertItem(item);
        editor.insertText(editor.getLength() - 1, '', 'user');
      },
      source: (searchTerm: any, renderList: any) => {
        const values: any = this.userData;
        const userValues: any = values.map((res: any) => {
          if (res) {
            return {
              ...res,
              value: res.name,
            };
          }
        });

        if (searchTerm.length === 0) {
          renderList(userValues, searchTerm);
        } else {
          const matches: any = [];

          userValues.forEach((entry: any) => {
            const str: any = entry.name;
            if (str.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              matches.push(entry);
            }
          });
          renderList(matches, searchTerm);
        }
      },
    },
  };

  constructor() {}

  ngOnInit(): void {
    this.quillForm = new FormGroup({
      editor: new FormControl(''),
    });
    let icons = Quill.import('ui/icons');
    icons['source'] = '[source]';
  }

  getText() {
    const commentText = document.querySelectorAll('span.mention');
    let id: any = [];
    let value: any = [];
    commentText.forEach(
      (btn) =>
        id.push(btn.getAttribute('data-id')) &&
        value.push(btn.getAttribute('data-value'))
    );
    id.map((element: string, indexIds: number) => {
      const { ops }: any = this.editor.quillEditor.getContents();
      ops.map((ele: any) => {
        value.map((resp: string, indexVal: number) => {
          if (ele?.insert?.mention?.id === element && indexIds === indexVal) {
            this.editor.quillEditor.root.innerHTML =
              this.editor.quillEditor.root.innerHTML.replace(
                new RegExp(value[indexVal], 'gm'),
                `${id[indexIds]}`
              );
            //If don't need to change data-value name then uncomment the belove two lines
            // let input = document.querySelectorAll('span.mention')[indexIds];
            // input.setAttribute('data-value', resp);
            this.text = this.editor.quillEditor.root.innerHTML;
          }
        });
      });
      // input.setAttribute('value', element);
    });
    if (!id.length && !value.length) {
      this.text = this.editor.quillEditor.root.innerHTML;
    }
    // this.text = this.editor.quillEditor.root.innerHTML.replace(/p>/g, 'div>');
    this.quillForm.reset();
  }
}
