from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class UserBase(BaseModel):
    email: str = Field(..., max_length=255)
    xp: int = Field(default=0, ge=0)
    level: int = Field(default=1, ge=1)
    streak_count: int = Field(default=0, ge=0)


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class GoalBase(BaseModel):
    user_id: int
    title: str = Field(..., min_length=1, max_length=255)
    deadline: datetime | None = None
    category: str | None = Field(default=None, max_length=100)
    status: str = Field(default="not_started", max_length=50)
    progress_percent: int = Field(default=0, ge=0, le=100)


class GoalCreate(GoalBase):
    pass


class GoalRead(GoalBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskBase(BaseModel):
    goal_id: int
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    is_completed: bool = False
    due_date: datetime | None = None


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
