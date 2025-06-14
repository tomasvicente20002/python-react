from flask import Flask
from routes import patient_routes
from config import db, Config
from flask_jwt_extended import JWTManager
from wait_for_services import wait_for_db, wait_for_redis
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.config.from_object(Config)

# Inicializar extensões
db.init_app(app)
jwt = JWTManager(app)

# Esperar por Redis e DB
redis_client = wait_for_redis(app.config["REDIS_URL"])
app.redis_client = redis_client  # ✅ associar Redis ao app
wait_for_db(app)

# Criar as tabelas
with app.app_context():
    db.create_all()

# Registar rotas
app.register_blueprint(patient_routes)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")