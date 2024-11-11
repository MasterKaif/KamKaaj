from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from app import db
import uuid

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    entity_name = db.Column(db.String(20), nullable=False)
    task_type = db.Column(db.Integer, db.ForeignKey('task_types.id'), nullable=False)
    contact_person = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    note = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    time = db.Column(db.Time, nullable=True)
    date = db.Column(db.Date, nullable=True)
    status = db.Column(db.Integer, db.ForeignKey('task_statuses.id'), nullable=False)
    created_by = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    
    contact_person_user = db.relationship("User", foreign_keys=[contact_person])
    created_by_user = db.relationship("User", foreign_keys=[created_by])

    def __repr__(self):
        return f"<Task {self.entity_name}>"  
