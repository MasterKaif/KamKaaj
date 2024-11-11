from datetime import datetime, date
from flask import Blueprint, jsonify, request
import jwt

from .models.Task import Task
from .models.User import User
from app import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the Task Manager API!"})

@main.route("/signup", methods=["POST"])
def signup():
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
    
    # token = jwt.encode({
    #         'public_id': user.public_id,
    #         'exp' : datetime.utcnow() + timedelta(minutes = 30)
    #     }, "Secret")
    
    # return jsonify({"token": token}), 200
    
    return jsonify({"message": "User created successfully"}), 200


@main.route("/tasks", methods=["POST"])
def create_task():
    
    user_id = request.headers.get("user_id")
    data = request.get_json()
    note = data.get("note")
    entity_name = data.get("entity_name")
    task_type = data.get("task_type") or 10
    contact_person = data.get("contact_person")
    submit_date = data.get("date") or date.today()
    submit_time = data.get("time") or datetime.now().time()
    status = 10
    
    task = Task(
        created_by=user_id,
        note=note,
        entity_name=entity_name,
        task_type=task_type,
        contact_person=contact_person,
        date=submit_date,
        time=submit_time,
        status=status
    )
    
    db.session.add(task)
    db.session.commit()
    
    return jsonify({"message": "Task added successfully !!"}), 200

@main.route('/tasks/<id>', methods=['PUT'])
def update_task(id):
    user_id = request.headers.get("user_id")
    data = request.get_json()
    
    
    task = Task.query.filter_by(id=id).first()
    print(task)
    print(data)
    
    if "note" in data:
        task.note = data["note"]
    if "entity_name" in data:
        task.entity_name = data["entity_name"]
    if "task_type" in data:
        task.task_type = data["task_type"]
    if "contact_person" in data:
        task.contact_person = data["contact_person"]
    if "time" in data:
        task.time = data["time"]
    if "date" in data:
        task.date = data["date"]
    if "status" in data:
        task.status = data["status"]
        
    task.updated_at = datetime.now()
    
    db.session.commit()
    
    return jsonify({"message": "Task updated successfully"}), 200

@main.route("/tasks", methods=['GET'])
def get_tasks():
    user_id = request.headers.get("user_id")
    
    filters = []
    
    contact_person = request.args.get("contact_person")
    if contact_person:
        filters.append(Task.contact_person == contact_person)
        
    task_type = request.args.get("task_type")
    if task_type:
        filters.append(Task.task_type == task_type)
        
    status = request.args.get("status")
    if status:
        filters.append(Task.status == status)
        
    date = request.args.get("date")
    if date:
        try:
            filters.append(Task.date == datetime.strptime(date, "%Y-%m-%d").date())
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400
        
    entity_name = request.args.get("entity_name")
    if entity_name:
        filters.append(Task.entity_name.ilike(f"%{entity_name}%"))
        
    filters.append(Task.created_by == user_id)
        
    tasks_query = Task.query.filter(*filters)
    
    tasks = tasks_query.all()

    task_list = []
    for task in tasks:
        task_data = {
            "id": str(task.id),
            "entity_name": task.entity_name,
            "task_type": task.task_type,
            "contact_person": str(task.contact_person),
            "note": task.note,
            "status": task.status,
            "date": task.date.strftime("%Y-%m-%d") if task.date else None,
            "time": task.time.strftime("%H:%M:%S") if task.time else None,
            "created_at": task.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": task.updated_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        task_list.append(task_data)
    
    return jsonify({
        "tasks": task_list,
        "total": len(task_list),
    }), 200
    
@main.route('/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    
    task = Task.query.get(id)
    
    # Check if task exists
    if not task:
        return jsonify({"message": "Task not found"}), 404

    # Delete the task from the database
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"message": "Task deleted successfully"}), 200
    
    
     