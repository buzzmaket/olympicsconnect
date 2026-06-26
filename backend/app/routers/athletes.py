from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Optional
from ..db.supabase import get_client
from ..models.athlete import AthleteCreate, AthleteUpdate, AthleteOut, AthletesResponse

router = APIRouter(prefix="/athletes", tags=["athletes"])


@router.get("", response_model=AthletesResponse)
async def list_athletes(
    sport: Optional[str] = None,
    gender: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    sort: str = "relevance",
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=100),
):
    db = get_client()
    query = db.table("athletes").select("*").eq("is_published", True)

    if sport:
        query = query.eq("sport", sport)
    if gender:
        query = query.eq("gender", gender)
    if status:
        query = query.eq("status", status)
    if search:
        query = query.or_(f"full_name.ilike.%{search}%,sport.ilike.%{search}%,city.ilike.%{search}%")

    count_result = query.execute()
    total = len(count_result.data)

    if sort == "name":
        query = query.order("full_name")
    else:
        query = query.order("created_at", desc=True)

    offset = (page - 1) * per_page
    result = query.range(offset, offset + per_page - 1).execute()

    return AthletesResponse(
        athletes=result.data,
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/{athlete_id}", response_model=AthleteOut)
async def get_athlete(athlete_id: str):
    db = get_client()
    result = db.table("athletes").select("*").eq("id", athlete_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Athlete not found")
    return result.data


@router.post("", response_model=AthleteOut, status_code=201)
async def create_athlete(body: AthleteCreate):
    db = get_client()
    result = db.table("athletes").insert(body.model_dump()).execute()
    return result.data[0]


@router.patch("/{athlete_id}", response_model=AthleteOut)
async def update_athlete(athlete_id: str, body: AthleteUpdate):
    db = get_client()
    updates = body.model_dump(exclude_none=True)
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = db.table("athletes").update(updates).eq("id", athlete_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Athlete not found")
    return result.data[0]


@router.delete("/{athlete_id}", status_code=204)
async def delete_athlete(athlete_id: str):
    db = get_client()
    db.table("athletes").delete().eq("id", athlete_id).execute()


@router.post("/{athlete_id}/publish", response_model=AthleteOut)
async def publish_athlete(athlete_id: str):
    db = get_client()
    result = (
        db.table("athletes")
        .update({"is_published": True, "is_verified": True})
        .eq("id", athlete_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Athlete not found")
    return result.data[0]


@router.get("/{athlete_id}/achievements")
async def list_achievements(athlete_id: str):
    db = get_client()
    result = db.table("achievements").select("*").eq("athlete_id", athlete_id).order("year", desc=True).execute()
    return result.data


@router.post("/{athlete_id}/achievements", status_code=201)
async def add_achievement(athlete_id: str, body: dict):
    db = get_client()
    body["athlete_id"] = athlete_id
    result = db.table("achievements").insert(body).execute()
    return result.data[0]
