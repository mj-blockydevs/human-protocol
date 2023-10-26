from enum import Enum

from src.core.config import Config
from src.utils.enums import BetterEnumMeta


class Networks(int, Enum, metaclass=BetterEnumMeta):
    polygon_mainnet = Config.polygon_mainnet.chain_id
    polygon_mumbai = Config.polygon_mumbai.chain_id
    localhost = Config.localhost.chain_id


class CvatEventTypes(str, Enum, metaclass=BetterEnumMeta):
    update_job = "update:job"
    create_job = "create:job"
    ping = "ping"


class ProjectStatuses(str, Enum, metaclass=BetterEnumMeta):
    annotation = "annotation"
    completed = "completed"
    validation = "validation"
    canceled = "canceled"
    recorded = "recorded"


class TaskStatus(str, Enum, metaclass=BetterEnumMeta):
    annotation = "annotation"
    completed = "completed"


class JobStatuses(str, Enum, metaclass=BetterEnumMeta):
    new = "new"
    in_progress = "in progress"
    rejected = "rejected"
    completed = "completed"


class TaskType(str, Enum, metaclass=BetterEnumMeta):
    image_label_binary = "IMAGE_LABEL_BINARY"
    image_points = "IMAGE_POINTS"
    image_boxes = "IMAGE_BOXES"


class CvatLabelType(str, Enum, metaclass=BetterEnumMeta):
    tag = "tag"
    points = "points"
    rectangle = "rectangle"


class CloudProviders(str, Enum, metaclass=BetterEnumMeta):
    aws = "AWS_S3_BUCKET"
    gcs = "GOOGLE_CLOUD_STORAGE"


class OracleWebhookTypes(str, Enum, metaclass=BetterEnumMeta):
    exchange_oracle = "exchange_oracle"
    job_launcher = "job_launcher"
    recording_oracle = "recording_oracle"


class ExchangeOracleEventType(str, Enum, metaclass=BetterEnumMeta):
    task_creation_failed = "task_creation_failed"
    task_finished = "task_finished"


class JobLauncherEventType(str, Enum, metaclass=BetterEnumMeta):
    escrow_created = "escrow_created"
    escrow_canceled = "escrow_canceled"


class RecordingOracleEventType(str, Enum, metaclass=BetterEnumMeta):
    task_completed = "task_completed"
    task_rejected = "task_rejected"


class OracleWebhookStatuses(str, Enum, metaclass=BetterEnumMeta):
    pending = "pending"
    completed = "completed"
    failed = "failed"


class PlatformType(str, Enum, metaclass=BetterEnumMeta):
    CVAT = "cvat"


class AssignmentStatus(str, Enum, metaclass=BetterEnumMeta):
    created = "created"
    completed = "completed"
    expired = "expired"
    canceled = "canceled"
