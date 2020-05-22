
def insertion( lista ):
    states = []
    for i in range( 1, len( lista ) ):
        chave = lista[i]
        k = i
        while k > 0 and chave < lista[k - 1]:
            states.append([i,k,[]])
            lista[k] = lista[k - 1]
            k -= 1
        lista[k] = chave
        states.append([i,k,lista.copy()])
    return lista, states

def selection(lst:list) -> list: 
    states = []

    # Traverse through all array elements 
    for i in range(len(lst)): 
        
        # Find the minimum element in remaining  
        # unsorted array 
        min_idx = i 
        for j in range(i+1, len(lst)): 
            if lst[min_idx] > lst[j]:
                min_idx = j 
            states.append([min_idx,j,[]])
                
        # Swap the found minimum element with  
        # the first element         
        lst[i], lst[min_idx] = lst[min_idx], lst[i] 
        states.append([min_idx,j,lst.copy()])
    return lst, states

def merge(array:list):
    def merge_sort(array:list, left_index:int, right_index:int, compares:list=[]) -> (list,list): 
        def merge_internal(array:list, left_index:int, right_index:int, middle:int, compares:list=[]):
            # Make copies of both arrays we're trying to merge

            # The second parameter is non-inclusive, so we have to increase by 1
            left_copy = array[left_index:middle + 1]
            right_copy = array[middle+1:right_index+1]

            # Initial values for variables that we use to keep
            # track of where we are in each array
            left_copy_index = 0
            right_copy_index = 0
            sorted_index = left_index

            # Go through both copies until we run out of elements in one
            while left_copy_index < len(left_copy) and right_copy_index < len(right_copy):

                # If our left_copy has the smaller element, put it in the sorted
                # part and then move forward in left_copy (by increasing the pointer)
                if left_copy[left_copy_index] <= right_copy[right_copy_index]:
                    array[sorted_index] = left_copy[left_copy_index]
                    left_copy_index = left_copy_index + 1
                # Opposite from above
                else:
                    array[sorted_index] = right_copy[right_copy_index]
                    right_copy_index = right_copy_index + 1
                
                compares.append([left_copy_index,right_copy_index,array.copy()])

                # Regardless of where we got our element from
                # move forward in the sorted part
                sorted_index = sorted_index + 1

            # We ran out of elements either in left_copy or right_copy
            # so we will go through the remaining elements and add them
            while left_copy_index < len(left_copy):
                array[sorted_index] = left_copy[left_copy_index]
                compares.append([sorted_index,left_copy_index,array.copy()])
                left_copy_index = left_copy_index + 1
                sorted_index = sorted_index + 1

            while right_copy_index < len(right_copy):
                array[sorted_index] = right_copy[right_copy_index]
                compares.append([sorted_index,right_copy_index,array.copy()])
                right_copy_index = right_copy_index + 1
                sorted_index = sorted_index + 1

            return array, compares   
        ## main merge function    
        if left_index >= right_index: 
            return array,[[left_index,right_index,[]],]

        middle = (left_index + right_index)//2

        array, left_compares  = merge_sort(array, left_index, middle,       compares)
        array, right_compares = merge_sort(array, middle + 1, right_index,  compares)

        left_compares += right_compares # join 

        return merge_internal(array, left_index, right_index, middle,left_compares)
    
    return merge_sort(array,0,len(array))

def quick_sort(array):
    def quick_sort_step(array, start, end):
        def qk_partition(array, start, end, compares=[]):
            pivot = array[start]
            low = start + 1
            high = end

            while True:
                # If the current value we're looking at is larger than the pivot
                # it's in the right place (right side of pivot) and we can move left,
                # to the next element.
                # We also need to make sure we haven't surpassed the low pointer, since that
                # indicates we have already moved all the elements to their correct side of the pivot
                while low <= high and array[high] >= pivot:
                    compares.append([start,high,[]])
                    high = high - 1

                # Opposite process of the one above
                while low <= high and array[low] <= pivot:
                    compares.append([start,low,[]])
                    low = low + 1

                # We either found a value for both high and low that is out of order
                # or low is higher than high, in which case we exit the loop
                if low <= high:
                    array[low], array[high] = array[high], array[low]
                    compares.append([start,low,array.copy()])
                    # The loop continues
                else:
                    # We exit out of the loop
                    break

            array[start], array[high] = array[high], array[start]
            compares.append([start,high,array.copy()])
            return high, compares

        if start >= end: return array,[[start, end,[]],]
        p, compares = qk_partition(array, start, end)
        array, compares_left  = quick_sort_step(array,   start,    p-1)
        array, compares_right = quick_sort_step(array,   p+1,      end)
        return array, compares + compares_left + compares_right
    
    return quick_sort_step(array,0,len(array)-1)
    