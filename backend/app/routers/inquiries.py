from fastapi import APIRouter, HTTPException
from ..db.supabase import get_client
from ..models.inquiry import InquiryCreate, InquiryStatusUpdate, InquiryOut
from ..services.email import send_inquiry_notification

router = APIRouter(prefix="/inquiries", tags=["inquiries"])


@router.post("", response_model=InquiryOut, status_code=201)
async def create_inquiry(body: InquiryCreate):
    db = get_client()
    result = db.table("sponsorship_inquiries").insert(body.model_dump()).execute()
    inquiry = result.data[0]
    await send_inquiry_notification(inquiry)
    return inquiry


@router.get("", response_model=list[InquiryOut])
async def list_inquiries():
    db = get_client()
    result = db.table("sponsorship_inquiries").select("*").order("created_at", desc=True).execute()
    return result.data


@router.get("/{inquiry_id}", response_model=InquiryOut)
async def get_inquiry(inquiry_id: str):
    db = get_client()
    result = db.table("sponsorship_inquiries").select("*").eq("id", inquiry_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return result.data


@router.patch("/{inquiry_id}/status", response_model=InquiryOut)
async def update_inquiry_status(inquiry_id: str, body: InquiryStatusUpdate):
    db = get_client()
    result = (
        db.table("sponsorship_inquiries")
        .update({"status": body.status})
        .eq("id", inquiry_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return result.data[0]
