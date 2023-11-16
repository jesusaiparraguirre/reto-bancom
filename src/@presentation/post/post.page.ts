import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/@data/models/user.interface';
import { UserService } from 'src/@data/services/user.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from 'src/@data/services/post.service';
import { Post, PostRequest } from 'src/@data/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})

export class PostPage implements OnInit{

  displayedColumns: string[] = ['Nombre', 'Username', 'Direccion', 'Correo', 'Phone Number', 'Post'];
  arrayUsers: Array<User> = []
  arrayPosts: Array<Post> = []
  title: string = ""
  body: string = ""
  panelOpenState = false

  constructor(
    private userService: UserService,
    private postService: PostService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      (data: Array<User>) => {
          this.arrayUsers = [...data]
      }
    )
  }

  openPost(id: number){
    this.getPosts(id)
    this.panelOpenState = true
  }

  closePost(){
    this.panelOpenState = false
  }

  getPosts(id: number){
    this.postService.getPosts(id).subscribe(
      (data: Array<Post>) => {
          this.arrayPosts = [...data]
      }
    )
  }

  doPost(id: number){
    let request: PostRequest = {
      title: this.title,
      body: this.body,
      userId: id
    }
    this.postService.doPosts(request).subscribe(
      (data: Post) => {
        console.log("POST CREATED",data)
      }
    )
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '640px',
      data: {id: id, title: this.title, body: this.body},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}

export interface DialogData {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'post-dialog.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private postService: PostService,
  ) {}

  onNoClick(): void {
    let request: PostRequest = {
      title: this.data.title,
      body: this.data.body,
      userId: this.data.id
    }
    this.postService.doPosts(request).subscribe(
      (data: Post) => {
        console.log("POST CREATED",data);
        this.dialogRef.close();
      }
    )
  }

}
