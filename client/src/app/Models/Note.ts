import { Data } from "@angular/router";

export class Note{
    _id : string;
    text : string[];
    date : Data;
    id_page : number;

    constructor(_id : string, title : string[], date : Data, id_p : number){
        this._id = _id;
        this.text = title;
        this.date = date;
        this.id_page = id_p;
    }
}