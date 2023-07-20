""" API endpoints """
from fastapi import APIRouter, FastAPI

from .api_schema import ValidationErrorResponse, ResponseError, MetaResponse
from .config import Config

from src.modules.webhook.api import router as webhook_router


greet_router = APIRouter()


@greet_router.get(
    "/", description="Endpoint describing the API", response_model=MetaResponse
)
def meta_route() -> MetaResponse:
    networks = [Config.polygon_mainnet, Config.polygon_mumbai]

    networks_info = [
        {
            "chain_id": network.chain_id,
            "addr": network.addr,
        }
        for network in networks
    ]

    return MetaResponse.parse_obj(
        dict(
            message="Recording Oracle API",
            version="0.1.0",
            supported_networks=networks_info,
        )
    )


def init_api(app: FastAPI) -> FastAPI:
    """Register API endpoints"""
    default_responses = {
        400: {"model": ValidationErrorResponse},
        404: {"model": ResponseError},
        405: {"model": ResponseError},
        422: {"model": ResponseError},
        500: {"model": ResponseError},
    }

    app.include_router(greet_router)
    app.include_router(webhook_router, prefix="/webhook", responses=default_responses)

    return app
