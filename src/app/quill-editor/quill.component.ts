import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import * as UserData from '../user.json';
import 'quill-mention';
import Quill from 'quill';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
})
export class QuillComponent implements OnInit {
  @ViewChild(QuillEditorComponent, { static: true })
  editor!: QuillEditorComponent;

  public text: any;
  public text1: any;
  public text2: any;
  public format = 'html';
  public quillForm!: FormGroup;
  public textStyle: any;

  modules = {
    toolbar: false,
    // toolbar: {
    //   container: [
    //     ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    //     ['code-block'],
    //     [{ header: 1 }, { header: 2 }], // custom button values
    //     [{ list: 'ordered' }, { list: 'bullet' }],
    //     ['clean'], // remove formatting button
    //     ['link'],
    //     ['source'],
    //   ],
    //   handlers: {
    //     source: () => {
    //       this.formatChange();
    //     },
    //   },
    // },
    mention: {
      mentionListClass: 'ql-mention-list mat-elevation-z8',
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      showDenotationChar: false,
      spaceAfterInsert: false,
      onSelect: (item: any, insertItem: any) => {
        const editor = this.editor.quillEditor;
        insertItem(item);
        // necessary because quill-mention triggers changes as 'api' instead of 'user'
        editor.insertText(editor.getLength() - 1, '', 'user');
      },
      source: (searchTerm: any, renderList: any) => {
        Object.values(UserData)[Object.keys(UserData).length - 1];
        const values: any =
          Object.values(UserData)[Object.keys(UserData).length - 1];
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

  // formatChange() {
  //   this.format = this.format === 'html' ? 'text' : 'html';
  //   if (this.format === 'text') {
  //     // HTML
  //     const htmlText = this.quillForm.value.editor;
  //     this.editor.quillEditor.setText(htmlText);
  //   } else if (this.format === 'html') {
  //     // TEXT
  //     const htmlText = this.quillForm.value.editor;
  //     this.editor.quillEditor.setText('');
  //     this.editor.quillEditor.pasteHTML(0, htmlText);
  //   }
  // }

  getText() {
    const commentText = document.querySelectorAll('span.mention');
    let id: any = [];
    let value: any = [];
    commentText.forEach((btn) => id.push(btn.getAttribute('data-id')));
    commentText.forEach((btn) => value.push(btn.getAttribute('data-value')));
    id.map((element: any, indexIds: any) => {
      const { ops }: any = this.editor.quillEditor.getContents();
      ops.map((ele: any) => {
        value.map((resp: any, indexVal: any) => {
          if (ele?.insert?.mention?.id === element && indexIds === indexVal) {
            this.text1 = this.editor.quillEditor.root.innerHTML.replace(
              new RegExp(value[0], 'gm'),
              `${id[0]}`
            );
            this.text1 = this.text1.replace(
              new RegExp(value[1], 'gm'),
              `${id[1]}`
            );
            this.text2 = this.editor.quillEditor.root.innerHTML.replace(
              new RegExp(value[1], 'gm'),
              `${id[1]}`
            );
            this.text = this.editor.quillEditor.root.innerHTML.replace(
              new RegExp(value[indexVal], 'gm'),
              `${id[indexIds]}`
            );
            // this.text = newIndex;
          }
        });
      });
      // let input = document.querySelectorAll('span.mention')[index];
      // input.setAttribute('data-value', element);
      // input.setAttribute('value', element);
    });
    // this.text = this.editor.quillEditor.root.innerHTML.replace(/p>/g, 'div>');
  }
}
