import RNEventSource, {MessageEvent} from './EventSource';

interface GetEventSourceOptions {
  onOpen?: (evt: MessageEvent, self: RNEventSource) => void;
  onError?: (evt: MessageEvent) => void;
  onMessage?: Record<string, (evt: MessageEvent) => void>;
}

// Event Source Getter function
// Use react dispatch actions in onopen event listener
export function getEventSource(
  url: string,
  options: GetEventSourceOptions = {},
) {
  const eventSource = new RNEventSource(url);
  eventSource.addEventListener('open', evt => {
    if (options.onOpen) options.onOpen(evt, eventSource);
  });
  eventSource.addEventListener('error', evt => {
    if (options.onError) options.onError(evt);
    eventSource.close();
  });
  if (options.onMessage) {
    Object.keys(options.onMessage).forEach((key: string) => {
      eventSource.addEventListener(key, evt => {
        if (options.onMessage) options.onMessage[key](evt);
      });
    });
  }
  return eventSource;
}
