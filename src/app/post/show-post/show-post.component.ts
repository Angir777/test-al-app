import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {
  
  // Variables
  id!: string;
  post!: any;
  error: string = '';
  paczka: string = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Pobranie id z url
    this.id = this.route.snapshot.params['id'];
    // Wyświetlanie pojedyńczego postu po id
    this.postService
    .getPostById(Number(this.id))
    .subscribe({
      next: (response) => {
        this.post = response.body;
      },
      error: (error) => {
        this.error = 'Error';
      }
    });
  }

  odbierzPaczke(message: string) {
    this.paczka = message;
  }

}
