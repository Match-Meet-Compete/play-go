export function isIOS() {
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
}

export function isStandalone() {
  // iOS: navigator.standalone, others: display-mode
  // @ts-ignore
  const ios = (window.navigator as any).standalone;
  const dm = window.matchMedia?.("(display-mode: standalone)")?.matches;
  return Boolean(ios || dm);
}
