import { Component, OnInit } from '@angular/core';
import { SorterService } from './sorter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'website';
  MAX_ARRAY_SIZE:number = 100;
  MAX_BAR_HEIGHT = 500;
  
  // View (data)
  // View (data)
  lst_algorithms: any
    // View (options)
    = []; // Possible algorithms - TODO: lst_algorithms data type
        // Possible algorithms - TODO: lst_algorithms data type
  list_numbers: any = null;



  constructor(private sortService: SorterService) {  }

  ngOnInit(): void 
  {
   this.sortService
                  .getListSortingAlgorithms()
                  .subscribe( (data:Array<any>) => this.lst_algorithms = data,
                              (err: string) => console.log("[SortService] ERROR - getListSortingAlgorithms() - "+err))
    console.log("list of sorting algorithm -> ", this.lst_algorithms)
    // Creates new list    
    this.generate_shuffle_list()
  }

  generate_shuffle_list()
  {
    // Request a new fresh list
    this.sortService
        .requestNewList("10")
        .subscribe((data) => this.list_numbers = data )
    console.log("New list -> ", this.list_numbers)
  }
  
}
