import { Component, HostListener, OnInit } from '@angular/core';
import { Notebook } from 'src/app/Models/Notebook';
import { chapterService } from 'src/app/service/chapter.service';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { notebookService } from 'src/app/service/notebook.service';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {

  new_book : boolean = false;
  editId = "";
  editBook : string = "";
  context : boolean = false;
  notebooks : Notebook[] = [];

  constructor(private dataHandler:DataHandlerService,
    private s_notebook : notebookService,
    private s_chapter : chapterService) {
  }

  ngOnInit() : void {
    this.dataHandler.NoteBookSub.subscribe(notebook => this.notebooks = notebook);
    //this.dataHandler.getAllNotebooks();
    this.s_notebook.getAllNotebooks().subscribe(() => {})
  }
  notebook_click(id : string) : void {
    //this.dataHandler.fillChapterByBook_id(id);
    this.s_chapter.fillChapterByBook_id(id).subscribe(()=>{});
  }

  equalsBook(id : string) : boolean {
    return (this.dataHandler.selected_book===id);
  }
  editBookText() : void {
    this.context = false;
    setTimeout( ()=>{ 
      document.getElementsByName('book_'+this.editId)[0].focus();
     }, 10 );
  }
  deleteBook() : void {
    this.context = false;
    const d = this.editId;
    this.editId = "";
    if(confirm('Вы уверены, что хотите удалить книгу?')) {
      //this.dataHandler.deleteBook(d);
      this.s_notebook.deleteBook(d)
    }
  }
  context_off() : void {
    this.context = false;
  }
  @HostListener('document:click', ['$event'])
	onClick(event : any) {
		if (!document.getElementById('contextb')?.contains(event.target)) {
			if(this.context){
        this.context_off();
        this.editId = "";
      }
		}
	}
  con_men(e : any, id : string) : void {
    e.preventDefault();
    this.context = true;
    this.editId = id;
    document.getElementById('contextb')?.setAttribute('style', 'top:'+e.clientY+'px; left:'+e.clientX+'px');
  }
  NewBook_focusOff(e : any) : void {
    if(e.target.id == "new_book") {
      if(e.target.value.length > 0) {
        //this.dataHandler.addNewBook(e.target.value); // <- создание новой страницы
        this.s_notebook.addNewBook(e.target.value)
        e.target.value = "";
      }
    } else {
      if(e.target.value != this.editBook) {
        //this.dataHandler.editOldBook(this.editId, e.target.value);
        this.s_notebook.editOldBook(this.editId, e.target.value)
      }
      this.editId="";
    }
    this.new_book = false;
  }
  NewBook_click() : void {
    this.new_book = true;
    setTimeout( ()=>{ document.getElementById('new_book')?.focus() }, 10 );
  }
  bookClick(e : any) : void {
    if(e.target.id == "new_book") {
      this.new_book = true;
    } else {
      this.editBook = e.target.value;
    }
  }
}
