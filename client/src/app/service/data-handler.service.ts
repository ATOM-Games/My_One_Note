import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Chapter } from '../Models/Chapter';
import { Note } from '../Models/Note';
import { Notebook } from '../Models/Notebook';
import { Page } from '../Models/Page';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  NoteBookSub = new Subject<Notebook[]>();
  ChapterSub = new Subject<Chapter[]>();
  PagesSub = new Subject<Page[]>();
  NoteSub = new Subject<Note[]>();
  
  selected_book : string = "";
  selected_chapter : string = "";
  selected_page : string = "";

  constructor(private http: HttpClient){ }

  getAllNotebooks() {
    this.http.post('http://127.0.0.1:2525/api/notebook/all','').toPromise().then((data : any) => {
      const all_notebooks : Notebook[] = data.notebooks as Notebook[];
      this.NoteBookSub.next(all_notebooks);
      if(all_notebooks.length>0) {
        this.selected_book = all_notebooks[0]._id;
        this.fillChapterByBook_id(this.selected_book);
      }
    });
  }
  addNewBook(text : string) {
    this.http.post('http://127.0.0.1:2525/api/notebook/add', {'name' : text}).toPromise().then((data : any) => {
      const all_notebooks : Notebook[] = data.notebooks as Notebook[];
      this.NoteBookSub.next(all_notebooks);
      this.selected_book = all_notebooks[0]._id;
      this.fillChapterByBook_id(this.selected_book);
    });
  }
  editOldBook(id : number, text : string) {
    this.http.post('http://127.0.0.1:5003/edit_old_notebooks', {'text' : text, 'id' : id}).toPromise().then((data : any) => {
      const all_notebooks : Notebook[] = data.notebooks as Notebook[];
      this.NoteBookSub.next(all_notebooks);
      this.selected_book = all_notebooks[0]._id;
      this.fillChapterByBook_id(this.selected_book);
    });
  }
  deleteBook(id : number) {
    this.http.post('http://127.0.0.1:5003/delete_notebooks', {'id' : id}).toPromise().then((data : any) => {
      const all_notebooks : Notebook[] = data.notebooks as Notebook[];
      this.NoteBookSub.next(all_notebooks);
      this.selected_book = all_notebooks[0]._id;
      this.fillChapterByBook_id(this.selected_book);
    });
  }
  //---chapters
  fillChapterByBook_id(id_book : string) {
    this.http.post('http://127.0.0.1:5003/get_chapters_by_book', {'id_book' : id_book}).toPromise().then((data : any) => {
      const chapters_by_book_id : Chapter[] = data.chapters as Chapter[];
      this.ChapterSub.next(chapters_by_book_id);
      this.selected_book = id_book;
      if(chapters_by_book_id.length>0) this.fillPagesOfChapt(chapters_by_book_id[0]._id);
      else{
        this.PagesSub.next([]);
        this.NoteSub.next([]);
        this.selected_page = "";
        this.selected_chapter = "";
      }
    });
  }
  addNewChapt(text : string) {
    this.http.post('http://127.0.0.1:5003/add_new_chapter', {'text' : text, 'id_book' : this.selected_book}).toPromise().then((data : any) => {
      const chapters_by_book_id : Chapter[] = data.chapters as Chapter[];
      this.ChapterSub.next(chapters_by_book_id);
      if(chapters_by_book_id.length>0) this.fillPagesOfChapt(chapters_by_book_id[0]._id);
      else{
        this.PagesSub.next([]);
        this.NoteSub.next([]);
        this.selected_page = "";
        this.selected_chapter = "";
      }
    });
  }
  editOldChapt(id_chapt : number, text : string) {
    this.http.post('http://127.0.0.1:5003/edit_old_chapter', {'id' : id_chapt, 'text' : text, 'id_book' : this.selected_book}).toPromise().then((data : any) => {
      const chapters_by_book_id : Chapter[] = data.chapters as Chapter[];
      this.ChapterSub.next(chapters_by_book_id);
      if(chapters_by_book_id.length>0) this.fillPagesOfChapt(chapters_by_book_id[0]._id);
      else{
        this.PagesSub.next([]);
        this.NoteSub.next([]);
        this.selected_page = "";
        this.selected_chapter = "";
      }
    });
  }
  deleteChapt(id_chapt : number) {
    this.http.post('http://127.0.0.1:5003/delete_chapter', {'id' : id_chapt, 'id_book' : this.selected_book}).toPromise().then((data : any) => {
      const chapters_by_book_id : Chapter[] = data.chapters as Chapter[];
      this.ChapterSub.next(chapters_by_book_id);
      if(chapters_by_book_id.length>0) this.fillPagesOfChapt(chapters_by_book_id[0]._id);
      else{
        this.PagesSub.next([]);
        this.NoteSub.next([]);
        this.selected_page = "";
        this.selected_chapter = "";
      }
    });
  }
  //---pages
  fillPagesOfChapt(id_chapter : string) {
    this.http.post('http://127.0.0.1:5003/get_pages_by_chapt', {'id_chapter' : id_chapter}).toPromise().then((data : any) => {
      const pages_by_chapt_id : Page[] = data.pages as Page[];
      this.PagesSub.next(pages_by_chapt_id);
      this.selected_chapter = id_chapter+"";
      if(pages_by_chapt_id.length > 0) this.fillNotePage(pages_by_chapt_id[0]._id);
      else {
        this.NoteSub.next([]);
        this.selected_page = "";
      }
    });
  }
  addNewPage(text : string) {
    this.http.post('http://127.0.0.1:5003/add_new_pages', {'text' : text, 'id_chatp' : this.selected_chapter}).toPromise().then((data : any) => {
      const pages_by_chapt_id : Page[] = data.pages as Page[];
      this.PagesSub.next(pages_by_chapt_id);
      if(pages_by_chapt_id.length > 0) this.fillNotePage(pages_by_chapt_id[0]._id);
      else {
        this.NoteSub.next([]);
        this.selected_page = "";
      }
    });
  }
  editOldPage(id_page : number, text : string) {
    this.http.post('http://127.0.0.1:5003/edit_old_pages', {'text' : text, 'id' : id_page, 'id_chapt' : this.selected_chapter}).toPromise().then((data : any) => {
      const pages_by_chapt_id : Page[] = data.pages as Page[];
      this.PagesSub.next(pages_by_chapt_id);
    });
  }
  deletePage(id_page : number) {
    this.http.post('http://127.0.0.1:5003/delete_pages', {'id' : id_page, 'id_chapt' : this.selected_chapter}).toPromise().then((data : any) => {
      const pages_by_chapt_id : Page[] = data.pages as Page[];
      this.PagesSub.next(pages_by_chapt_id);
    });
  }
  //---notes
  fillNotePage(id_page : string) {
    this.http.post('http://127.0.0.1:5003/get_notes_by_page', {'id_page' : id_page}).toPromise().then((data : any) => {
      const notes_by_page_id : Note[] = data.notes as Note[];
      this.NoteSub.next(notes_by_page_id);
      this.selected_page = id_page;
    });
  }
  addNewNote(text : string) {
    this.http.post('http://127.0.0.1:5003/add_new_note', {'text' : text, 'id_page' : this.selected_page}).toPromise().then((data : any) => {
      const notes_by_page_id : Note[] = data.notes as Note[];
      this.NoteSub.next(notes_by_page_id);
    });
  }
  editOldNote(id_node : number, text : string) {
    this.http.post('http://127.0.0.1:5003/edit_old_note', {'text' : text, 'id' : id_node, 'id_page' : this.selected_page}).toPromise().then((data : any) => {
      const notes_by_page_id : Note[] = data.notes as Note[];
      this.NoteSub.next(notes_by_page_id);
    });
  }
  deleteNote(id_node : number) {
    this.http.post('http://127.0.0.1:5003/delete_note', {'id' : id_node, 'id_page' : this.selected_page}).toPromise().then((data : any) => {
      const notes_by_page_id : Note[] = data.notes as Note[];
      this.NoteSub.next(notes_by_page_id);
    });
  }
}