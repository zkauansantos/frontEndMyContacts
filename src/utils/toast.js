import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast({ type, text, duration }) {
  toastEventManager.emitEvent('addtoast', { type, text, duration });
}
