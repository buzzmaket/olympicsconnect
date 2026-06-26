from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum
from datetime import datetime


class AthleteStatus(str, Enum):
    olympic = "olympic"
    hopeful = "hopeful"
    retired = "retired"


class AthleteGender(str, Enum):
    male = "male"
    female = "female"


class AthleteCreate(BaseModel):
    full_name: str
    sport: str
    age: int = Field(ge=14, le=60)
    city: str
    status: AthleteStatus
    gender: AthleteGender
    bio: str = ""
    values: List[str] = []
    avatar_url: str = ""


class AthleteUpdate(BaseModel):
    full_name: Optional[str] = None
    sport: Optional[str] = None
    age: Optional[int] = Field(None, ge=14, le=60)
    city: Optional[str] = None
    status: Optional[AthleteStatus] = None
    gender: Optional[AthleteGender] = None
    bio: Optional[str] = None
    values: Optional[List[str]] = None
    avatar_url: Optional[str] = None
    is_published: Optional[bool] = None


class AthleteOut(BaseModel):
    id: str
    user_id: Optional[str] = None
    full_name: str
    sport: str
    age: int
    city: str
    status: AthleteStatus
    gender: AthleteGender
    bio: str
    values: List[str]
    avatar_url: str
    is_verified: bool
    is_published: bool
    created_at: datetime
    updated_at: datetime


class AthletesResponse(BaseModel):
    athletes: List[AthleteOut]
    total: int
    page: int
    per_page: int
