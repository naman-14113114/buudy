const fs = require('fs');

const apps = ['uk', 'us', 'ca', 'au'];

apps.forEach(app => {
  const file = 'e:/1st YEAR DTU/New folder/Buudy-Vercel/apps/' + app + '/src/components/cart/CheckoutForm.tsx';
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add useRef to imports
    if (!content.includes('useRef')) {
      content = content.replace(/useState, useEffect/g, 'useState, useEffect, useRef');
    }

    // 2. Add state and observer
    if (!content.includes('const buttonRef = useRef')) {
      content = content.replace(
        'const hasItems = totals.itemCount > 0;',
        `const hasItems = totals.itemCount > 0;\n  const buttonRef = useRef<HTMLDivElement>(null);\n  const [isOriginalVisible, setIsOriginalVisible] = useState(true);\n\n  useEffect(() => {\n    if (!buttonRef.current) return;\n    const observer = new IntersectionObserver(\n      ([entry]) => {\n        setIsOriginalVisible(entry.isIntersecting);\n      },\n      { threshold: 0 }\n    );\n    observer.observe(buttonRef.current);\n    return () => observer.disconnect();\n  }, []);`
      );
    }

    // 3. Wrap original button in a div with ref
    if (!content.includes('ref={buttonRef}')) {
      content = content.replace(
        '<Button\n        id="main-checkout-btn"',
        '<div ref={buttonRef} className="w-full">\n        <Button\n          id="main-checkout-btn"'
      ).replace(
        '<Button\r\n        id="main-checkout-btn"',
        '<div ref={buttonRef} className="w-full">\n        <Button\n          id="main-checkout-btn"'
      );
    }

    // 4. Add sticky button after the original button's closing tag
    if (!content.includes('fixed bottom-0')) {
      // Find where Button closes and error block starts
      content = content.replace(
        `        )}\n      </Button>\n      {error ? (`,
        `        )}\n        </Button>\n      </div>\n\n      <div\n        className={\`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 md:hidden bg-[var(--cream)] border-t border-[rgba(58,31,61,.1)] p-4 pb-6 shadow-[0_-4px_14px_rgba(0,0,0,0.05)] \${isOriginalVisible ? "translate-y-full" : "translate-y-0"}\`}\n      >\n        <Button\n          className={\`relative overflow-hidden w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 buudy-display \${!isRedirecting ? "proxy-bundle-btn" : "disabled:!opacity-100"}\`}\n          disabled={!hasItems || isRedirecting}\n          onClick={handleCheckout}\n          type="button"\n        >\n          {isRedirecting ? (\n            <>\n              <span style={{ visibility: "hidden" }} className="flex items-center gap-2">\n                <Lock size={17} />\n                Checkout securely\n              </span>\n              <span className="absolute inset-0 flex items-center justify-center">\n                <Lottie animationData={loadingLottie} loop={true} className="h-16 w-24 scale-[1.35]" />\n              </span>\n            </>\n          ) : (\n            <>\n              <Lock size={17} />\n              Checkout securely\n            </>\n          )}\n        </Button>\n      </div>\n\n      {error ? (`
      ).replace(
        `        )}\r\n      </Button>\r\n      {error ? (`,
        `        )}\n        </Button>\n      </div>\n\n      <div\n        className={\`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 md:hidden bg-[var(--cream)] border-t border-[rgba(58,31,61,.1)] p-4 pb-6 shadow-[0_-4px_14px_rgba(0,0,0,0.05)] \${isOriginalVisible ? "translate-y-full" : "translate-y-0"}\`}\n      >\n        <Button\n          className={\`relative overflow-hidden w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 buudy-display \${!isRedirecting ? "proxy-bundle-btn" : "disabled:!opacity-100"}\`}\n          disabled={!hasItems || isRedirecting}\n          onClick={handleCheckout}\n          type="button"\n        >\n          {isRedirecting ? (\n            <>\n              <span style={{ visibility: "hidden" }} className="flex items-center gap-2">\n                <Lock size={17} />\n                Checkout securely\n              </span>\n              <span className="absolute inset-0 flex items-center justify-center">\n                <Lottie animationData={loadingLottie} loop={true} className="h-16 w-24 scale-[1.35]" />\n              </span>\n            </>\n          ) : (\n            <>\n              <Lock size={17} />\n              Checkout securely\n            </>\n          )}\n        </Button>\n      </div>\n\n      {error ? (`
      );
    }

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
