import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SortService } from '../http.service';
import { SoundService } from '../sound.service';
import { Observable } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { State } from '../state.model';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SorterComponent implements OnInit 
{
  MAX_SPEED:number      = 100;
  MAX_ARRAY_SIZE:number = 200;
  
  MAX_BAR_HEIGHT = 500;
  MAX_BARS_WIDTH = 600;

  // View (data)
  lst_algorithms        // Possible algorithms - TODO: lst_algorithms data type
  
  // View (options)
  algo_selected:string
  list_size : number   
  sorting_speed         // TODO: data type
  
  bars_color 
  active_bars_color
  
  useSound              // TODO: data type
  player          // TODO: data type

  // Problem (variables)
  list_numbers    // TODO: data type
  sort_reply  : State[]
  lst_compares

  constructor(private sortService: SortService, private sound:SoundService, private cd: ChangeDetectorRef) {  }

  ngOnInit(): void 
  {
    this.lst_algorithms = this.sortService
                              .getListSortingAlgorithms()
                              .subscribe( (data:Array<string>)=>{ this.lst_algorithms = data; 
                                                                  this.algo_selected = data[0]; 
                                                                },
                                          err =>{ console.log("[SortService] ERROR - getListSortingAlgorithms() - "+err)}
                              )
    // Generate a random sorting and list
    this.sorting_speed = Math.trunc(Math.random()*this.MAX_SPEED+1)
    this.list_size     = Math.trunc(Math.random()*this.MAX_ARRAY_SIZE+1)
    
    // Creates new list
    this.generate_shuffle_list()

    // Color and Sound settings
    this.useSound           = true    
    this.bars_color         = '#73A839'
    this.active_bars_color  = '#c71c22'

  }

  generate_shuffle_list()
  {
    // Request a new fresh list
    this.list_numbers = this.sortService
                            .requestNewList(this.list_size)
                            .subscribe( (data:Float32Array)=> { this.list_numbers = data; },
                                        err =>{ console.log("[SortService] ERROR - requestNewList(listSize) - "+err)}
                            )
  }
  
  change_list_size(value)         
  { 
    // // wait 300ms after each keystroke before considering the term
    // debounceTime(300)
    // // ignore new term if same as previous term
    // distinctUntilChanged(),

    // // switch to new search observable each time the term changes
    // switchMap((term: string) => this.heroService.searchHeroes(term))
    this.list_size =  value; 
  } //  does not update list to a new list otherwise would perform numerous request to the API
  
  change_sorting_speed(value)     { this.sorting_speed = value }
  change_sort_algo(value)         { this.algo_selected = value }
  change_color_bars_active(value) { this.active_bars_color = value}
  change_color_bars(value)        { this.bars_color = value}
  sound_sort()                    { this.sound.play() } 

  check()
  { 
    // this.sound_sort()
    console.log(this.bars_color)
  }
  
  get_bar_width()     { return 3.5 } // TODO automatically adjust this
  get_bar_heigth(elem){ return this.MAX_BAR_HEIGHT*elem }

 
  play_sort_animation()
  {
    this.sortService.requestSort(this.algo_selected, this.list_numbers, true)
                    .subscribe 
                    ( 
                      (data) => 
                      { 
                        
                        console.log(data)
                        this.sort_reply = data["states"] 
                        
                        for (let state of this.sort_reply) 
                        {
                          setTimeout(() => 
                          {
                            let idx_a  = state[0]
                            let idx_b  = state[1]
                            // Moved elements
                            if (state[2].length!=0) this.list_numbers = state[2]
                            // Mark indexes with different color
                            // console.log("Mark indexes with different color")
                            this.cd.detectChanges();  
                          }, 10);
                          // console.log(idx_a+" "+idx_b+" "+state[2].length)
                         
                        }
                      }
                    )
  }
}
