import { Component, OnInit } from '@angular/core';

import { SortService } from '../http.service';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css']
})

export class SorterComponent implements OnInit 
{
  MAX_SPEED:number      = 100;
  MAX_ARRAY_SIZE:number = 5000;
  
  // View (data)
  lst_algorithms          // Possible algorithms - TODO: lst_algorithms data type
  
  // View (options)
  option_sorting_algo   // TODO: data type
  list_size : number   
  sorting_speed         // TODO: data type
  useSound              // TODO: data type

  // Problem (variables)
  list_numbers    // TODO: data type

  constructor(private sortService: SortService) {  }

  ngOnInit(): void 
  {
    this.lst_algorithms = this.sortService
                              .getListSortingAlgorithms()
                              .subscribe( data=>{ this.lst_algorithms = data; },
                                          err =>{ console.log("[SortService] ERROR - getListSortingAlgorithms() - "+err)}
                              )
    // Generate a random sorting and list
    this.sorting_speed = Math.random()*this.MAX_SPEED+1
    this.list_size     = Math.random()*this.MAX_ARRAY_SIZE+1
    
    // Creates new list
    this.generate_shuffle_list()

    // Sound settings
    this.useSound      = true

  }

  generate_shuffle_list()
  {
    // Request a new fresh list
    this.list_numbers = this.sortService
                            .requestNewList(this.list_size)
                            .subscribe( data=>{ this.list_numbers = data; },
                                        err =>{ console.log("[SortService] ERROR - requestNewList(listSize) - "+err)}
                            )
  }
  sound_sort() { } // https://www.npmjs.com/package/play-sound
}
