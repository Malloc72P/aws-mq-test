import { ReactElement } from 'react';
import { HeaderLink } from '../types/commons';
import { DefaultLayoutFooter, FooterData } from './DefaultLayoutFooter';
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
  return (
    <div>
      <DefaultLayoutHeader logo="MQ Test" links={headerLinks} />
      {children}
      <DefaultLayoutFooter data={footerDatas} />
    </div>
  );
};

export default DefaultLayout;
