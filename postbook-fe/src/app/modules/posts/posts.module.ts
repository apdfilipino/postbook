import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostsListComponent } from './components/posts.list/posts.list.component';
import { PostsCreateComponent } from './components/posts.create/posts.create.component';
import { PostDetailsComponent } from './components/post.details/post.details.component';
import { PostsService } from '../services/posts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    PostsListComponent,
    PostsCreateComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    NgFor, 
    NgIf,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    PostsListComponent,
    PostsCreateComponent,
    PostDetailsComponent
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
