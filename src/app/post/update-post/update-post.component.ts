import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post/post.service';
import { IPost } from '../post';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  // id z routingu
  id!: string;
  isAddMode!: boolean;

  // Deklarujemy sonie zmienne pptrzebne do wyśwuetlenia tekstu w formularzu
  title: string = '';
  text: string = '';

  // Dając znak '!' dajemy znać ze zmienne moga być puste/nie przypisane
  post!: Post;
  form!: FormGroup;

  public selectedPost = <IPost>{};

  constructor(
    // W konstruktorze deklarujemy z czego będziemy korzystali
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Wywołujemy funkcje na start
    this.createForm();                    // Utworzy nam formularz
    //this.patchFormValue('Tytuł artykułu', 'Jakiś opis'); // Ustawi nam wartości na start - w update musza to być wartości do edycji (to do zrobienia)
  }

  ngOnInit(): void {
    // pobranie id z routingu
    this.id = this.route.snapshot.params['id'];
    // ustalenie czy jest to dodanie nowego postu czy edycja poprzez istnienie id lub nie
    this.isAddMode = !this.id;
    
    console.log('Nowy post: ' + this.isAddMode);

    if (this.isAddMode) {
      this.patchFormValue(0, 'Tytuł', 'Treść');
    } else {
      // Pobranie postu po id (rzutowanie stringa na number)
      //const post = this.postService.getPostById(Number(this.id));
      // Wstawienie danych do forma (rzutowanie stringa na stringa ?? )
      //this.patchFormValue(Number(this.id), String(post?.title), String(post?.text));
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required]],
      body: [null, [Validators.required]]
    });
  }

  patchFormValue(id:number, title: string, body: string) {
    this.form.patchValue({
      id: id,
      title: title,
      body: body
    });
  }

  // Ta funkcja zostanie uruchomiona po kliknięciu 'Dodaj post / Zapisz zmiany'
  formGroupSubmit() {
    if (!this.form.valid) {
      alert('Formularz nie został poprawnie wypełniony');
      return;
    } else {
      if (this.isAddMode) {
        // utworzenie nowego posta poprzez serwis
        
        console.log(this.createFromForm());

        this.postService.add(this.createFromForm())
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/posts']);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {},
        });


        // resetowanie formularza
        this.form.reset();
        // przekierowanie na postronę z postami
        this.router.navigateByUrl('/posts');
      } else {
        const id = this.form.get('id')?.value;
        const title = this.form.get('title')?.value;
        const text = this.form.get('text')?.value;
        // edycja istniejącego
        this.postService.editPost(id, title, text);
        // przekierowanie na postronę z postami
        this.router.navigateByUrl('/posts');
      }
    }
  }

  // Nowy obiek postu
  createFromForm(): IPost {
    const post: IPost = {
      id: 0,
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value
    }
    return post;
  }

}
