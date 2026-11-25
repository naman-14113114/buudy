declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
      minimize?: () => void;
      toggle?: () => void;
      popup?: () => void;
      showWidget?: () => void;
      isChatMaximized?: () => boolean;
      onLoad?: () => void;
      [key: string]: unknown;
    };
    __buudyPositionTawkTo?: () => void;
  }
}

export function openTawkChat() {
  if (typeof window === "undefined") return;

  const tryMaximize = (): boolean => {
    if (typeof window.Tawk_API !== "undefined" && window.Tawk_API) {
      if (typeof window.Tawk_API.showWidget === "function") {
        try {
          window.Tawk_API.showWidget();
        } catch {
          // ignore
        }
      }
      if (typeof window.Tawk_API.maximize === "function") {
        try {
          window.Tawk_API.maximize();
          return true;
        } catch {
          // ignore
        }
      }
    }
    return false;
  };

  // If already ready, maximize immediately
  if (tryMaximize()) {
    return;
  }

  // Ensure positioner script is present
  if (!document.querySelector("script[data-buudy-tawk-position='true']")) {
    const positionScript = document.createElement("script");
    positionScript.dataset.buudyTawkPosition = "true";
    positionScript.textContent = `
(function(){
  var desktop = { right: '28px', bottom: '128px' };
  var mobile = { right: '18px', bottom: '112px' };
  function isTawkFrame(frame) {
    var src = frame.getAttribute('src') || '';
    var title = frame.getAttribute('title') || '';
    var name = frame.getAttribute('name') || '';
    return src.indexOf('tawk.to') !== -1 || src.indexOf('tawk.link') !== -1 ||
      title.toLowerCase().indexOf('tawk') !== -1 || name.toLowerCase().indexOf('tawk') !== -1;
  }
  function positionTawkFrames() {
    var offset = window.matchMedia('(max-width: 767px)').matches ? mobile : desktop;
    var frames = document.getElementsByTagName('iframe');
    for (var i = 0; i < frames.length; i += 1) {
      if (!isTawkFrame(frames[i])) continue;
      if (frames[i].style.getPropertyValue('right') !== offset.right) {
        frames[i].style.setProperty('right', offset.right, 'important');
      }
      if (frames[i].style.getPropertyValue('bottom') !== offset.bottom) {
        frames[i].style.setProperty('bottom', offset.bottom, 'important');
      }
    }
  }
  document.documentElement.setAttribute('data-buudy-tawk-positioner', 'active');
  window.__buudyPositionTawkTo = positionTawkFrames;
  var observer = new MutationObserver(positionTawkFrames);
  observer.observe(document.documentElement, {
    attributes: true, attributeFilter: ['src', 'style', 'title'], childList: true, subtree: true
  });
  window.addEventListener('load', positionTawkFrames);
  window.addEventListener('resize', positionTawkFrames);
  window.setInterval(positionTawkFrames, 2000);
  positionTawkFrames();
})();
`;
    document.head.appendChild(positionScript);
  }

  // Ensure Tawk script is injected
  if (!document.querySelector("script[data-buudy-tawk='true']")) {
    const widgetScript = document.createElement("script");
    widgetScript.dataset.buudyTawk = "true";
    widgetScript.async = true;
    widgetScript.src = "https://embed.tawk.to/68e4120082c311194f82b349/1j6teckkr";
    widgetScript.charset = "UTF-8";
    widgetScript.setAttribute("crossorigin", "*");
    document.head.appendChild(widgetScript);
  }

  // Poll for Tawk_API to become ready and maximize
  let attempts = 0;
  const pollTimer = setInterval(() => {
    attempts++;
    if (tryMaximize() || attempts > 50) {
      clearInterval(pollTimer);
    }
  }, 100);
}
