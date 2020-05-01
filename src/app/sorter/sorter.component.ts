import { Component, OnInit } from '@angular/core';
import { SortService } from '../http.service';
import { SoundService } from '../sound.service';

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
  lst_algorithms        // Possible algorithms - TODO: lst_algorithms data type
  
  // View (options)
  algo_selected:string
  list_size : number   
  sorting_speed         // TODO: data type
  useSound              // TODO: data type

  // Problem (variables)
  list_numbers    // TODO: data type
  player

  constructor(private sortService: SortService, private sound:SoundService) {  }

  ngOnInit(): void 
  {
    this.lst_algorithms = this.sortService
                              .getListSortingAlgorithms()
                              .subscribe( data=>{ this.lst_algorithms = data; this.algo_selected= data[0] },
                                          err =>{ console.log("[SortService] ERROR - getListSortingAlgorithms() - "+err)}
                              )
    // Generate a random sorting and list
    this.sorting_speed = Math.trunc(Math.random()*this.MAX_SPEED+1)
    this.list_size     = Math.trunc(Math.random()*this.MAX_ARRAY_SIZE+1)
    
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
  sound_sort() { this.sound.play() } 

  change_list_size(value)     { this.list_size = value }
  change_sorting_speed(value) { this.sorting_speed = value }
  change_sort_algo(value)     { this.algo_selected = value }
  
  check(){ this.sound_sort() }
  
}
