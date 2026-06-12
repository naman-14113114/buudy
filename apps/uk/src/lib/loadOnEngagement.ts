export function runAfterEngagement(callback: () => void, delay = 45000) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  let hasRun = false;
  const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  const listenerOptions = { once: true, passive: true } as AddEventListenerOptions;

  function cleanupListeners() {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, run, listenerOptions);
    });
  }

  function run() {
    if (hasRun) {
      return;
    }

    hasRun = true;
    window.clearTimeout(timer);
    cleanupListeners();
    callback();
  }

  const timer = window.setTimeout(run, delay);

  events.forEach((eventName) => {
    window.addEventListener(eventName, run, listenerOptions);
  });

  return () => {
    window.clearTimeout(timer);
    cleanupListeners();
  };
}
