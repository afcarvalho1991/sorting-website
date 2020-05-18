import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SortService } from '../http.service';
import { State } from '../state.model';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SorterComponent implements OnInit 
{
  
  MAX_ARRAY_SIZE:number = 200;
  MAX_BAR_HEIGHT = 500;
  MAX_BARS_WIDTH = 600;

  // View (data)
  lst_algorithms        // Possible algorithms - TODO: lst_algorithms data type
  
  // View (options)
  algo_selected:string
  list_size : number   
  
  bars_color 
  active_bars_color
  compared_elements
 
  // Problem (variables)
  list_numbers    // TODO: data type
  sort_reply  : State[]
  lst_compares
  constructor(private sortService: SortService, private cd: ChangeDetectorRef) {  }

  ngOnInit(): void 
  {
    this.lst_algorithms = this.sortService
                              .getListSortingAlgorithms()
                              .subscribe( (data:Array<string>)=>{ this.lst_algorithms = data; 
                                                                  this.algo_selected = data[0]; 
                                                                },
                                          err =>{ console.log("[SortService] ERROR - getListSortingAlgorithms() - "+err)}
                              )
    
    // Color settings (default colors)
    this.bars_color         = '#73A839'
    this.active_bars_color  = '#c71c22'

    // forcing to max size instead
    this.list_size     = this.MAX_ARRAY_SIZE
    
    // Creates new list
    this.generate_shuffle_list()
  }

  generate_shuffle_list()
  {
    // Request a new fresh list
    this.list_numbers = this.sortService
                            .requestNewList(this.list_size)
                            .subscribe( (data:Float32Array)=> { 
                                                                this.list_numbers = data;
                                                                this.compared_elements = Array<string>(this.list_size).fill(this.bars_color);
                                                                this.cd.detectChanges();
                                                              },
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
    
    this.list_size   = Number(value);
    this.generate_shuffle_list()

  } //  does not update list to a new list otherwise would perform numerous request to the API
  
  change_sort_algo(value)         { this.algo_selected = value }
  change_color_bars_active(value) { this.active_bars_color = value; }
  change_color_bars(value)        { this.bars_color = value; this.compared_elements.fill(this.bars_color )}

  get_bar_width()     { return 3.5 } // TODO automatically adjust this
  get_bar_heigth(elem){ return this.MAX_BAR_HEIGHT*elem }
 
  play_sort_animation()
  {
    // console.log(this.algo_selected, this.list_numbers.length,this.compared_elements,this.bars_color)
    this.sortService.requestSort(this.algo_selected, this.list_numbers, true)
                      .subscribe 
                      ( 
                        (data) => 
                        { 
                          // console.log(data)
                          this.sort_reply = data["states"] 
                          let i = 0
                          for (let state of this.sort_reply) 
                          {
                            setTimeout(() => 
                            {
                              i++; 
                              let idx_a  = state[0]
                              let idx_b  = state[1]
                              // Moved elements
                              if (state[2].length!=0) 
                                this.list_numbers = state[2] 
                                this.compared_elements.fill(this.bars_color);
                              // // this can be improved by avoind sending the whole list every time
                              
                              // mark compared elements 
                              if(i!=this.sort_reply.length) // last state is completed state so it should be skipped
                              {
                                this.compared_elements[idx_a] = this.active_bars_color
                                this.compared_elements[idx_b] = this.active_bars_color
                              }
                              
                              this.cd.detectChanges();
                            }, 1);                          
                          }
                          
                        }
                      )   
  }
  sort_button()
  {
    if(this.list_numbers.length!=this.list_size) this.generate_shuffle_list()

    this.sortService.completed_sort(this.list_numbers)
                    .subscribe(
                                data=> { if(!data) this.play_sort_animation() },
                                err => { console.log("[SortService] completed_sort(listNumbers) - "+err)}
                    )
  }
}
