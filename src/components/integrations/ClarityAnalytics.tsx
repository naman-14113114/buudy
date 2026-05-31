import Script from "next/script";

const clarityScript = `
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "sa3reb9k3m");
`;

export function ClarityAnalytics() {
  return (
    <Script
      dangerouslySetInnerHTML={{ __html: clarityScript }}
      id="microsoft-clarity"
      strategy="afterInteractive"
    />
  );
}
