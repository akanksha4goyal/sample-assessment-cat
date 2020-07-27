import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CatImageService } from 'src/app/services/cat-image.service';
import { By } from '@angular/platform-browser';
import {dummyCategory} from 'src/app/services/cat-image.service.spec';
import { of } from 'rxjs';
import { Component } from '@angular/core';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let service: CatImageService;
  let spy:any;
  let category:any;
  let event:any;
  let catServiceMock: any;

  beforeEach(async(() => {
    catServiceMock=jasmine.createSpyObj('catImageService',['getCategories','getCategoryCats'])
    catServiceMock.getCategories.and.returnValue(of(dummyCategory));
    catServiceMock.getCategoryCats.and.returnValue(of(dummyCategory));

    

    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: CatImageService, useValue: catServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service=new CatImageService(spy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a search button',()=>{
    const linkDes=fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement =linkDes[0].nativeElement;
    expect(nativeButton.textContent).toBe('Search');
  })

  it('should call catImage() when search button is clicked',()=>{
    spyOn(component,'catImage')
    const linkDes=fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement =linkDes[0].nativeElement;
    nativeButton.click();
    expect(component.catImage).toHaveBeenCalled();
  })

  it('should call selectCategoryChangeHandler()',()=>{
    spyOn(component,'selectCategoryChangeHandler')
    component.selectCategoryChangeHandler(category);
    expect(component.selectCategoryChangeHandler).toHaveBeenCalled();
  })

  it('should call selectNumberChangeHandler()',()=>{
    spyOn(component,'selectNumberChangeHandler')
    component.selectNumberChangeHandler(event);
    expect(component.selectNumberChangeHandler).toHaveBeenCalled();
  })

  it('should call getCategoryCats() of catImageService',()=>{
    const linkDes=fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement =linkDes[0].nativeElement;
    nativeButton.click();
    expect(catServiceMock.getCategoryCats).toHaveBeenCalled();
  })

});

@Component({
  template:''
})
class DummyComponent{}
