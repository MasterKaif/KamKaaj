from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from app import db

class TaskType(db.Model):
    __tablename__ = 'task_types'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type = db.Column(db.String(20), nullable=False)
    icon = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<TaskType {self.type}>"