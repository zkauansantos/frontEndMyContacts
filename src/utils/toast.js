import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast({ type, text }) {
  toastEventManager.emitEvent('addtoast', { type, text });
}
