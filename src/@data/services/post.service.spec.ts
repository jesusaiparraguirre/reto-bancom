import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { environment } from "environments/environment.dev";
import { Post } from "../models/post.interface";
import { PostService } from "./post.service";

const listPost: Post[] = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
];

const idUser: number = 1;

const post: Post = {
    userId: idUser,
    id: 1,
    title: "Test",
    body: "Test"
};
  
  const postServiceMock = {
    getBooks: () => of(listPost),
  };

  describe('PostService', () => {

    let service: PostService;
    let httpMock : HttpTestingController;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                PostService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach( ()=> {
        service = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterAll( () => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getPosts return a list of post', () => {
        service.getPosts(idUser).subscribe((resp: Post[]) => {
            expect(resp).toEqual(listPost);
        });
        const req = httpMock.expectOne(environment.api_url + '/' + idUser + '/posts');
        expect(req.request.method).toBe('GET');
        req.flush(listPost);
    });

    it('doPosts post', () => {
        let listPost = service.getPosts(idUser);
        expect(listPost.pipe.length).toBe(0);
        service.doPosts(post);
        listPost = service.getPosts(idUser);
        service.doPosts(post);
        // expect(spy1).toHaveBeenCalled();
    });

});