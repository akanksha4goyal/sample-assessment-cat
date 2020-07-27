import { Component, OnInit } from '@angular/core';
import { CatImageService } from 'src/app/services/cat-image.service';
import { Category } from 'src/app/models/category.model';
import { Cat } from 'src/app/models/cat.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  imageQuantity = [];
  id: string;
  limit = 0;
  display: string = "false";
  catsByCategory: Cat[] = [];
  index = 5;
  error: string;

  constructor(private catImageService: CatImageService) { }

  ngOnInit(): void {
    this.categoriesList();
    this.imageQuantity = Array(20).fill(5).map((x, i) => i + 1);
  }

  categoriesList() {
    this.catImageService.getCategories().subscribe(categories => {
      this.categories = <Category[]>categories
    });
  }

  selectCategoryChangeHandler(category: any) {
    this.index = category.id;
  }

  selectNumberChangeHandler(event: any) {
    this.limit = event.target.value;
  }
  catImage() {
    this.catImageService.getCategoryCats(this.index, this.limit).subscribe(cats => {
      this.catsByCategory = <Cat[]>cats
    })
    this.display = "true";
  }
}
