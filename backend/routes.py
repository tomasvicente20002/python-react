from flask import Blueprint, request, jsonify, current_app
from .models import Patient, User
from .config import db
from flask_jwt_extended import (
    jwt_required, create_access_token, create_refresh_token,
    get_jwt_identity
)
import json
from flask_cors import CORS

patient_routes = Blueprint("patients", __name__)
CORS(patient_routes, origins=["http://localhost:3000"])

@patient_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data.get("username")).first():
        return jsonify({"msg": "Username already exists"}), 409
    user = User(username=data.get("username"))
    user.set_password(data.get("password"))
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201

@patient_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get("username")).first()
    if user and user.check_password(data.get("password")):
        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

@patient_routes.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token), 200

@patient_routes.route("/patients", methods=["GET"])
@jwt_required()
def get_patients():
    redis_client = current_app.redis_client
    cached = redis_client.get("patients")
    if cached:
        return jsonify(json.loads(cached))

    patients = Patient.query.all()
    result = [{"id": p.id, "name": p.name, "email": p.email} for p in patients]
    redis_client.set("patients", json.dumps(result), ex=300)
    return jsonify(result)

@patient_routes.route("/patients", methods=["POST"])
@jwt_required()
def create_patient():
    data = request.get_json()
    new_patient = Patient(name=data["name"], email=data["email"])
    db.session.add(new_patient)
    db.session.commit()
    current_app.redis_client.delete("patients")
    return jsonify({"message": "Patient created"}), 201