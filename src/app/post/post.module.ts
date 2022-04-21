import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostsComponent } from './posts/posts.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPostComponent } from './show-post/show-post.component';
import { TestChildComponent } from './test-child/test-child.component';


@NgModule({
  declarations: [
    PostsComponent,
    UpdatePostComponent,
    ShowPostComponent,
    TestChildComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
