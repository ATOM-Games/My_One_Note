import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotebookComponent } from './Views/notebook/notebook.component';
import { NoteComponent } from './Views/note/note.component';
import { PageComponent } from './Views/page/page.component';
import { ChapterComponent } from './Views/chapter/chapter.component';
import { userComponent } from './Views/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './service/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotebookComponent,
    NoteComponent,
    PageComponent,
    ChapterComponent,
    userComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      multi : true,
      useClass : TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
