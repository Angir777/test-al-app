import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post/post.service';

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
      this.patchFormValue(0, 'Tytuł nowego artykułu', 'Jakiś opis');
    } else {
      // Pobranie postu po id (rzutowanie stringa na number)
      const post = this.postService.getPostById(Number(this.id));
      // Wstawienie danych do forma (rzutowanie stringa na stringa ?? )
      this.patchFormValue(Number(this.id), String(post?.title), String(post?.text));
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required]],
      text: [null, [Validators.required]]
    });
  }

  patchFormValue(id:number, title: string, text: string) {
    this.form.patchValue({
      id: id,
      title: title,
      text: text
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
        this.postService.addPost(this.createFromForm());
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
  createFromForm(): Post {
    const post: Post = {
      id: 0,
      title: this.form.get('title')?.value,
      text: this.form.get('text')?.value,
      isVisible: true
    }
    return post;
  }

}
