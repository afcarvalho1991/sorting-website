export class State {
    
    state: Float32Array
    searches: Int32Array    
    current_index: number
    constructor( state: Float32Array, searches: Int32Array) 
    { 
        this.state = state;         // list of floats
        this.searches = searches    // list [elem1, elem2]
        this.current_index = 0
    }

    get_next_search()
    {
        if( this.searches.length >= 0 &&  this.current_index <this.searches.length)
            return this.searches[this.current_index++]
            
        return null
    }

}