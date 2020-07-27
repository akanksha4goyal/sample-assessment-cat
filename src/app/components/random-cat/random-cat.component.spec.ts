import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCatComponent } from './random-cat.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { CatImageService } from 'src/app/services/cat-image.service';
import { dummyCats } from 'src/app/services/cat-image.service.spec';

describe('RandomCatComponent', () => {
  let component: RandomCatComponent;
  let fixture: ComponentFixture<RandomCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomCatComponent ],
      imports: [
        HttpClientModule
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a change image button',()=>{
    const linkDes=fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement =linkDes[0].nativeElement;
    expect(nativeButton.textContent).toBe('Change Image');
  })


  it('should render image',async()=>{
    const img: HTMLImageElement=fixture.debugElement.nativeElement.querySelector('img');
    expect(img).not.toBe(null);
    // expect(dummyCats.url == img.src).toBe(true);
  })

});
