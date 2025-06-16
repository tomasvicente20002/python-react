import sys
import types
import os
import pytest

# Stub external dependencies so backend.models can be imported without installing
# them during testing.
fs = types.ModuleType("flask_sqlalchemy")

class _DummyDB:
    Column = lambda *a, **k: None
    Integer = int
    String = str
    Model = object

def SQLAlchemy():
    return _DummyDB()

fs.SQLAlchemy = SQLAlchemy
sys.modules.setdefault("flask_sqlalchemy", fs)

redis_mod = types.ModuleType("redis")

class _DummyRedis:
    @classmethod
    def from_url(cls, url):
        return cls()

redis_mod.StrictRedis = _DummyRedis
redis_mod.Redis = _DummyRedis
sys.modules.setdefault("redis", redis_mod)

# Stub werkzeug.security used by the User model
ws = types.ModuleType("werkzeug.security")

def generate_password_hash(password):
    return "hashed-" + password

def check_password_hash(hash_value, password):
    return hash_value == "hashed-" + password

ws.generate_password_hash = generate_password_hash
ws.check_password_hash = check_password_hash
werk_mod = types.ModuleType("werkzeug")
werk_mod.security = ws
sys.modules.setdefault("werkzeug", werk_mod)
sys.modules.setdefault("werkzeug.security", ws)

# Ensure project root is on the Python path so 'backend' can be imported
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from backend.models import User


def test_password_hashing():
    user = User()
    user.username = "alice"
    user.set_password("secret")
    assert user.password_hash != "secret"
    assert user.check_password("secret")
    assert not user.check_password("wrong")
