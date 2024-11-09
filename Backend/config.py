import os

POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_PASSWORD=os.environ.get("POSTGRES_PASSWORD")
POSTGRES_DB=os.environ.get("POSTGRES_DB")

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'you-will-never-guess')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:5433/{POSTGRES_DB}')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

class ProductionConfig(Config):
    DEBUG = False


