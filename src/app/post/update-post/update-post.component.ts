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
  body: string = '';

  // Dając znak '!' dajemy znać ze zmienne moga być puste/nie przypisane
  post!: Post;
  form!: FormGroup;
  single!: any;

  public selectedPost = <IPost>{};

  constructor(
    // W konstruktorze deklarujemy z czego będziemy korzystali
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Wywołujemy funkcje na start
    this.createForm(); // Utworzy nam formularz
  }

  ngOnInit(): void {
    // pobranie id z routingu
    this.id = this.route.snapshot.params['id'];
    // ustalenie czy jest to dodanie nowego postu czy edycja poprzez istnienie id lub nie
    this.isAddMode = !this.id;

    if (this.isAddMode) {
      this.patchFormValue(0, 'Tytuł', 'Treść');
    } else {
      // Pobranie postu po id (rzutowanie stringa na number)
      this.postService.getPostById2(Number(this.id))
      .subscribe({
        next: (response) => {
          // To co odbieramy
          this.single = response.body;
          // Wstawienie danych do forma (rzutowanie stringa na stringa ?? )
          this.patchFormValue(Number(this.id), String(this.single?.title), String(this.single?.body));
        },
        error: (error) => {
          console.log('Error');
        },
        complete: () => {},
      });
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
        // zaktualizowane informacje z formularza
        this.single.title = this.form.get('title')?.value;
        this.single.body = this.form.get('body')?.value;
        // edycja istniejącego
        this.postService.update(this.single)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/posts');
          },
          error: (error) => {
            console.log(error);
          },
        });
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
