import { Injectable } from "@angular/core";
import { User } from "../models/user.interface";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root",
  })
export class UserService{
    constructor(private api: ApiService) { }

    getUsers(): Observable<Array<User>>{
        return this.api.get(`/users`);
    }
}