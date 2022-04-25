import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { EventManagerService } from 'src/app/shared/services/event-manager/event-manager.service';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})
export class ShowPostComponent implements OnInit {
  id!: string;

  paczka: string = '';

  //post!: any;

  single!: any;
  public posts2 = [] as any;
  error: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private eventManager: EventManagerService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //this.post = this.postService.getPostById(Number(this.id));
    

    // Tak wyświetlić pojedyńczy post
    // this.postService.getPostById2(Number(this.id)).subscribe(response => this.single = response.body);
    this.postService
    .getPostById2(Number(this.id))
    .pipe(
        //.pipe Wykona się zawsze, czy to sukces czy error
    )
    .subscribe({
      next: (response) => {
        this.single = response.body;
        console.log('Sukces');
      },
      error: (error) => {
        console.log('Error');
        this.error = 'Error';
      },
      complete: () => {},
    });

    
  }

  odbierzPaczke(message: string) {
    this.paczka = message;
  }

}
