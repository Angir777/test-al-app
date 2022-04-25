import { NgModule } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { TestChildComponent } from './test-child/test-child.component';

import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
