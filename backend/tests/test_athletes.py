import pytest
from httpx import AsyncClient
from unittest.mock import patch, MagicMock
from app.main import app


@pytest.fixture
def mock_supabase():
    with patch("app.db.supabase.get_client") as mock:
        client = MagicMock()
        mock.return_value = client
        yield client


@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_list_athletes_returns_200(mock_supabase):
    mock_supabase.table.return_value.select.return_value.eq.return_value.execute.return_value.data = []
    mock_supabase.table.return_value.select.return_value.eq.return_value.order.return_value.range.return_value.execute.return_value.data = []

    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/athletes")
    assert response.status_code == 200
    assert "athletes" in response.json()
