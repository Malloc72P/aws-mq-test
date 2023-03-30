export interface DTO {
  producerId: string;
  data: unknown;
  date: Date;
}

export interface RotateRectangleResult extends DTO {
  data: number;
}

export interface ChartResult extends DTO {
  data: number;
}
