export default function createStore(reducer, state = {}) {
  const subscribers = [];
  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach(handler => handler());
    },
    subscribe(handler) {
      subscribers.push(handler);
      return function unsubscribe() {
        const index = subscribers.indexOf(handler);
        if (index > 0) {
          subscribers.splice(index, 1);
        }
      };
    }
  };
}
