import { Injectable } from "@angular/core";
import { User } from "../models/user.interface";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Post, PostRequest } from "../models/post.interface";

@Injectable({
    providedIn: "root",
  })
export class PostService{
    constructor(private api: ApiService) { }

    getPosts(id: number): Observable<Array<Post>>{
        return this.api.get(`/users/${id}/posts`);
    }

    doPosts(postRequest : PostRequest): Observable<Post>{
        return this.api.post(`/posts`, postRequest)
    }
}