from flask import Blueprint, jsonify, request

from .models.User import User
from app import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the Task Manager API!"})

@main.route("/create_user", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    
    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required"}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 400

    user = User(name=name, email=email)
    user.set_password(password)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "User Added"}), 200
