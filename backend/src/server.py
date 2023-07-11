from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Database Configuration
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://wasif:password@localhost/MYSQLDB"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/test")
async def test_endpoint():
    return {"message": "This is a test endpoint"}

# SQLAlchemy Model
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    description = Column(String(255))
    colour = Column(String(255))
    size = Column(String(20))

# Create tables
Base.metadata.create_all(bind=engine)

@app.post("/api/productData", tags=["product"])
async def saveFormData(data: dict) -> dict:

    # Process the form data here
    name = data.get('name')
    id = data.get('id')
    description = data.get('description')
    colour = data.get('colour')
    size = data.get('size')

     # Store in database
    db = SessionLocal()
    product = Product(name=name, description=description, colour=colour, size=size)
    db.add(product)
    db.commit()
    db.refresh(product)

    # Return a response indicating success or failure
    return {"message": "Data successfully saved"}