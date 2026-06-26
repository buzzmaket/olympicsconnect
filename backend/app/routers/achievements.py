from fastapi import APIRouter, HTTPException
from ..db.supabase import get_client
from ..models.achievement import AchievementUpdate, AchievementOut

router = APIRouter(prefix="/achievements", tags=["achievements"])


@router.patch("/{achievement_id}", response_model=AchievementOut)
async def update_achievement(achievement_id: str, body: AchievementUpdate):
    db = get_client()
    updates = body.model_dump(exclude_none=True)
    result = db.table("achievements").update(updates).eq("id", achievement_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return result.data[0]


@router.delete("/{achievement_id}", status_code=204)
async def delete_achievement(achievement_id: str):
    db = get_client()
    db.table("achievements").delete().eq("id", achievement_id).execute()
