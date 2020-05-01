
from flask import Flask, url_for, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import json

import sorter

@app.route('/generate_list/<int:size>', methods=['GET'])
def generate_list(size:int): return json.dumps(sorter.generateList(size))

@app.route('/sorting_algos', methods=['GET'])
def sorting_algos(): return json.dumps(sorter.listSortingAlgos())

@app.route('/sort/<string:sort_algo>/', methods=['GET'])
def sort(sort_algo:str): return json.dumps(sorter.sort(sort_algo, _handle_list(),  _handle_states()))

@app.route('/is_sorted/', methods=['GET'])
def is_sorted(): return json.dumps(sorter.is_sort_completed(_handle_list()))


# Private functions
def _handle_list():
    # handle and parse list
    lst = json.loads(request.args.get('list'))          # Should return error if is not a valid list or does not exist
    lst = list(map( lambda v : float(v), list(lst)))    # using eval instead of float to avoid having to change if I decide to use int or other datatype
    return lst

def _handle_states():
     # handle states - converts to boolean
    include_states = request.args.get('states')!=None
    return include_states

with app.test_request_context():
    print("Endpoints examples:")
    print("\t"+url_for('generate_list',size=10))
    
    print("\t"+url_for('sorting_algos'))
    
    print("\t"+url_for('sort',sort_algo="algo_name"))
    print("\t"+url_for('is_sorted'))
