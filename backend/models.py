from config import db
from werkzeug.security import generate_password_hash
from sqlalchemy.orm import relationship
import base64
    
class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    uni_id = db.Column(db.String(120), unique=True, nullable=True)
    password = db.Column(db.String(120), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=True)
    timeCreated = db.Column(db.DateTime, server_default=db.func.now())
    image = db.Column(db.LargeBinary, nullable=True)
    userClass = db.Column(db.String(80), unique=False, nullable=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def __repr__(self):
        return '<User %r>' % self.email
    def to_json(self):
        return {
            "user_id": self.user_id,
            "email": self.email,
            "uni_id": self.uni_id,
            "name": self.name,
            "creation_date": self.creation_date,
            "image": base64.b64encode(self.image).decode('utf-8') if self.image else None,
            "userClass": self.userClass
        }
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=True, nullable=False)
    title = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=True)
    startTime = db.Column(db.String(80), unique=False, nullable=True)
    endTime = db.Column(db.String(80), unique=False, nullable=True)
    timeCreated = db.Column(db.DateTime, server_default=db.func.now())
    image = db.Column(db.LargeBinary, nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "location": self.location,
            "startTime": self.startTime,
            "endTime": self.endTime,
            "timeCreated": self.timeCreated,
            "image": base64.b64encode(self.image).decode('utf-8') if self.image else None,
        }
    
'''
class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), unique=False, nullable=False)
    follower_id = db.Column(db.String(80), unique=False, nullable=False)
    timeCreated = db.Column(db.DateTime, server_default=db.func.now())

    user = relationship('User', foreign_keys=[user_id], backref='followers')
    follower = relationship('User', foreign_keys=[follower_id], backref='following')

    def to_json(self):  
        return {
            "id": self.id,
            "userID": self.user_id,
            "followerID": self.follower_id,
            "timeCreated": self.timeCreated,
        }

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=False, nullable=False)
    event_id = db.Column(db.Integer, unique=False, nullable=False)
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
    
# class School(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#   name = db.Column(db.String(80), unique=False, nullable=False)
#    location = db.Column(db.String(80), unique=False, nullable=False)
#    image = db.Column(db.String(80), unique=False, nullable=False)
#
#    def to_json(self):
#        return {
#            "id": self.id,
#            "name": self.name,
#            "location": self.location,
#            "image": self.image,
#        }


'''
