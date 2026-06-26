import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@olympic.org.il")


async def send_inquiry_notification(inquiry: dict) -> None:
    if not resend.api_key:
        return

    athlete_name = inquiry.get("athlete_name", "ספורטאי")
    try:
        resend.Emails.send({
            "from": "OlympicsConnect <noreply@olympicsconnect.co.il>",
            "to": [ADMIN_EMAIL],
            "subject": f"פנייה חדשה לחסות — {inquiry['company_name']}",
            "html": f"""
            <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #003DA5;">פנייה חדשה לחסות</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px; font-weight: bold;">חברה:</td><td>{inquiry['company_name']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">איש קשר:</td><td>{inquiry['contact_name']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">אימייל:</td><td>{inquiry['contact_email']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">תקציב:</td><td>{inquiry['budget_range']}</td></tr>
                    <tr><td style="padding: 8px; font-weight: bold;">הודעה:</td><td>{inquiry['message']}</td></tr>
                </table>
                <p style="margin-top: 24px; color: #6B7280; font-size: 12px;">
                    OlympicsConnect — פלטפורמה דיגיטלית לחיבור ספורטאים אולימפיים עם נותני חסות
                </p>
            </div>
            """,
        })
    except Exception:
        pass
