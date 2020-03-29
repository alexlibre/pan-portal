export default class EventObserver {
  constructor () {
    this.observers = [];
  }

  subscribe (fn) {
    this.observers.push(fn);
  }

  broadcast (data) {
    this.observers.map(subscriber => subscriber(data))
    console.log('Observer updated');
  }
}
