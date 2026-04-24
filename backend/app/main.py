from contextlib import asynccontextmanager
from collections.abc import Generator

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from app import models
from app.db import Base, SessionLocal, engine
from app.schema import GoalCreate, GoalRead


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(lifespan=lifespan)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "LifeLeveler API is running"}


@app.post("/goals", response_model=GoalRead)
def create_goal(goal: GoalCreate, db: Session = Depends(get_db)):
    new_goal = models.Goal(**goal.model_dump())
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal
