"""Add seed data

Revision ID: 9986415381cf
Revises: 7d91c61b6d3a
Create Date: 2024-11-10 05:00:15.339562

"""
from datetime import datetime
import uuid
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9986415381cf'
down_revision = '7d91c61b6d3a'
branch_labels = None
depends_on = None


def upgrade():
    op.execute(
        """
        INSERT INTO task_types (id, type, icon) VALUES
        (10, 'Meeting', 'meeting-icon'),
        (20, 'Call', 'call-icon'),
        (30, 'Video Call', 'video-call-icon');
        """
    )
    op.execute(
        """
        INSERT INTO task_statuses (id, status) VALUES
        (10, 'Open'),
        (20, 'Closed');
        """
    )


def downgrade():
    op.execute("DELETE FROM task_types WHERE id IN (10, 20, 30);")
    op.execute("DELETE FROM task_statuses WHERE id IN (10, 20);")