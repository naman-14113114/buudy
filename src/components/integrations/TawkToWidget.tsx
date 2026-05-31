import Script from "next/script";

const tawkToScript = `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
Tawk_API.customStyle = {
  zIndex: 50
};
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68e4120082c311194f82b349/1j6teckkr';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
`;

const tawkToPositionScript = `
(function(){
  var desktop = { right: '28px', bottom: '128px' };
  var mobile = { right: '18px', bottom: '112px' };

  function isTawkFrame(frame) {
    var src = frame.getAttribute('src') || '';
    var title = frame.getAttribute('title') || '';
    var name = frame.getAttribute('name') || '';

    return src.indexOf('tawk.to') !== -1 ||
      src.indexOf('tawk.link') !== -1 ||
      title.toLowerCase().indexOf('tawk') !== -1 ||
      name.toLowerCase().indexOf('tawk') !== -1;
  }

  function positionTawkFrames() {
    var offset = window.matchMedia('(max-width: 767px)').matches ? mobile : desktop;
    var frames = document.getElementsByTagName('iframe');

    for (var i = 0; i < frames.length; i += 1) {
      if (!isTawkFrame(frames[i])) {
        continue;
      }

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
    attributes: true,
    attributeFilter: ['src', 'style', 'title'],
    childList: true,
    subtree: true
  });

  window.addEventListener('load', positionTawkFrames);
  window.addEventListener('resize', positionTawkFrames);
  window.setInterval(positionTawkFrames, 2000);
  positionTawkFrames();
})();
`;

export function TawkToWidget() {
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: tawkToScript }}
        id="tawk-to-widget"
        strategy="afterInteractive"
      />
      <Script
        dangerouslySetInnerHTML={{ __html: tawkToPositionScript }}
        id="tawk-to-position"
        strategy="afterInteractive"
      />
    </>
  );
}
