import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillComponent } from './quill-editor/quill.component';
import { QuillModule } from 'ngx-quill';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, QuillComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
