export class Page{
    _id : string;
    title : string;
    id_chapter : number;
    date : string;



    constructor(id : string, title : string, id_chapter : number, date : string){
        this._id = id;
        this.title = title;
        this.id_chapter = id_chapter;
        this.date = date;
    }
}