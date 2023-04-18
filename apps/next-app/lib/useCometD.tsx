import * as CometdLib from 'cometd';
import { CometD } from 'cometd';
import ReloadExtension from 'cometd/ReloadExtension';
import { useEffect, useRef, useState } from 'react';

export interface CometDHandshakable {
  onSuccess: (cometClient: CometD) => void;
}

export interface CometDSubscribable {
  topic: string;
  onMessage: (message: CometdLib.Message) => void;
}

export interface CometDPublishable {
  channel: string;
  message: Record<string, unknown>;
  onPublish: () => void;
}

export const CHANNEL_ID = '/test/micomet';

export const useCometD = () => {
  const lock = useRef<boolean>(false);
  const [cometd, setCometD] = useState<CometD | undefined>();

  useEffect(() => {
    // 개발환경에서도 한번만 실행되도록
    if (lock.current) {
      return;
    }
    lock.current = true;

    // 인스턴스 생성
    const tempCometD = new CometdLib.CometD();
    const registerResult = tempCometD.registerExtension(
      'reload',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new ReloadExtension()
    );

    console.debug('registerResult >>> ', registerResult);

    // 인스턴스 구성
    tempCometD.configure({
      url: 'http://localhost:8080/cometd',
    });

    tempCometD.addListener('/meta/handshake', (m) => {
      if (!m.successful) {
        return;
      }
      console.log('meta handshake true, subscribe channels');
    });

    // 핸드셰이크 시도
    tempCometD.handshake((arg) => {
      // 핸드셰이크 실패 처리
      if (!arg.successful) {
        console.error('Handshake failed!', arg);
        throw new Error('Handshake failed!');
      }

      // 핸드셰이크 성공
      setCometD(tempCometD);
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        tempCometD.reload && tempCometD.reload();
      });
    }
  }, []);

  return { cometd };
};
