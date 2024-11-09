from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from app import db

class UserTask(db.Model):
    __tablename__ = 'users_tasks'

    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), primary_key=True)
    task_id = db.Column(UUID(as_uuid=True), db.ForeignKey('tasks.id'), primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<UserTask user_id={self.user_id}, task_id={self.task_id}>"