from flask import Flask, url_for, request
from markupsafe import escape
import json

import sorter

app = Flask(__name__)

@app.route('/generate_list/<int:size>')
def generate_list(size:int): return json.dumps(sorter.generateList(size))

@app.route('/sorting_algos')
def sorting_algos(): return json.dumps(sorter.listSortingAlgos())

@app.route('/sort/<string:sort_algo>/')
def sort(sort_algo:str):
    ''' expects two parameters list:arr[], and include_states:bool '''
    # handle and parse list
    lst = json.loads(request.args.get('list')) # Should return error if is not a valid list or does not exist
    lst = list(map( lambda v : float(v), list(lst))) # using eval instead of float to avoid having to change if I decide to use int or other datatype

    # handle states - converts to boolean
    include_states = request.args.get('states')!=None

    return json.dumps(sorter.sort(sort_algo, lst, include_states))
    
with app.test_request_context():
    print(url_for('generate_list',size=10))
    print(url_for('sorting_algos'))
    print(url_for('sort',sort_algo="algo_name"))

