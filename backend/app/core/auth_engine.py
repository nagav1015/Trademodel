import jwt
import logging
from datetime import datetime, timedelta
from typing import Optional, Dict
from fastapi import HTTPException, Header

logger = logging.getLogger(__name__)

# Simple in-memory user database (in production, use real database)
USERS_DB = {
    "admin": {
        "password": "admin123",  # Change this in production
        "role": "admin",
        "name": "Admin User"
    },
    "trader": {
        "password": "trader123",  # Change this in production
        "role": "user",
        "name": "Trader User"
    }
}

# JWT Configuration
SECRET_KEY = "your-secret-key-change-in-production"  # Change in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

class AuthEngine:
    """Handle JWT authentication and authorization."""
    
    @staticmethod
    def create_token(username: str, role: str) -> str:
        """Create JWT token for user."""
        payload = {
            "username": username,
            "role": role,
            "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
            "iat": datetime.utcnow()
        }
        try:
            token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
            logger.info(f"Token created for user: {username}")
            return token
        except Exception as e:
            logger.error(f"Token creation failed: {e}")
            raise HTTPException(status_code=500, detail="Token creation failed")
    
    @staticmethod
    def verify_token(token: str) -> Dict:
        """Verify JWT token and return payload."""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("username")
            role: str = payload.get("role")
            
            if username is None or role is None:
                raise HTTPException(status_code=401, detail="Invalid token")
            
            return {"username": username, "role": role}
        except jwt.ExpiredSignatureError:
            logger.warning("Token expired")
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            logger.warning("Invalid token")
            raise HTTPException(status_code=401, detail="Invalid token")
    
    @staticmethod
    def authenticate_user(username: str, password: str) -> Dict:
        """Authenticate user credentials."""
        logger.debug(f"Login attempt - username: '{username}' (len={len(username) if username else 0}), password: '{password}' (len={len(password) if password else 0})")
        logger.debug(f"Available users: {list(USERS_DB.keys())}")
        
        if username not in USERS_DB:
            logger.warning(f"Login attempt for non-existent user: '{username}'")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        user = USERS_DB[username]
        logger.debug(f"User found: {username}, stored password: '{user['password']}'")
        
        if user["password"] != password:
            logger.warning(f"Password mismatch for user {username}. Received: '{password}' vs Expected: '{user['password']}'")
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        logger.info(f"User logged in: {username}")
        token = AuthEngine.create_token(username, user["role"])
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "username": username,
                "role": user["role"],
                "name": user["name"]
            }
        }
    
    @staticmethod
    def verify_admin(authorization: Optional[str] = Header(None)) -> Dict:
        """Verify user is admin."""
        if not authorization:
            raise HTTPException(status_code=401, detail="Missing authorization header")
        
        # Extract token from "Bearer <token>"
        try:
            scheme, token = authorization.split()
            if scheme.lower() != "bearer":
                raise HTTPException(status_code=401, detail="Invalid authorization scheme")
        except ValueError:
            raise HTTPException(status_code=401, detail="Invalid authorization header")
        
        user_data = AuthEngine.verify_token(token)
        
        if user_data["role"] != "admin":
            logger.warning(f"Non-admin user {user_data['username']} attempted admin action")
            raise HTTPException(status_code=403, detail="Admin access required")
        
        return user_data
    
    @staticmethod
    def verify_user(authorization: Optional[str] = Header(None)) -> Dict:
        """Verify user has valid token (admin or regular user)."""
        if not authorization:
            raise HTTPException(status_code=401, detail="Missing authorization header")
        
        # Extract token from "Bearer <token>"
        try:
            scheme, token = authorization.split()
            if scheme.lower() != "bearer":
                raise HTTPException(status_code=401, detail="Invalid authorization scheme")
        except ValueError:
            raise HTTPException(status_code=401, detail="Invalid authorization header")
        
        return AuthEngine.verify_token(token)

# Helper function for dependency injection in FastAPI
def get_current_user(authorization: Optional[str] = Header(None)) -> Dict:
    """FastAPI dependency to get current user."""
    return AuthEngine.verify_user(authorization)

def get_admin_user(authorization: Optional[str] = Header(None)) -> Dict:
    """FastAPI dependency to get current admin user."""
    return AuthEngine.verify_admin(authorization)
