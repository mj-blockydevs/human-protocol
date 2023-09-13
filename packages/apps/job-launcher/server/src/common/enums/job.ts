export enum JobStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  LAUNCHED = 'LAUNCHED',
  FAILED = 'FAILED',
  TO_CANCEL = 'TO_CANCEL',
  CANCELED = 'CANCELED',
}

export enum JobStatusFilter {
  PENDING = 'PENDING',
  PAID = 'PAID',
  LAUNCHED = 'LAUNCHED',
  FAILED = 'FAILED',
  TO_CANCEL = 'TO_CANCEL',
  CANCELED = 'CANCELED',
}

export enum JobRequestType {
  IMAGE_POINTS = 'IMAGE_POINTS',
  IMAGE_BOXES = 'IMAGE_BOXES',
  FORTUNE = 'FORTUNE',
}
