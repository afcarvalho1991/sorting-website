import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SortService 
{
  private backend_url:string = "http://localhost:8080" // this should be provided by a DNS or something :)
  
  constructor(private http: HttpClient ) { }

  public getListSortingAlgorithms()// TODO: return type
  {
    return this.http .get(this.backend_url + "/sortingAlgorithms")
              // .subscribe(
              //               data=>{ this.lst_algorithms = data; },
              //               err =>{ console.log("[SortService] getListSortingAlgorithms() - "+err)}
              // )
  }
  
  public completed_sort(listNumbers) // TODO: listNumbers data type, return type
  {
    const options = { params: new HttpParams().set("list" , listNumbers) } ; 
    // console.log("options = ",options)

    return this.http .get(this.backend_url + "/complete", options)
              // .subscribe(
              //               data=> { this.current_list = data; },
              //               err => { console.log("[SortService] completed_sort(listNumbers) - "+err)}
              // )
  }
  
}
