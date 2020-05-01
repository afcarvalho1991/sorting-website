
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
# def merge_sort(array, left_index, right_index):

#     def merge(array, left_index=0, right_index, middle):
#         states = []
#         # Make copies of both arrays we're trying to merge

#         # The second parameter is non-inclusive, so we have to increase by 1
#         left_copy = array[left_index:middle + 1]
#         right_copy = array[middle+1:right_index+1]

#         # Initial values for variables that we use to keep
#         # track of where we are in each array
#         left_copy_index = 0
#         right_copy_index = 0
#         sorted_index = left_index

#         # Go through both copies until we run out of elements in one
#         while left_copy_index < len(left_copy) and right_copy_index < len(right_copy):
#             states.append([left_copy_index,right_copy_index])

#             # If our left_copy has the smaller element, put it in the sorted
#             # part and then move forward in left_copy (by increasing the pointer)
#             if left_copy[left_copy_index] <= right_copy[right_copy_index]:
#                 array[sorted_index] = left_copy[left_copy_index]
#                 left_copy_index = left_copy_index + 1
#             # Opposite from above
#             else:
#                 array[sorted_index] = right_copy[right_copy_index]
#                 right_copy_index = right_copy_index + 1

#             # Regardless of where we got our element from
#             # move forward in the sorted part
#             sorted_index = sorted_index + 1

#         # We ran out of elements either in left_copy or right_copy
#         # so we will go through the remaining elements and add them
#         while left_copy_index < len(left_copy):
#             states.append([left_copy_index,right_copy_index])
#             array[sorted_index] = left_copy[left_copy_index]
#             left_copy_index = left_copy_index + 1
#             sorted_index = sorted_index + 1

#         while right_copy_index < len(right_copy):
#             array[sorted_index] = right_copy[right_copy_index]
#             right_copy_index = right_copy_index + 1
#             sorted_index = sorted_index + 1
#     # MERGE SORT 
#     if left_index >= right_index: return

#     middle = (left_index + right_index)//2

#     array, mstates = merge_sort(array, left_index, middle)
#     states += mstates
    
#     array, mstates = merge_sort(array, middle + 1, right_index)
#     states += mstates
   
#     array, mstates = merge(array, left_index, right_index, middle)
#     states += mstates

#     return array, states

# def heap_step(lst:list) -> list: 
#     return lst
    
# Function to do Quick sort 
# def quickSort_(arr,low,high):

#     def partition(arr, low, high): 
#         i = ( low-1 )         # index of smaller element 
#         pivot = arr[high]     # pivot 
    
#         for j in range(low , high): 
    
#             # If current element is smaller than or 
#             # equal to pivot 
#             if   arr[j] <= pivot: 
            
#                 # increment index of smaller element 
#                 i = i+1 
#                 arr[i],arr[j] = arr[j],arr[i] 
    
#         arr[i+1],arr[high] = arr[high],arr[i+1] 
#         return ( i+1 )

#     if low < high: 
  
#         # pi is partitioning index, arr[p] is now 
#         # at right place 
#         pi = partition(arr,low,high) 
  
#         # Separately sort elements before 
#         # partition and after partition 
#         quickSort(arr, low, pi-1) 
#         quickSort(arr, pi+1, high) 

# def shell_step(lst:list) -> list: 
#     return lst

# def bubble_step(lst:list) -> list: 
#     return lst