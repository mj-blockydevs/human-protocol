# pylint: disable=too-few-public-methods,missing-class-docstring
""" Project configuration from env vars """
import os

from dotenv import load_dotenv

from src.utils.logging import parse_log_level
from src.utils.net import is_ipv4

load_dotenv()


def str_to_bool(val: str) -> bool:
    from distutils.util import strtobool

    return val is True or strtobool(val)


class Postgres:
    port = os.environ.get("PG_PORT", "5434")
    host = os.environ.get("PG_HOST", "0.0.0.0")
    user = os.environ.get("PG_USER", "admin")
    password = os.environ.get("PG_PASSWORD", "admin")
    database = os.environ.get("PG_DB", "recording_oracle")

    @classmethod
    def connection_url(cls):
        return f"postgresql://{cls.user}:{cls.password}@{cls.host}:{cls.port}/{cls.database}"


class PolygonMainnetConfig:
    chain_id = 137
    rpc_api = os.environ.get("POLYGON_MAINNET_RPC_API_URL")
    private_key = os.environ.get("POLYGON_MAINNET_PRIVATE_KEY")
    addr = os.environ.get("POLYGON_MAINNET_ADDR")


class PolygonMumbaiConfig:
    chain_id = 80001
    rpc_api = os.environ.get("POLYGON_MUMBAI_RPC_API_URL")
    private_key = os.environ.get("POLYGON_MUMBAI_PRIVATE_KEY")
    addr = os.environ.get("POLYGON_MUMBAI_ADDR")


class LocalhostConfig:
    chain_id = 1338
    rpc_api = os.environ.get("LOCALHOST_RPC_API_URL", "http://blockchain-node:8545")
    private_key = os.environ.get(
        "LOCALHOST_PRIVATE_KEY",
        "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    )
    addr = os.environ.get("LOCALHOST_MUMBAI_ADDR", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

    exchange_oracle_url = os.environ.get("LOCALHOST_EXCHANGE_ORACLE_URL")
    reputation_oracle_url = os.environ.get("LOCALHOST_REPUTATION_ORACLE_URL")


class CronConfig:
    process_exchange_oracle_webhooks_int = int(
        os.environ.get("PROCESS_EXCHANGE_ORACLE_WEBHOOKS_INT", 3000)
    )
    process_exchange_oracle_webhooks_chunk_size = os.environ.get(
        "PROCESS_EXCHANGE_ORACLE_WEBHOOKS_CHUNK_SIZE", 5
    )
    process_reputation_oracle_webhooks_int = int(
        os.environ.get("PROCESS_REPUTATION_ORACLE_WEBHOOKS_INT", 3000)
    )
    process_reputation_oracle_webhooks_chunk_size = os.environ.get(
        "PROCESS_REPUTATION_ORACLE_WEBHOOKS_CHUNK_SIZE", 5
    )


class StorageConfig:
    endpoint_url = os.environ.get("STORAGE_ENDPOINT_URL", "storage.googleapis.com")
    region = os.environ.get("STORAGE_REGION", "")
    access_key = os.environ.get("STORAGE_ACCESS_KEY", "")
    secret_key = os.environ.get("STORAGE_SECRET_KEY", "")
    results_bucket_name = os.environ.get("STORAGE_RESULTS_BUCKET_NAME", "")
    secure = str_to_bool(os.environ.get("STORAGE_USE_SSL", "true"))

    @classmethod
    def provider_endpoint_url(cls):
        scheme = "https://" if cls.secure else "http://"

        return f"{scheme}{cls.endpoint_url}"

    @classmethod
    def bucket_url(cls):
        scheme = "https://" if cls.secure else "http://"

        if is_ipv4(cls.endpoint_url):
            return f"{scheme}{cls.endpoint_url}/{cls.results_bucket_name}/"
        else:
            return f"{scheme}{cls.results_bucket_name}.{cls.endpoint_url}/"


class ExchangeOracleStorageConfig:
    endpoint_url = os.environ.get("EXCHANGE_ORACLE_STORAGE_ENDPOINT_URL", "storage.googleapis.com")
    region = os.environ.get("EXCHANGE_ORACLE_STORAGE_REGION", "")
    access_key = os.environ.get("EXCHANGE_ORACLE_STORAGE_ACCESS_KEY", "")
    secret_key = os.environ.get("EXCHANGE_ORACLE_STORAGE_SECRET_KEY", "")
    results_bucket_name = os.environ.get("EXCHANGE_ORACLE_STORAGE_RESULTS_BUCKET_NAME", "")
    secure = str_to_bool(os.environ.get("EXCHANGE_ORACLE_STORAGE_USE_SSL", "true"))

    @classmethod
    def provider_endpoint_url(cls):
        scheme = "https://" if cls.secure else "http://"

        return f"{scheme}{cls.endpoint_url}"

    @classmethod
    def bucket_url(cls):
        scheme = "https://" if cls.secure else "http://"

        if is_ipv4(cls.endpoint_url):
            return f"{scheme}{cls.endpoint_url}/{cls.results_bucket_name}/"
        else:
            return f"{scheme}{cls.results_bucket_name}.{cls.endpoint_url}/"


class FeaturesConfig:
    enable_custom_cloud_host = str_to_bool(os.environ.get("ENABLE_CUSTOM_CLOUD_HOST", "no"))
    "Allows using a custom host in manifest bucket urls"

    default_point_validity_relative_radius = float(
        os.environ.get("DEFAULT_POINT_VALIDITY_RELATIVE_RADIUS", 0.8)
    )


class Config:
    port = int(os.environ.get("PORT", 8000))
    environment = os.environ.get("ENVIRONMENT", "development")
    workers_amount = int(os.environ.get("WORKERS_AMOUNT", 1))
    webhook_max_retries = int(os.environ.get("WEBHOOK_MAX_RETRIES", 5))
    webhook_delay_if_failed = int(os.environ.get("WEBHOOK_DELAY_IF_FAILED", 60))
    loglevel = parse_log_level(os.environ.get("LOGLEVEL", "info"))

    polygon_mainnet = PolygonMainnetConfig
    polygon_mumbai = PolygonMumbaiConfig
    localhost = LocalhostConfig

    postgres_config = Postgres
    cron_config = CronConfig
    storage_config = StorageConfig
    exchange_oracle_storage_config = ExchangeOracleStorageConfig

    features = FeaturesConfig
