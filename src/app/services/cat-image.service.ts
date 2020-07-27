import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

import { Cat } from '../models/cat.model';
import { Category } from '../models/category.model';
import { catchError, map } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'f7f67682-e18c-4bed-b0fd-9578fca3efd4'
  })
}

@Injectable({
  providedIn: 'root'
})

export class CatImageService {
  randomCatUrl: string = "https://api.thecatapi.com/v1/images/search";
  url_category: string = "https://api.thecatapi.com/v1/categories";
  constructor(private http: HttpClient) { }

  getRandomCat(): Observable<Cat> {
    return this.http.get<Cat>(this.randomCatUrl, httpOptions)
      .pipe(map(cats => {
        console.log(cats[0]);
        return cats[0];
      })).pipe(catchError(this.handleError))
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url_category, httpOptions).pipe(catchError(this.handleError))
  }

  getCategoryCats(id: number, limit: number): Observable<Cat[]> {
    let url_cat: string = `${this.randomCatUrl}?category_ids=${id}&limit=${limit}`;
    return this.http.get<Cat[]>(url_cat, httpOptions).pipe(catchError(this.handleError))
  }

  handleError(error) {
    return throwError(error.message || "Server Error")
  }
}

