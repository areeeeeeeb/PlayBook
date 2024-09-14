from config import db
from werkzeug.security import generate_password_hash


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }
    
class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    creation_date = db.Column(db.DateTime, server_default=db.func.now())
    image = db.Column(db.String(120), unique=False, nullable=True)
    # Might put another column for level of users (user, organizer, organization)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def __repr__(self):
        return '<User %r>' % self.email
    def to_json(self):
        return {
            "user_id": self.user_id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "creation_date": self.creation_date,
            "image": self.image,
        }
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), unique=False, nullable=False)
    title = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)
    startTime = db.Column(db.String(80), unique=False, nullable=False)
    endTime = db.Column(db.String(80), unique=False, nullable=False)
    timeCreated= db.Column(db.DateTime, server_default=db.func.now())

    def to_json(self):
        return {
            "id": self.id,
            "userID": self.user_id,
            "title": self.title,
            "description": self.description,
            "location": self.location,
            "startTime": self.startTime,
            "endTime": self.endTime,
            "timeCreated": self.timeCreated,
        }
    

# Put Class Followers here

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), unique=False, nullable=False)
    event_id = db.Column(db.String(80), unique=False, nullable=False)
    comment = db.Column(db.String(80), unique=False, nullable=False)
    timeCreated = db.Column(db.DateTime, server_default=db.func.now())

    def to_json(self):
        return {
            "id": self.id,
            "userID": self.user_id,
            "eventID": self.event_id,
            "comment": self.comment,
            "timeCreated": self.timeCreated,
        }
    
class School(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String(80), unique=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "image": self.image,
        }
