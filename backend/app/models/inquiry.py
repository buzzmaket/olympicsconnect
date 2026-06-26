from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from datetime import datetime


class BudgetRange(str, Enum):
    low = "low"
    mid = "mid"
    high = "high"
    enterprise = "enterprise"


class InquiryStatus(str, Enum):
    new = "new"
    reviewing = "reviewing"
    accepted = "accepted"
    rejected = "rejected"


class InquiryCreate(BaseModel):
    athlete_id: str
    company_name: str
    contact_name: str
    contact_email: EmailStr
    phone: Optional[str] = None
    message: str
    budget_range: BudgetRange


class InquiryStatusUpdate(BaseModel):
    status: InquiryStatus


class InquiryOut(BaseModel):
    id: str
    athlete_id: str
    company_name: str
    contact_name: str
    contact_email: str
    message: str
    budget_range: BudgetRange
    status: InquiryStatus
    created_at: datetime
