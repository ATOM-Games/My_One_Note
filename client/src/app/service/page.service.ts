import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Page } from "../Models/Page";
import { DataHandlerService } from "./data-handler.service";
import { noteService } from "./note.service";

@Injectable({
    providedIn : 'root'
})
export class pageService {

    constructor (private http: HttpClient,
        private dataHandler : DataHandlerService,
        private s_note : noteService) {  }

    fillPagesOfChapt(id_chapter : string) : Observable<Page[]> {
        return this.http.get<Page[]>('/api/page/all', {params : { chapter : id_chapter }}).pipe(
            tap(
                (pages) => {
                    this.dataHandler.PagesSub.next(pages);
                    this.dataHandler.selected_chapter = id_chapter;
                    if(pages.length>0) {
                        this.dataHandler.selected_page = pages[0]._id;
                        this.s_note.fillNotePage(this.dataHandler.selected_page).subscribe(()=>{});
                    } else {
                        this.dataHandler.selected_page = "";
                        this.dataHandler.PagesSub.next([])
                        this.dataHandler.NoteSub.next([])
                    }
                }
            )
        )
    }

    addNewPage(text : string) {
        this.http.post('/api/page/add', { title : text, chapter : this.dataHandler.selected_chapter }).subscribe( () => {
            this.fillPagesOfChapt(this.dataHandler.selected_chapter).subscribe(()=>{});
        } )
    }

    editOldPage(id_page : string, text : string) {
        this.http.post('/api/page/upd', { title : text, id : id_page }).subscribe( () => {
            this.fillPagesOfChapt(this.dataHandler.selected_chapter).subscribe(()=>{})
        } )
    }
    deletePage(id_page : string) {
        this.http.post('/api/page/del', { id : id_page }).subscribe( () => {
            this.fillPagesOfChapt(this.dataHandler.selected_chapter).subscribe(()=>{})
        } )
    }
}