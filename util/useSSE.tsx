import {useEffect, useState} from 'react';
import EventSource, {CustomEvent} from 'react-native-sse';

interface SSEPayload {
  auctionId: number;
  viewCount: number;
}
export default function useSSE() {
  const [data, setData] = useState<Record<string, number>>({});
  useEffect(() => {
    const eventSource = new EventSource<'sse.auction_viewed'>(
      'https://api.fleaauction.world/v2/sse/event',
    );
    eventSource.addEventListener('open', () => {
      console.log('opened');
    });
    eventSource.addEventListener('sse.auction_viewed', e => {
      const {data} = e as CustomEvent<'sse.auction_viewed'>;
      if (data === null) return;
      const {auctionId, viewCount} = JSON.parse(data) as SSEPayload;
      setData(p => {
        return Object.assign({}, p, {[auctionId.toString()]: viewCount});
      });
    });
    eventSource.addEventListener('error', event => {
      console.log(event);
    });
    return () => {
      eventSource.removeAllEventListeners();
      eventSource.close();
    };
  }, []);
  return data;
}
