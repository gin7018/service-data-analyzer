import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private port = 'http://127.0.0.1:4000/';

  constructor(private http: HttpClient) { }

  fetchApiWithFilters(updatedYear: number, protocols: string[],
                      category: string[], tags: string[], rating: number, compare: string) {
    let url = `${this.port}/search/api?updatedYear=${updatedYear}&protocols=${protocols.toString()}`;
    url += `&category=${category}&tags=${tags.toString()}&rating=${rating}&compare=${compare}`;
    return this.http.get<any[]>(url);
  }

  fetchApiWithKeywords(keywords: string[]) {
    let url = `${this.port}/search/api?keyword=${keywords.toString()}`;
    return this.http.get<any[]>(url);
  }

  fetchMashupWithFilters(updatedYear: number, apisUsed: string[], tags: string[]) {
    let url = `${this.port}/search/mashup?updatedYear=${updatedYear}&apisUsed=${apisUsed}&tags=${tags}`;
    return this.http.get<any[]>(url);
  }

  fetchMashupWithKeywords(keywords: string[]) {
    let url = `${this.port}/search/mashup?keyword=${keywords.toString()}`;
    return this.http.get<any[]>(url);
  }

  fetchTopKApis(k: number) {
    let url = `${this.port}/search/api?k=${k}`;
    return this.http.get<any[]>(url);
  }

  fetchTopKMashups(k: number) {
    let url = `${this.port}/search/mashups?k=${k}`;
    return this.http.get<any[]>(url);
  }

}
