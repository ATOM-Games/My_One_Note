import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Note } from "../Models/Note";
import { DataHandlerService } from "./data-handler.service";


@Injectable({
    providedIn : 'root'
})
export class noteService {
    constructor (private http: HttpClient, private dataHandler : DataHandlerService) {  }

    fillNotePage(id_page : string) : Observable<Note[]> {
        return this.http.get<Note[]>('/api/note/all', {params : { page : id_page }}).pipe(
            tap(
                (notes) => {
                    this.dataHandler.NoteSub.next(notes);
                    this.dataHandler.selected_page = id_page;
                }
            )
        )
    }

    addNewNote(text : string) {
        this.http.post('/api/note/add', { text : text, page : this.dataHandler.selected_page }).subscribe( () => {
            this.fillNotePage(this.dataHandler.selected_page).subscribe(()=>{});
        } )
    }

    editOldNote(id_node : string, text : string) {
        this.http.post('/api/note/upd', { text : text, id : id_node }).subscribe( () => {
            this.fillNotePage(this.dataHandler.selected_page).subscribe(()=>{})
        } )
    }

    deleteNote(id_node : string) {
        this.http.post('/api/note/del', { id : id_node }).subscribe( () => {
            this.fillNotePage(this.dataHandler.selected_page).subscribe(()=>{})
        } )
    }
}