import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Chapter } from "../Models/Chapter";
import { DataHandlerService } from "./data-handler.service";
import { pageService } from "./page.service";

@Injectable({
    providedIn : 'root'
})
export class chapterService {

    constructor (private http: HttpClient,
        private dataHandler : DataHandlerService,
        private s_page : pageService) {  }

    fillChapterByBook_id(id_book : string) : Observable<Chapter[]> {
        return this.http.get<Chapter[]>('/api/chapter/all', {params : { notebook : id_book }}).pipe(
            tap(
                (chapters) => {
                    this.dataHandler.ChapterSub.next(chapters);
                    this.dataHandler.selected_book = id_book;
                    if(chapters.length>0) {
                        this.dataHandler.selected_chapter = chapters[0]._id;
                        this.s_page.fillPagesOfChapt(this.dataHandler.selected_chapter).subscribe(()=>{});
                    } else {
                        this.dataHandler.selected_chapter = "";
                        this.dataHandler.ChapterSub.next([])
                        this.dataHandler.selected_page = "";
                        this.dataHandler.PagesSub.next([])
                        this.dataHandler.NoteSub.next([])
                    }
                }
            )
        )
    }
    addNewChapt(text : string) {
        this.http.post('/api/chapter/add', { title : text, notebook : this.dataHandler.selected_book }).subscribe( () => {
            this.fillChapterByBook_id(this.dataHandler.selected_book).subscribe(()=>{})
        } )
    }
    editOldChapt(id_chapt : string, text : string) {
        this.http.post('/api/chapter/upd', { title : text, id : id_chapt }).subscribe( () => {
            this.fillChapterByBook_id(this.dataHandler.selected_book).subscribe(()=>{})
        } )
    }
    deleteChapt(id_chapt : string) {
        this.http.post('/api/chapter/del', { id : id_chapt }).subscribe( () => {
            this.fillChapterByBook_id(this.dataHandler.selected_book).subscribe(()=>{})
        } )
    }
}