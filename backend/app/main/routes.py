import os
from flask import json
from app.main import bp


@bp.route('/get_users', methods=['GET'])
def get_users():
    return json.load(open(os.path.abspath('data/party_users.json')))


@bp.route('/get_activities', methods=['GET'])
def get_activities():
    return json.load(open(os.path.abspath('data/activities.json')))


@bp.route('/get_items', methods=['GET'])
def get_items():
    return json.load(open(os.path.abspath('data/items.json')))


@bp.route('/get_recent_party', methods=['GET'])
def get_recent_party():
    db = json.load(open(os.path.abspath('data/parties.json')))
    party = next((party for party in db['parties'] if party['last_viewed'] == '0'),
                 None)
    return party
