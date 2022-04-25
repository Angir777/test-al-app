import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { GuestGuardService } from '../shared/services/auth/guest-guard.service';
import { PostsComponent } from './posts/posts.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'new',
    component: UpdatePostComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: ':id',
    component: ShowPostComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: ':id/edit',
    component: UpdatePostComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
