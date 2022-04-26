import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PostService } from 'src/app/shared/services/post/post.service';
import { IPost } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  // Variables
  public posts = [] as any;
  public selectedPost = <IPost>{};
  public modalTitle = '';
  public btnTitle = '';
  public postTitle = new FormControl('', Validators.required);
  public postBody = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;
  deletedPost = [] as any;

  constructor(
    private postService: PostService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.getList(); // By ładowało posty gdy przechodzi z zakładki update-post
  }

  ngOnInit(): void {
  }

  /**
   * Pobiera wszystkie posty
   */
  getList(){
    this.postService.list()
    .subscribe({
      next: (response) => {
        this.posts = response.body;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  /**
   * Usuwa wybrany post
   */
  deletePost(post:IPost){
    this.postService.delete(post)
    .subscribe({
      next: (response) => {
        this.addOrUpdateNextSteps();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  /**
   * Przesłanie informacji o konkretnym poście do innego komponentu
   */
  showSinglePost(post:IPost){
    this.router.navigate(['/posts/'+post.id]);
  }

  /**
   * Okno modalne od dodawania i edytowania
   */
  openModalAddOrUpdate(template: TemplateRef<any>, post?:IPost) {

    console.log(template);

    if(post){
      this.modalTitle = 'Edit post';
      this.selectedPost = post;
      this.btnTitle = 'Update';
      this.postTitle.setValue(post.title);
      this.postBody.setValue(post.body);
    }else{
      this.modalTitle = 'Add new post';
      this.btnTitle = 'Add';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Okno modalne od usuwania
   */
   openModalDelete(template: TemplateRef<any>, post:IPost) {
    this.deletedPost = post;
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Zapis
   */
  save(){
    if(!this.postTitle.value || !this.postBody.value){
      this.showError = true;
      return;
    }

    this.selectedPost.title = this.postTitle.value;
    this.selectedPost.body = this.postBody.value;

    if(this.btnTitle == 'Update'){
      this.postService.update(this.selectedPost)
      .subscribe({
        next: (response) => {
          this.addOrUpdateNextSteps();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }else{
      this.postService.add(this.selectedPost)
      .subscribe({
        next: (response) => {
          this.addOrUpdateNextSteps();
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  /**
   * Reset inputów
   */
  reset(){
    this.postTitle.reset();
    this.postBody.reset();
  }

  /**
   * AddOrUpdateNextSteps
   */
  addOrUpdateNextSteps(){
    this.getList();
    this.reset();
    this.showError = false;
    this.modalRef?.hide();
  }

}
