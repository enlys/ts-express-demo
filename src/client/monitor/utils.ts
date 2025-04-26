export function getPageUrl(): string {
  return window.location.href
}

export function getNetworkType(): string {
  return (navigator as any).connection
    ? (navigator as any).connection.effectiveType
    : ''
}

export function removeCircularRefs(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular Reference]';
      }
      seen.add(value);
    }
    return value;
  });
}