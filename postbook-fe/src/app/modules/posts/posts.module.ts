import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './components/posts.list/posts.list.component';
import { PostsCreateComponent } from './components/posts.create/posts.create.component';



@NgModule({
  declarations: [
    PostsListComponent,
    PostsCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostsModule { }
