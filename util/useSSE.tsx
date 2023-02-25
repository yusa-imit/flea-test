import {useCallback, useEffect, useState} from 'react';
import RNEventSource from './EventSource';
import {getEventSource} from './getEventSource';
import {SSEUrl} from './SSEUrl';
import {useInterval} from './useInterval';

interface SSEPayload {
  auctionId: number;
  viewCount: number;
}
export default function useSSE(): [Record<string, number>, boolean] {
  const [data, setData] = useState<Record<string, number>>({});
  const [src, setSrc] = useState<null | RNEventSource>(null);
  const [loading, setLoading] = useState(true);
  const connect = useCallback(() => {
    if (src !== null) {
      console.log('check status');
      if (!src.checkConnection()) {
        src.close();
        setLoading(true);
        setSrc(null);
      }
    }
    if (src === null) {
      console.log('try connection');
      getEventSource(SSEUrl, {
        onOpen: (_evt, self) => {
          console.log('opened');
          setLoading(false);
          setSrc(self);
        },
        onError: _evt => {
          console.log(_evt);
          setLoading(true);
          setSrc(null);
        },
        onMessage: {
          'sse.auction_viewed': evt => {
            const {data} = evt;
            if (data === null) return;
            const {auctionId, viewCount} = JSON.parse(data) as SSEPayload;
            setData(p => {
              return Object.assign({}, p, {[auctionId.toString()]: viewCount});
            });
          },
        },
      });
    }
  }, [src, setLoading, setSrc, setData]);

  // check connection
  useInterval(() => {
    connect();
  }, 12000);

  // init
  useEffect(() => {
    connect();
  }, []);
  return [data, loading];
}

/*
    let eventSource: null | EventSource<'sse.auction_viewed'> = null;
    function connect() {
      eventSource = new EventSource<'sse.auction_viewed'>(
        'https://api.fleaauction.world/v2/sse/event',
      );
      eventSource.addEventListener('open', () => {
        console.log('opened');
        setLoading(false);
      });
      eventSource.addEventListener('sse.auction_viewed', e => {
        const {data} = e as CustomEvent<'sse.auction_viewed'>;
        if (data === null) return;
        const {auctionId, viewCount} = JSON.parse(data) as SSEPayload;
        setData(p => {
          return Object.assign({}, p, {[auctionId.toString()]: viewCount});
        });
      });
      eventSource.addEventListener('error', () => {
        (eventSource as EventSource<'sse.auction_viewed'>).close();
      });
    }
    connect();
    const interval = setInterval(() => {
      console.log('try reconnect');
      if (eventSource === null) connect();
      else return;
    }, 6000);
    return () => {
      if (eventSource !== null) {
        eventSource.removeAllEventListeners();
        eventSource.close();
      }
      clearInterval(interval);
    };*/
