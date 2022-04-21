export class Post {
    id: number;
    title: string | null = null;
    text: string | null = null;
    isVisible: boolean = true;

    constructor(id: number, title: string, text: string){
        this.id = id;
        this.title = title;
        this.text = text;
    }
}