import os
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel


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
MYSQL_USER = os.environ.get("MYSQL_USER")
MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
MYSQL_HOST = os.getenv("MYSQL_HOST", "database")
MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE")

# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://wasif:password@localhost/MYSQLDB"
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

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


class ProductData(BaseModel):
    name: str
    id: int
    description: str
    colour: str
    size: str



@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.get("/api/product-list", tags=["product"])
async def getProducts() -> dict:
    db = SessionLocal()
    products = db.query(Product).all()

    # Iterate over the products list and convert each Product object to a dictionary
    product_list = [ProductData(name=product.name, id=product.id, description=product.description,
                               colour=product.colour, size=product.size) for product in products]
    return {"data": product_list}

@app.get("/api/productData/{product_id}", tags=["product"])
async def getProduct(product_id: int) -> ProductData:
    db = SessionLocal()
    print(product_id)
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        return ProductData(
            name=product.name,
            id=product.id,
            description=product.description,
            colour=product.colour,
            size=product.size
        )
    else:
        raise HTTPException(status_code=404, detail="Product not found")

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
    product = Product(name=name, id=id, description=description, colour=colour, size=size)
    db.add(product)
    db.commit()
    db.refresh(product)

    # Return a response indicating success or failure
    return {"message": "Data successfully saved"}

@app.put("/api/productData/{product_id}", tags=["product"])
async def updateProduct(product_id: int, data: ProductData) -> dict:
    db = SessionLocal()
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        product.name = data.name
        product.description = data.description
        product.colour = data.colour
        product.size = data.size
        db.commit()
        return {"message": "Product updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")

@app.delete("/api/productData/{product_id}", tags=["product"])
async def deleteProduct(product_id: int) -> dict:
    db = SessionLocal()
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        db.delete(product)
        db.commit()
        return {"message": "Product deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")    
