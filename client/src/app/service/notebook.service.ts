import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Notebook } from "../Models/Notebook";
import { chapterService } from "./chapter.service";
import { DataHandlerService } from "./data-handler.service";

@Injectable({
    providedIn : 'root'
})
export class notebookService {


    constructor (private http: HttpClient,
        private dataHandler : DataHandlerService,
        private s_chapter : chapterService) {  }

    getAllNotebooks() : Observable<Notebook[]> {
        return this.http.get<Notebook[]>('/api/notebook/all').pipe(
            tap(
                (notebooks) => {
                    this.dataHandler.NoteBookSub.next(notebooks)
                    if(notebooks.length>0) {
                        this.dataHandler.selected_book = notebooks[0]._id;
                        this.s_chapter.fillChapterByBook_id(this.dataHandler.selected_book).subscribe(()=>{});
                    } else {
                        this.dataHandler.selected_book = ""
                        this.dataHandler.NoteBookSub.next([])
                        this.dataHandler.selected_chapter = ""
                        this.dataHandler.ChapterSub.next([])
                        this.dataHandler.selected_page = ""
                        this.dataHandler.PagesSub.next([])
                        this.dataHandler.NoteSub.next([])
                    }
                }
            )
        )
    }

    addNewBook(text : string) {
        this.http.post('/api/notebook/add', { title : text }).subscribe( () => {
            this.getAllNotebooks().subscribe(()=>{})
        } )
    }
    editOldBook(id : string, title : string) {
    this.http.post('/api/notebook/upd', { title : title, _id : id }).subscribe( () => {
            this.getAllNotebooks().subscribe(()=>{})
        } )
    }
    deleteBook(id : string) {
        this.http.post('/api/notebook/del', { id : id }).subscribe( () => {
            this.getAllNotebooks().subscribe(()=>{})
        } )
    }
}