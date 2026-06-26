from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from .routers import athletes, achievements, inquiries, admin

app = FastAPI(
    title="OlympicsConnect API",
    description="פלטפורמה דיגיטלית לחיבור ספורטאים אולימפיים עם נותני חסות",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://olympicsconnect.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(athletes.router, prefix="/api")
app.include_router(achievements.router, prefix="/api")
app.include_router(inquiries.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok", "service": "OlympicsConnect API"}
