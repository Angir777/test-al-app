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
  
  // Variables
  id!: string;
  isAddMode!: boolean;
  // Deklarujemy zmienne pptrzebne do wyśwuetlenia tekstu w formularzu
  title: string = '';
  body: string = '';
  // Dając znak '!' dajemy znać ze zmienne muszą być gdzieś dalej i mogą być puste/nie przypisane
  form!: FormGroup;
  single!: any;
  public selectedPost = <IPost>{};
  public showError = false;

  constructor(
    // W konstruktorze deklarujemy z czego będziemy korzystali
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Wywołujemy funkcje na start
    this.initForm(); // Utworzy nam formularz
  }

  ngOnInit(): void {
    // pobranie id z routingu
    this.id = this.route.snapshot.params['id'];
    // ustalenie czy jest to dodanie nowego postu czy edycja poprzez istnienie id lub nie
    this.isAddMode = !this.id;
    // Jeśli to jest edycja
    if (!this.isAddMode) {
      // Pobranie postu po id (rzutowanie stringa na number)
      this.postService.getPostById(Number(this.id))
      .subscribe({
        next: (response) => {
          // To co odbieramy
          this.single = response.body;
          // Wstawienie danych do forma
          this.patchFormValue(Number(this.id), String(this.single?.title), String(this.single?.body));
        },
        error: (error) => {
          console.log('Error');
        }
      });
    }
  }

  initForm() {
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
      this.showError = true;
      return;
    } else {
      if (this.isAddMode) {
        // utworzenie nowego postu poprzez serwis
        this.postService.add(this.createFrom())
        .subscribe({
          next: (response) => {
            this.addOrUpdateNextSteps();
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else {
        // edycja istniejącego postu poprzez serwis
        this.postService.update(this.createFrom())
        .subscribe({
          next: (response) => {
            this.addOrUpdateNextSteps();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }

  // Nowy obiek postu
  createFrom(): IPost {
    const post: IPost = {
      id: this.form.get('id')?.value,
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value
    }
    return post;
  }

  /**
   * AddOrUpdateNextSteps
   */
   addOrUpdateNextSteps(){
    this.showError = false;
    this.router.navigateByUrl('/posts');
  }

}
