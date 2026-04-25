from contextlib import asynccontextmanager
from collections.abc import Generator

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from app import models
from app.db import Base, SessionLocal, engine
from app.schema import GoalCreate, GoalRead, TaskRead
from app.services.taskgen import generate_tasks_for_goal

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

@app.get("/users/{user_id}/goals", response_model=list[GoalRead])
def list_user_goals(user_id: int, db: Session = Depends(get_db)):
    return db.query(models.Goal).filter(models.Goal.user_id == user_id).all()


@app.post("/goals/{goal_id}/generate-tasks", response_model=list[TaskRead])
def generate_tasks(goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    if goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    difficulty_to_priority = {
        "easy": 1,
        "medium": 2,
        "hard": 3,
    }

    generated_tasks = generate_tasks_for_goal(goal.title)
    created_tasks: list[models.Task] = []

    for task_data in generated_tasks:
        task = models.Task(
            goal_id=goal.id,
            title=task_data["title"],
            description=task_data.get("description"),
            priority=difficulty_to_priority.get(task_data.get("difficulty", "easy"), 1),
            is_completed=False,
            due_date=None,
        )
        db.add(task)
        created_tasks.append(task)

    db.commit()

    for task in created_tasks:
        db.refresh(task)

    return created_tasks


@app.get("/goals/{goal_id}/tasks", response_model=list[TaskRead])
def list_goal_tasks(goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(models.Goal).filter(models.Goal.id == goal_id).first()
    if goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")

    return db.query(models.Task).filter(models.Task.goal_id == goal_id).all()
