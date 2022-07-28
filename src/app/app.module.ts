import { QuillConfigModule, QuillModule } from 'ngx-quill';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MentionComponent } from './mention/mention.component';
import { MentionModule } from 'angular-mentions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillMentionComponent } from './quill-mention/quill-mention.component';

@NgModule({
  declarations: [AppComponent, MentionComponent, QuillMentionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MentionModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    QuillConfigModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
