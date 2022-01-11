import { Component, HostListener, OnInit } from '@angular/core';
import { Note } from 'src/app/Models/Note';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { noteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  notes : Note[] = [];
  //create new
  createNewNote : boolean = false;
  editId = "";
  editNote : string = "";
  NewNote : string = "";
  //content
  context : boolean = false;
  
  constructor(private dataHandler:DataHandlerService, private s_note : noteService) { }

  ngOnInit() : void {
    this.dataHandler.NoteSub.subscribe(note => this.notes = note);
  }

  creatNewNote() : void {
    this.createNewNote=true;
    setTimeout( () => { document.getElementById('new_area')?.focus() }, 10 );
  }

  noteResize(e:any) : void {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  onSearchChange(e:any) : void {
    if(this.createNewNote) {
      this.NewNote = e.target.value;
    }
    this.noteResize(e);
  }
  Note_click(e:any) : void {
    if(e.target.id=="new_area") {
      this.createNewNote = true;
    }else{
      this.editNote = e.target.value;
    }
  }
  focus_off(e:any) : void {
    if(e.target.id == "new_area") {
      if(this.NewNote.length> 0) {
        //this.dataHandler.addNewNote(e.target.value); // <- создание новой ноды
        this.s_note.addNewNote(e.target.value);
        this.NewNote = "";
        e.target.value = "";
        this.noteResize(e);
      }
    } else {
      if(e.target.value != this.editNote) {
        //this.dataHandler.editOldNote(this.editId, e.target.value);
        this.s_note.editOldNote(this.editId, e.target.value);
      }
      this.editId="";
    }
    this.createNewNote = false;
  }
  //crud
  con_men(e : any, id : string) : void {
    e.preventDefault();
    this.context = true;
    this.editId = id;
    document.getElementById('contextm')?.setAttribute('style', 'top:'+e.clientY+'px; left:'+e.clientX+'px');
  }

  @HostListener('document:click', ['$event'])
	onClick(event : any) {
		if (!document.getElementById('contextm')?.contains(event.target)) {
			if(this.context){
        this.context_off();
        this.editId = "";
      }
		}
	}
  context_off() : void {
    this.context = false;
  }
  editNoteText() : void {
    this.context = false;
    setTimeout( ()=>{ 
      document.getElementsByName('area_'+this.editId)[0].style.height = "100px";
      document.getElementsByName('area_'+this.editId)[0].focus();
     }, 10 );
  }
  isPage() : boolean {
    return ( this.dataHandler.selected_page!="" );
  }
  deleteNote() : void {
    this.context = false;
    const d = this.editId;
    this.editId = "";
    if(confirm('Вы уверены, что хотите удалить запись?')) {
      //this.dataHandler.deleteNote(d);
      this.s_note.deleteNote(d);
    }
  }
}