""" A simple lib with a sorting algorithm that allows step by step sorting visualization """
global functions_dict
from sorting_algorithms import *

functions_dict = { 
                    "Insertion sort": insertion, 
                    "Selection sort": selection, 
                    # "Merge sort"    : merge_step, 
                    # "Heapsort"      : heap_step, 
                    # "Quicksort"     : quick_step, 
                    # "Shellsort"     : shell_step,
                    # "Bubble sort"   : bubble_step
                 }

def listSortingAlgos() -> list:
    ''' returns an updated list of valid sorting algos '''
    
    global functions_dict
    return list(functions_dict.keys())

def sort( sorting_fun_key:str, lst:list, include_states:bool) -> list:
    ''' 
        calls a specific sorting function based on "sorting_fun_key" using lst, computes the sorted lst:list.
        
        returns: a list now a step further from being sorted :)
    '''
    global functions_dict
    
    lst, states = functions_dict[sorting_fun_key](lst)
    
    if not include_states: states = []
    return {"result":lst, "states":states}

def is_sort_completed(lst:list) -> bool:
    ''' validates if a lst is sorted (ascendingly) '''

    for i in range(1,len(lst)): 
        if lst[i-1]>lst[i]: return False

    return True

def generateList(size:int) -> list:
    ''' 
        returns a random list of floats with the size specifiedlistSortingAlgos
    '''
    from random import random # only this method is going to use this function

    lst =[0.0]*size # allocates space for the list
    
    # fill list with randoms
    for i in range(size): lst[i] = round(random(),3) # with only 2 decimal place (to improve readbility)

    return lst

if __name__ == "__main__":
    lst = generateList(10000)

    lst_sorted = sorted(lst) # creates a new list for validation of sorting 
    
    print("lst \t\t= {}".format(lst))
    print("lst_sorted \t= {})".format(lst_sorted))
    print()
    print("is_sort_completed(lst) \t\t= {}".format(is_sort_completed(lst)))
    print("is_sort_completed(lst_sorted) \t= {}".format(is_sort_completed(lst_sorted)))
    
    print("list sorting algos = [{}]".format(", ".join(listSortingAlgos())))
    print()

    for algo_name in listSortingAlgos():
        # state={"i":0,"k":0}
        print(algo_name)
       
        lst, states = sort(algo_ame,lst)
        for state in states:
            print(state)
        print("is_sort_completed(lst) = {}".format(is_sort_completed(lst)))
    
