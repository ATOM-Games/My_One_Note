import { Component, HostListener, OnInit } from '@angular/core';
import { Chapter } from 'src/app/Models/Chapter';
import { chapterService } from 'src/app/service/chapter.service';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { pageService } from 'src/app/service/page.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  chapters : Chapter[] = [];
  
  new_chapt : boolean = false;
  editId = "";
  editChapt : string = "";
  context : boolean = false;
  constructor(private dataHandler:DataHandlerService,
    private s_chapter : chapterService,
    private s_page : pageService) { }

  ngOnInit() : void {
    this.dataHandler.ChapterSub.subscribe(chapters => this.chapters = chapters);
  }
  
  
  chapter_click(id : string) : void {
    //this.dataHandler.fillPagesOfChapt(id);
    this.s_page.fillPagesOfChapt(id).subscribe(() => {});
  }

  equalsChapter(id : string) : boolean {
    return (this.dataHandler.selected_chapter === id);
  }
  NewChapter_click() : void {
    this.new_chapt = true;
    setTimeout( ()=>{ document.getElementById('new_chapt')?.focus() }, 10 );
  }

  NewChapt_focusOff(e : any) : void {
    if(e.target.id == "new_chapt") {
      if(e.target.value.length > 0) {
        //this.dataHandler.addNewChapt(e.target.value); // <- создание новой страницы
        this.s_chapter.addNewChapt(e.target.value);
        e.target.value = "";
      }
    } else {
      if(e.target.value != this.editChapt) {
        //this.dataHandler.editOldChapt(this.editId, e.target.value);
        this.s_chapter.editOldChapt(this.editId, e.target.value);
      }
      this.editId="";
    }
    this.new_chapt = false;
  }
  chaptClick(e : any) : void {
    if(e.target.id == "new_chapt") {
      this.new_chapt = true;
    } else {
      this.editChapt = e.target.value;
    }
  }
  isBook() : boolean{
    return ( this.dataHandler.selected_book!="" );
  }
  editChaptText() : void {
    this.context = false;
    setTimeout( ()=>{ 
      document.getElementsByName('chapt_'+this.editId)[0].focus();
     }, 10 );
  }
  deleteChapt() : void {
    this.context = false;
    const d = this.editId;
    this.editId = "";
    if(confirm('Вы уверены, что хотите удалить главу?')) {
      //this.dataHandler.deleteChapt(d);
      this.s_chapter.deleteChapt(d);
    }
  }
  context_off() : void {
    this.context = false;
  }
  con_men(e : any, id : string) : void {
    e.preventDefault();
    this.context = true;
    this.editId = id;
    document.getElementById('contextcs')?.setAttribute('style', 'top:'+e.clientY+'px; left:'+e.clientX+'px');
  }
  @HostListener('document:click', ['$event'])
	onClick(event : any) {
		if (!document.getElementById('contextcs')?.contains(event.target)) {
			if(this.context){
        this.context_off();
        this.editId = "";
      }
		}
	}

}
