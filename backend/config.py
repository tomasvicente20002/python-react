from flask_sqlalchemy import SQLAlchemy
import redis
import os

db = SQLAlchemy()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres@localhost:5433/collectly")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")

redis_client = redis.StrictRedis.from_url(Config.REDIS_URL)
