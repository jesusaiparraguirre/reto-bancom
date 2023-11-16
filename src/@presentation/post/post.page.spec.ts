import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PostPage } from './post.page';
import { PostService } from 'src/@data/services/post.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from 'src/@data/models/user.interface';
import { Post } from 'src/@data/models/post.interface';
import { of } from 'rxjs';
import { UserService } from 'src/@data/services/user.service';

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

const listUser: User[] = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
                "lat": "-43.9509",
                "lng": "-34.4618"
            }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
        }
    },
];

const postServiceMock = {
  getBooks: () => of(listPost),
};

const userServiceMock = {
  getBooks: () => of(listUser),
};

describe('PostComponent', () => {
  let component: PostPage;
  let fixture: ComponentFixture<PostPage>;
  let postService: PostService;
  let userService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ 
        PostPage 
      ],
      providers: [
        {
          provide: PostService,
          useValue: postServiceMock
        },
        {
          provide: UserService,
          useValue: userServiceMock
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(PostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
});
// getUsers
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getUsers returns users', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const spy = spyOn(userService, 'getUsers').and.returnValue(of(listUser));
    component.getUsers();
    expect(spy).toHaveBeenCalled();
    expect(component.arrayUsers.length).toBe(2);
  });

  it('getPosts returns users', () => {
    const postService = fixture.debugElement.injector.get(PostService);
    const spy = spyOn(postService, 'getPosts').and.returnValue(of(listPost));
    component.getPosts(1);
    expect(spy).toHaveBeenCalled();
    expect(component.arrayPosts.length).toBe(2);
  });


});
