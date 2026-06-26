from pydantic import BaseModel
from typing import Optional
from enum import Enum


class MedalType(str, Enum):
    gold = "gold"
    silver = "silver"
    bronze = "bronze"
    none = "none"


class AchievementCreate(BaseModel):
    year: int
    competition: str
    medal: MedalType = MedalType.none
    description: str = ""
    is_olympic: bool = False


class AchievementUpdate(BaseModel):
    year: Optional[int] = None
    competition: Optional[str] = None
    medal: Optional[MedalType] = None
    description: Optional[str] = None
    is_olympic: Optional[bool] = None


class AchievementOut(BaseModel):
    id: str
    athlete_id: str
    year: int
    competition: str
    medal: MedalType
    description: str
    is_olympic: bool
