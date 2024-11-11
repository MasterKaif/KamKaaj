from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from config import Config


db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()

from .models import User, Task, TaskType, TaskStatus 
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    
    # Register Blueprints and create tables
    with app.app_context():
        from app.routes import main
        app.register_blueprint(main)

    return app
