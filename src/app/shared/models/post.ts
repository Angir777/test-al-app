export class Post {
    id: number | null = null;
    title: string | null = null;
    body: string | null = null;

    constructor(id: number, title: string, body: string){
        this.id = id;
        this.title = title;
        this.body = body;
    }
}