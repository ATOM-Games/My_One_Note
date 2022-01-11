export class Chapter{
    _id : string;
    notebooks : string;
    title : string;

    constructor(id : string, title : string, id_book : string){
        this._id = id;
        this.title = title;
        this.notebooks = id_book;
    }
}