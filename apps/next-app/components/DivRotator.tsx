import { Box, BoxProps, Switch } from '@mantine/core';
import { useState } from 'react';

export interface DivRotatorProps extends BoxProps {
  rotationDegree?: number;
}

export const DivRotator = ({
  rotationDegree = 0,
  ...props
}: DivRotatorProps) => {
  const [transition, setTransition] = useState(true);

  return (
    <Box>
      <Box
        style={{
          transform: `rotate(${rotationDegree}deg)`,
          transition: transition ? '0.2s' : undefined,
        }}
        {...props}
      />

      <Box mt="xl">
        <Switch
          label="트랜지션 효과"
          checked={transition}
          onChange={(e) => setTransition(e.currentTarget.checked)}
        />
      </Box>
    </Box>
  );
};
