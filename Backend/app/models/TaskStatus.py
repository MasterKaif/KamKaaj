from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from app import db

class TaskStatus(db.Model):
    __tablename__ = 'task_statuses'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<TaskStatus {self.status}>"