from flask import request, jsonify
from config import app, db
from models import Contact, Event
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
        return jsonify({"message": "User not found"}), 404
    
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

    return jsonify({"message": "User created!"}), 201



@app.route("/api/events/<int:event_id>", method=["DELETE"])
def delete_event(event_id):
    event = Event.query.get(event_id)

    if not event:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)