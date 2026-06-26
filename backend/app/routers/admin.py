from fastapi import APIRouter
from ..db.supabase import get_client

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats")
async def get_stats():
    db = get_client()
    athletes = db.table("athletes").select("id, is_published, is_verified").execute()
    inquiries = db.table("sponsorship_inquiries").select("id, status").execute()
    sponsors = db.table("sponsors").select("id, is_active").execute()

    all_athletes = athletes.data or []
    all_inquiries = inquiries.data or []
    all_sponsors = sponsors.data or []

    return {
        "total_athletes": len(all_athletes),
        "active_athletes": sum(1 for a in all_athletes if a.get("is_published")),
        "new_inquiries": sum(1 for i in all_inquiries if i.get("status") == "new"),
        "active_sponsors": sum(1 for s in all_sponsors if s.get("is_active")),
        "pending_approval": sum(1 for a in all_athletes if not a.get("is_verified")),
    }


@router.get("/athletes/pending")
async def get_pending_athletes():
    db = get_client()
    result = db.table("athletes").select("*").eq("is_verified", False).execute()
    return result.data


@router.post("/upload")
async def upload_file():
    return {"message": "Use Supabase Storage directly for file uploads"}
