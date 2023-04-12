import { Box, Flex } from '@mantine/core';
import { ReactElement } from 'react';
import { useCommonStyles } from '../lib/styles';
import { HeaderLink } from '../types/commons';
import { FooterData } from './DefaultLayoutFooter';
import { DefaultLayoutHeader } from './DefaultLayoutHeader';

interface LayoutProps {
  children: ReactElement;
}

const headerLinks: HeaderLink[] = [
  {
    label: 'Div회전',
    link: '/',
  },
  {
    label: '차트',
    link: '/chart',
  },
  {
    label: '테스트 콘솔',
    link: '/console',
  },
  {
    label: 'Comet 클라이언트',
    link: '/cometd/client',
  },
  {
    label: 'CometD 테스트 콘솔',
    link: '/cometd/console',
  },
];

const footerDatas: FooterData[] = [
  {
    title: 'footer-1',
    links: [
      {
        label: 'footer-1-1',
        link: '#',
      },
      {
        label: 'footer-1-2',
        link: '#',
      },
      {
        label: 'footer-1-3',
        link: '#',
      },
    ],
  },
  {
    title: 'footer-2',
    links: [
      {
        label: 'footer-1-1',
        link: '#',
      },
      {
        label: 'footer-1-2',
        link: '#',
      },
    ],
  },
  {
    title: 'footer-3',
    links: [
      {
        label: 'footer-3-1',
        link: '#',
      },
      {
        label: 'footer-3-2',
        link: '#',
      },
      {
        label: 'footer-3-3',
        link: '#',
      },
      {
        label: 'footer-3-4',
        link: '#',
      },
    ],
  },
];

const DefaultLayout = ({ children }: LayoutProps) => {
  const {
    classes: { grow },
  } = useCommonStyles();
  return (
    <Flex direction="column" h="100vh">
      <DefaultLayoutHeader logo="MQ Test" links={headerLinks} />
      <Box className={grow}>{children}</Box>
    </Flex>
  );
};

export default DefaultLayout;
