import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRemoteData(url){
    return this.http
    .get(url)
    .pipe(
      map((res:any) =>{
        return res;
      }),
    )
  }

  getAll(){
    return this.http
    .get("https://pokeapi.co/api/v2/pokemon?limit=151")
    .pipe(
      map((res:any) =>{
        return res;
      }),
    )
  }
  
}
