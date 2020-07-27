import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatImageService } from './cat-image.service';
import { Category } from '../models/category.model';
import { Cat } from '../models/cat.model';


export const dummyCategory: Category[]=[
  { id: 101, name: "101"},
  { id: 102, name: "102"}
];

export let  dummyCats=new Cat()
dummyCats=
 {   
    breeds: [],
   categories:[{id:1,name:'abc'}],
   id: "101",
   url: "https://cdn2.thecatapi.com/images/MTY4MTcwMw.jpg",
   width: 10,
   height: 10}
;

describe('CatImageService', () => {
  let service: CatImageService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatImageService]
    });
    service = TestBed.inject(CatImageService);
    httpMock=TestBed.get(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getRandomCat function', () => {
    const service: CatImageService = TestBed.get(CatImageService);
    expect(service.getRandomCat).toBeTruthy();
   });

  //  it('ghjjh',()=>{
  //    let isEventTriggered=false;
  //    service.getRandomCat().subscribe(()=>{
  //      isEventTriggered=true;
  //    });
  //    expect(isEventTriggered).toBeTruthy();
  //  })

  it('should retrive cats from the API via GET',()=>{
    let  dummyCats=new Cat()
     dummyCats=
      {   
         breeds: [],
        categories:[{id:1,name:'abc'}],
        id: "101",
        url: "https://cdn2.thecatapi.com/images/MTY4MTcwMw.jpg",
        width: 10,
        height: 10}
    ;
    service.getRandomCat().subscribe(cats=>{
      expect(cats.categories.length).toBe(1);
      expect(cats).toEqual(dummyCats);
      expect(cats).not.toBe(null);
      expect(JSON.stringify(cats)).toEqual(JSON.stringify(dummyCats));
    })
    const request= httpMock.expectOne(`${service.randomCatUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCats);
  })

  it('should retrive categories from the api via GET',()=>{
    const dummyCategory: Category[]=[
      { id: 101, name: "101"},
      { id: 102, name: "102"}
    ];
    service.getCategories().subscribe(categories=>{
      expect(categories.length).toBe(2);
      expect(categories).toEqual(dummyCategory);
    })
    const request=httpMock.expectOne(`${service.url_category}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCategory);
  })

  it('should retrive selected category cats from the api via GET',()=>{
    let  dummyCats:Cat[];
//   dummyCats=
//  {   
//     breeds: [],
//    categories:[{id:1,name:'abc'}],
//    id: "101",
//    url: "https://cdn2.thecatapi.com/images/MTY4MTcwMw.jpg",
//    width: 10,
//    height: 10}
// ;
    service.getCategoryCats(10,10).subscribe(categories=>{
      expect(categories.length).toBe(2);
      // expect(categories).toEqual(dummyCats);
    })
    const request=httpMock.expectOne('https://api.thecatapi.com/v1/images/search?category_ids=10&limit=10');
    expect(request.request.method).toBe('GET');
    request.flush(dummyCategory);
  })
  

   it('should have getCategories function', () => {
    const service: CatImageService = TestBed.get(CatImageService);
    expect(service.getCategories).toBeTruthy();
   });

   it('should have getCategoryCats function', () => {
    const service: CatImageService = TestBed.get(CatImageService);
    expect(service.getCategoryCats).toBeTruthy();
   });

   it('should have a handleError function', () => {
    const service: CatImageService = TestBed.get(CatImageService);
    expect(service.handleError).toBeTruthy();
   });

});
