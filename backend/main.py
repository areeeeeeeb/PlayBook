from flask import request, jsonify
from config import app, db
from models import Contact, Event, User, Comments, Followers, School
from datetime import datetime

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})


@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include a first name, last name and email"}),
            400,
        )

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "Usr updated."}), 200


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200


# Event API
@app.route("/api/events/<int:event_id>", method=["GET"])
def get_event(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"message": "Event not found"}), 404
    
    return jsonify({"event": event})


@app.route("/api/events/<int:event_id>", method=["POST"])
def create_event():
    id =  request.json.get("id")
    title = request.json.get("title")
    user_id = request.json.get("userID")
    description = request.json.get("description")
    location = request.json.get("location")
    startTime = request.json.get("startTime")
    endTime = request.json.get("endTime")
    timeCreated = request.json.get("timeCreated")

    if not id or not user_id:
        return (
            jsonify({"message": "You must include a id and user_id"}),
            400,
        )
    
    new_event = Event(id=id, title=title, user_id=user_id, description=description, location=location, startTime=startTime, endTime=endTime, timeCreated=timeCreated)
    try:
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Event created!"}), 201



@app.route("/api/events/<int:event_id>", method=["DELETE"])
def delete_event(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"message": "Event not found"}), 404
    
    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "Event deleted!"}), 200

#Users API

@app.route("/api/users/<int:user_id>", method=["GET"])

def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify({"user": user})

@app.route("/api/users", method=["POST"])

def create_user():
    id =  request.json.get("user_id")
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("email")
    password = request.json.get("password")
    timeCreated = request.json.get("timeCreated")
    image = request.json.get("image")
    userClass = request.json.get("userClass")

    if not id or not first_name and not last_name:
        return (
            jsonify({"message": "You must include a id and name"}),
            400,
        )
    
    new_user = User(id=id, first_name=first_name, last_name=last_name, email=email, password=password, timeCreated=timeCreated, image=image, userClass=userClass)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201

@app.route("/api/users/<int:user_id>", method=["DELETE"])

def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

@app.route("/api/users/<int:user_id>", method=["PATCH"])

def modify_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.image = data.get("image", user.image)
    

    db.session.commit()

    return jsonify({"message": "User updated."}), 200


# Comments API

@app.route("/api/comments/<int:comment_id>", method=["POST"])

def create_comment(comment_id):
    id =  request.json.get("id")
    user_id = request.json.get("user_id")
    event_id = request.json.get("event_id")
    comment = request.json.get("comment")
    timeCreated = request.json.get("timeCreated")

    if not id or not user_id:
        return (
            jsonify({"message": "You must include a id and user_id"}),
            400,
        )
    
    new_comment = Comments(id=id, user_id=user_id, event_id=event_id, comment=comment, timeCreated=timeCreated)
    try:
        db.session.add(new_comment)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Comment created!"}), 201

@app.route("/api/comments/<int:comment_id>", method=["DELETE"])

def delete_comment(comment_id):
    comment = Comments.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    
    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Comment deleted!"}), 200

@app.route("/api/comments/<int:comment_id>", method=["PATCH"])

def edit_comment(comment_id):
    comment = Comments.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    data = request.json
    comment.comment = data.get("comment", comment.comment)

    db.session.commit()

    return jsonify({"message": "Comment updated."}), 200

@app.route("/api/comments/<int:comment_id>", method=["GET"])

def get_comment(comment_id):
    comment = Comments.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    
    return jsonify({"comment": comment})

# Followers API

@app.route("/api/followers/<int:follower_id>", method=["POST"])

def follow(user_id, follower_id):
    # Check if this follow relationship already exists
    existing_follow = Followers.query.filter_by(user_id=user_id, follower_id=follower_id).first()

    if existing_follow:
        return "Already following this user."

    # Create a new Follower instance
    new_follow = Followers(user_id=user_id, follower_id=follower_id)

    # Add to session and commit
    db.session.add(new_follow)
    db.session.commit()

    return "Followed successfully!"

@app.route("/api/followers/<int:follower_id>", method=["DELETE"])

def unfollow(user_id, follower_id):
    # Find the follow relationship
    follow = Followers.query.filter_by(user_id=user_id, follower_id=follower_id).first()

    if not follow:
        return "You are not following this user."

    # Delete the follow relationship
    db.session.delete(follow)
    db.session.commit()

    return "Unfollowed successfully!"

@app.route("/api/followers/<int:follower_id>", method=["GET"])

def get_followers(follower_id):
    followers = Followers.query.filter_by(follower_id=follower_id).all()

    return jsonify({"followers": followers})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)

