import { Component, HostListener, OnInit } from '@angular/core';
import { Note } from 'src/app/Models/Note';
import { Page } from 'src/app/Models/Page';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { pageService } from 'src/app/service/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  pages_ch : Page[] = [];
  new_page : boolean = false;
  editId = "";
  editPage : string = "";
  context : boolean = false;


  constructor(private dataHandler:DataHandlerService,
    private s_page : pageService) { }

  ngOnInit() : void {
    this.dataHandler.PagesSub.subscribe(pages => this.pages_ch = pages);
  }
  Page_click(id_p : string) : void {
    this.dataHandler.fillNotePage(id_p);
  }
  NewPage_click() : void {
    this.new_page = true;
    setTimeout( ()=>{ document.getElementById('new_page')?.focus() }, 10 );
  }
  Pageclick(e : any) : void {
    if(e.target.id == "new_page") {
      this.new_page = true;
    } else {
      this.editPage = e.target.value;
    }
  }
  NewPage_focusOff(e : any) : void {
    if(e.target.id == "new_page") {
      if(e.target.value.length > 0) {
        //this.dataHandler.addNewPage(e.target.value); // <- создание новой страницы
        this.s_page.addNewPage(e.target.value);
        e.target.value = "";
      }
    } else {
      if(e.target.value != this.editPage) {
        //this.dataHandler.editOldPage(this.editId, e.target.value);
        this.s_page.editOldPage(this.editId, e.target.value);
      }
      this.editId="";
    }
    this.new_page = false;
  }
  isChapter() : boolean {
    return ( this.dataHandler.selected_chapter!="" );
  }
  editPageText() : void {
    this.context = false;
    setTimeout( ()=>{ 
      document.getElementsByName('page_'+this.editId)[0].focus();
     }, 10 );
  }
  deletePage() : void {
    this.context = false;
    const d = this.editId;
    this.editId = "";
    if(confirm('Вы уверены, что хотите удалить cтраницу?')) {
      //this.dataHandler.deletePage(d);
      this.s_page.deletePage(d);
    }
  }
  @HostListener('document:click', ['$event'])
	onClick(event : any) {
		if (!document.getElementById('contextp')?.contains(event.target)) {
			if(this.context){
        this.context_off();
        this.editId = "";
      }
		}
	}
  context_off() : void {
    this.context = false;
  }
  con_men(e : any, id : string) : void {
    e.preventDefault();
    this.context = true;
    this.editId = id;
    document.getElementById('contextp')?.setAttribute('style', 'top:'+e.clientY+'px; left:'+e.clientX+'px');
  }
}
