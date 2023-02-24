import {useEffect, useState} from 'react';
import EventSource, {CustomEvent, ErrorEvent} from 'react-native-sse';

interface SSEPayload {
  auctionId: number;
  viewCount: number;
}
export default function useSSE() {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    };
  }, []);
  return data;
}
