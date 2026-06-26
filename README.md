# OlympicsConnect

**פלטפורמה דיגיטלית לחיבור ספורטאים אולימפיים עם נותני חסות**

לקוח: הוועד האולימפי הישראלי | פותח על ידי: BuzzMarket בע"מ

---

## Stack

| שכבה | טכנולוגיה |
|------|-----------|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Backend | FastAPI (Python 3.11) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (JWT) |
| Storage | Supabase Storage |
| Email | Resend API |
| Frontend hosting | Vercel |
| Backend hosting | Railway |

## מבנה הפרויקט

```
olympicsconnect/
├── frontend/       # React app (RTL Hebrew)
├── backend/        # FastAPI
├── supabase/       # Migrations + seed data
└── .github/        # CI/CD workflows
```

## הגדרת סביבת פיתוח

### 1. Supabase
```bash
# Create a project at https://supabase.com
# Run migrations in supabase/migrations/001_initial_schema.sql
# Run seed data from supabase/seed.sql (for demo)
```

### 2. Frontend
```bash
cd frontend
cp ../.env.example .env.local   # fill in VITE_SUPABASE_*
npm install
npm run dev
```

### 3. Backend
```bash
cd backend
python -m venv .venv
.venv/Scripts/activate          # Windows
pip install -r requirements.txt
cp ../.env.example .env         # fill in SUPABASE_* and RESEND_*
uvicorn app.main:app --reload --port 8000
```

## ממשקים

| ממשק | URL | תיאור |
|------|-----|-------|
| Public | `/` | דף הבית + רשימת ספורטאים |
| Profile | `/athletes/:id` | פרופיל ספורטאי + טופס חסות |
| Portal | `/portal` | ניהול פרופיל אישי לספורטאי |
| Admin | `/admin` | לוח בקרה לוועד |

## API

```
GET    /api/athletes              רשימה מסוננת
GET    /api/athletes/:id          פרופיל מלא
POST   /api/athletes              יצירת פרופיל
PATCH  /api/athletes/:id          עדכון
POST   /api/athletes/:id/publish  פרסום
POST   /api/inquiries             שליחת פנייה לחסות
GET    /api/admin/stats           סטטיסטיקות
```

## Demo Mode

ניתן להפעיל Demo Mode ללא Supabase — לחץ על **"כניסה כ-Demo"** בדף ההתחברות.
הנתונים מגיעים מ-`frontend/src/lib/demoData.ts`.

## Deployment

**Frontend → Vercel:**
- Root directory: `frontend`
- Build: `npm run build`
- Output: `dist`
- Add env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

**Backend → Railway:**
- Root: `backend/`
- Detects Dockerfile automatically
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

---

*OlympicsConnect v1.0 | יוני 2026*
