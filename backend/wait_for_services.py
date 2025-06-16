import time
import redis
from sqlalchemy import text
from .config import db

def wait_for_redis(url, max_retries=10, delay=3):
    for attempt in range(max_retries):
        try:
            r = redis.Redis.from_url(url)
            r.ping()
            print("✅ Redis está pronto")
            return r
        except redis.exceptions.ConnectionError:
            print(f"⏳ Redis não disponível (tentativa {attempt + 1}/{max_retries})...")
            time.sleep(delay)
    raise Exception("❌ Falha ao conectar ao Redis")

def wait_for_db(app, max_retries=10, delay=3):
    
    print("🔍 DB URI =", app.config.get("SQLALCHEMY_DATABASE_URI"))
    
    for attempt in range(max_retries):
        try:
            with app.app_context():
                db.session.execute(text("SELECT 1"))
            print("✅ PostgreSQL está pronto")
            return
        except Exception as e:
            print(f"⏳ DB não disponível (tentativa {attempt + 1}/{max_retries})... {e}")
            time.sleep(delay)
    raise Exception("❌ Falha ao conectar à base de dados")
