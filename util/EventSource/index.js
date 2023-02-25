/**
 * 
 * Code derived from npm package 'react-native-event-source'
 * Copyright (c) 2015 Jordan Byron ( http://github.com/jordanbyron/ )
 * 
 */


import EventSource from './EventSource'

class RNEventSource {
  constructor(url, options={}) {
    this.url         = url;
    this.options     = options;
    this.eventSource = new EventSource(url, options);
    this.listeners   = [];
  }
  checkConnection(){
    if(this.eventSource.readyState === this.eventSource.CLOSED) return false;
    return true;
  }
  addEventListener (type, listener) {
    this.eventSource.addEventListener(type, listener)

    const remove = () => {
      this.removeListener(type, listener);
    }

    this.listeners.push({
      remove: remove, type: type, listener: listener
    });

    return this.listeners[this.listeners.length - 1];
  }
  removeAllListeners () {
    this.listeners.map((listener) => {
      listener.remove();
    });
  }
  removeListener(type, listener) {
    this.eventSource.removeEventListener(type, listener);
  }
  close () {
    this.eventSource.close();
  }
}

export default RNEventSource;