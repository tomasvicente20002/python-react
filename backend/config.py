from flask_sqlalchemy import SQLAlchemy
import redis
import os
import datetime

db = SQLAlchemy()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres@localhost:5433/collectly")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # JWT Configs
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=30)

# Instância do Redis (a usar diretamente apenas em scripts de setup/testes)
redis_client = redis.StrictRedis.from_url(Config.REDIS_URL)
