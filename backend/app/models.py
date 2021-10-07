from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app import db


party_members = db.table(
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('party_id', db.Integer, db.ForeignKey('party.id'))
)

activity_members = db.table(
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('activity_id', db.Integer, db.ForeignKey('activity.id'))
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Party(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    time = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    currency = db.Column(db.String(20))  # choose

    def __repr__(self):
        return f'<Party {self.name}>'


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    party_id = db.Column(db.Integer, db.ForeignKey('party.id'))
    name = db.Column(db.String(64), index=True, unique=True)
    # total_price

    def __repr__(self):
        return f'<Activity {self.name}>'


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'))
    bought_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(64), index=True, unique=True)
    price = db.Column(db.Float(2))

    def __repr__(self):
        return f'<Item {self.name}>'
