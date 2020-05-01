from flask import Flask, url_for, request
from markupsafe import escape
import json

import sorter

app = Flask(__name__)

@app.route('/generate_list/<int:size>')
def generate_list(size:int): return json.dumps(sorter.generateList(size))

@app.route('/sorting_algos')
def sorting_algos(): return json.dumps(sorter.listSortingAlgos())

@app.route('/sort/<string:sort_algo>/<list>/<include_states>')
def sort(sort_algo:str):
    language = request.args.get('language') #if key doesn't exist, returns None

    # using eval instead of float to avoid having to change if I decide to use int or other datatype
    lst = list(map( lambda v : eval(v), list(lst))) 
    # converts to boolean
    if include_states=="true":  include_states = True 
    else:                       include_states = False

    return json.dumps(sorter.sort(sort_algo, lst, include_states))

# @app.route('/user/<username>')
# def profile(username):
#     return '{}\'s profile'.format(escape(username))

with app.test_request_context():
    print(url_for('generate_list',size=10))
    print(url_for('sorting_algos'))
    print(url_for('sort',"[0.4,0.2,0.1,1]",))
    print(url_for('sort',"[0.4,0.2,0.1,1]","true"))
    # print(url_for('profile', username='John Doe'))
