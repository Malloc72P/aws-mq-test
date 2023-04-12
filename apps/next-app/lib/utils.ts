import { CANVAS_WIDTH } from './constants';

export const random = ({ min, max }: { min: number; max: number }) => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin + 1) + ceilMin);
};

export const getCircleXY = ({
  degree,
  radius,
}: {
  degree: number;
  radius: number;
}) => {
  const radian = degree * (Math.PI / 180);
  const adjustment = CANVAS_WIDTH / 2;

  return {
    x: Math.round(Math.cos(radian) * radius + adjustment),
    y: Math.round(Math.sin(radian) * radius + adjustment),
  };
};
