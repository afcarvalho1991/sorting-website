import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  // private backend_url:string = "http://127.0.0.1:5000" // this should be provided by a DNS or something :)
  private backend_url:string = "http://api."+window.location.hostname
  constructor(private http: HttpClient ) { }

  public getListSortingAlgorithms()// TODO: return type
  {
    return this.http.get<Array<String>>(this.backend_url + "/sorting_algos")
                     
              // .subscribe(
              //               data=>{ this.lst_algorithms = data; },
              //               err =>{ console.log("[SortService] getListSortingAlgorithms() - "+err)}
              // )
  }
  
  public completed_sort(listNumbers: any) // TODO: listNumbers data type, return type
  {
    const options = { params: new HttpParams().set("list" , JSON.stringify(listNumbers)) } ; 
    // console.log("options = ",options)

    return this.http  .get<Boolean>(this.backend_url + "/is_sorted", options)
  }
  
  public requestNewList(list_size: string)
  {
    return this.http.get(this.backend_url + "/generate_list/" + list_size)
  }
  public requestSort(sorting_algo:string, listNumbers: any, showState:boolean)
  {
    const options = { params: new HttpParams().set("list" , JSON.stringify(listNumbers))
                                              .set("states", JSON.stringify(showState))
                    } ; 
    const url = this.backend_url + "/sort/"+sorting_algo
    
    // this can be improved by avoiding sending the whole list every time (waste of bandwidth)
    return this.http.get(url, options) 

  }
}
