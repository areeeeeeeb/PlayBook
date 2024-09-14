from flask import Flask, request, jsonify, session
from config import app, db
from models import User, Event
from datetime import datetime

# User Auth


@app.route('/api/login/', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Query the user from the database
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        session['email'] = user.email
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    
@app.route('/api/logout/', methods=['POST'])
def logout():
    session.pop('email', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/protected/', methods=['GET'])
def protected():
    if 'email' in session:
        return jsonify({'message': f'Hello, {session["email"]}!'}), 200
    else:
        return jsonify({'message': 'Not logged in'}), 401


# Event API
@app.route("/api/events/", methods=["GET"])
def get_event():
    events = Event.query.all()
    json_events = list(map(lambda x: x.to_json(), events))
    return jsonify({"events": json_events})


@app.route("/api/events/", methods=["POST"])
def create_event():
    id =  request.json.get("id")
    title = request.json.get("title")
    user_id = request.json.get("user_id")
    description = request.json.get("description")

    if not title or not user_id:
        return (
            jsonify({"message": "You must include a id and user_id"}),
            400,
        )
    
    new_event = Event(id=id, title=title, user_id=user_id, description=description)
    try:
        db.session.add(new_event)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Event created!"}), 201


'''
@app.route("/api/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"message": "Event not found"}), 404
    
    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "Event deleted!"}), 200

#Users API

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    return jsonify({"user": user})


'''
@app.route("/api/users/", methods=["POST"])
def create_user():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")

    if not name or not email:
        return (
            jsonify({"message": "You must include a name, email and password"}),
            400,
        )
    
    # Check if the user already exists in the database
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400
    
    new_user = User(name=name, email=email, password=password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201

    
def is_user_in_database(email):
    user = User.query.filter_by(email=email).first()
    return user is not None

@app.route('/api/check_user', methods=['POST'])
def check_user():
    data = request.get_json()
    email = data.get('email')

    if is_user_in_database(email):
        return jsonify({'message': 'User exists'}), 200
    else:
        return jsonify({'message': 'User does not exist'}), 404




@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

'''
@app.route("/api/users/<int:user_id>", methods=["PATCH"])
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

@app.route("/api/comments/<int:comment_id>", methods=["POST"])
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

    return jsonify({"message": "Created Comment!"}), 201

@app.route("/api/comments/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):
    comment = Comments.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    
    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Comment deleted!"}), 200

@app.route("/api/comments/<int:comment_id>", methods=["PATCH"])
def edit_comment(comment_id):
    comment = Comments.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    data = request.json
    comment.comment = data.get("comment", comment.comment)

    db.session.commit()

    return jsonify({"message": "Comment updated."}), 200

@app.route("/api/comments/<int:comment_id>", methods=["GET"])

def get_comment(comment_id):
    comment = Comments.query.get(comment_id)

    if not comment:
        return jsonify({"message": "Comment not found"}), 404
    
    return jsonify({"comment": comment})

# Followers API


@app.route("/api/followers/<int:follower_id>", methods=["POST"])
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

@app.route("/api/followers/<int:follower_id>", methods=["DELETE"])
def unfollow(user_id, follower_id):
    # Find the follow relationship
    follow = Followers.query.filter_by(user_id=user_id, follower_id=follower_id).first()

    if not follow:
        return "You are not following this user."

    # Delete the follow relationship
    db.session.delete(follow)
    db.session.commit()

    return "Unfollowed successfully!"

@app.route("/api/followers/<int:follower_id>", methods=["GET"])
def get_followers(follower_id):
    followers = Followers.query.filter_by(follower_id=follower_id).all()

    return jsonify({"followers": followers})

'''

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)