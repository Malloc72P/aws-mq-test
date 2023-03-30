import { createStyles } from '@mantine/core';

export const useMessageDisplayerStyle = createStyles(
  ({ spacing, colors: { gray }, fontSizes }) => ({
    header: {
      height: '42px',
      fontSize: `${fontSizes.lg}px`,
      lineHeight: '2.5rem',
    },
    message: {
      borderBottom: `1px solid ${gray[4]}`,
      padding: `${spacing.xs}px`,
    },
    timestamp: {
      color: gray[6],
    },
  })
);

export const useCommonStyles = createStyles(() => ({
  spacer: {
    flexGrow: 1,
  },
  zeroBasis: {
    flexBasis: 0,
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  },
}));
