import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post/post.service';
import { IPost } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts2 = [] as any;
  public selectedPost = <IPost>{};
  public modalTitle = '';
  public btnTitle = '';
  public postTitle = new FormControl('', Validators.required);
  public postBody = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;

  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => this.posts = res);

    this.getList();
  }

  deletePost(post: Post){
    this.postService.deletePost(post);
  }

  getList(){
    this.postService.list()
      .subscribe(response => this.posts2 = response);
  }

  deletePost2(post:IPost){
    this.postService.delete(post)
      .subscribe(response => this.getList());
  }

  openModal(template: TemplateRef<any>, post?:IPost) {
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

  save(){
    if(!this.postTitle.value || !this.postBody.value){
      this.showError = true;
      return;
    }

    this.selectedPost.title = this.postTitle.value;
    this.selectedPost.body = this.postBody.value;

    if(this.btnTitle == 'Update'){
      this.postService.update(this.selectedPost)
      .subscribe(response => {
        this.getList();
        this.reset();
        this.showError = false;
      });
    }else{
      this.postService.add(this.selectedPost)
      .subscribe(response => {
        this.getList();
        this.reset();
        this.showError = false;
      });
    }
  }

  reset(){
    this.postTitle.reset();
    this.postBody.reset();
  }

}
