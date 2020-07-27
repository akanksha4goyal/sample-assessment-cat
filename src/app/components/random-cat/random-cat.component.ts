import { Component, OnInit } from '@angular/core';
import { CatImageService } from 'src/app/services/cat-image.service';

import { Cat } from 'src/app/models/cat.model';

@Component({
  selector: 'app-random-cat',
  templateUrl: './random-cat.component.html',
  styleUrls: ['./random-cat.component.css']
})

export class RandomCatComponent implements OnInit {
randomCat: Cat;
error: string;
  constructor(private catImageService: CatImageService) {
    //this.catImageService.getRandomCat()
   }

  ngOnInit(): void {
    this.randomCatImage(); 
  }

  randomCatImage(){
    this.catImageService.getRandomCat().subscribe(cat=>{
      this.randomCat = <Cat>cat;
    }
    )
  }
}
