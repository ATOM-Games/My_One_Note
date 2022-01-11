export class Notebook{
    _id: string;
    title: string;
    user : string;

    constructor(id:string, title:string, id_u:string){
        this._id = id;
        this.title = title;
        this.user = id_u;
    }

}