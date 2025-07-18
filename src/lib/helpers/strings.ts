interface TGetErrorTextOpts {
  omitErrorName?: boolean;
}

export function getErrorText(err: unknown, opts: TGetErrorTextOpts = {}): string {
  if (!err) {
    return '';
  }
  // Error object
  if (err instanceof Error) {
    return [
      // prettier-ignore
      !opts.omitErrorName && err.name !== 'Error' ? err.name : '',
      err.message,
    ]
      .filter(Boolean)
      .join(': ');
  }
  // An object with the `digest` property
  if (err instanceof Object && Object.prototype.hasOwnProperty.call(err, 'digest')) {
    return String((err as { digest: string }).digest);
  }
  return String(err);
}

export function getRandomHashString(len: number = 4) {
  const randVal = Math.random();
  const hash = (randVal + 1).toString(36).substring(2, 2 + len);
  // console.log('getRandomHashString:', randVal, '->', hash);
  return hash;
}

/** quoteHtmlAttr -- quote all invalid characters for html */
export function quoteHtmlAttr(str: string, preserveCR?: boolean) {
  const crValue = preserveCR ? '&#13;' : '\n';
  return (
    String(str) // Forces the conversion to string
      .replace(/&/g, '&amp;') // This MUST be the 1st replacement
      .replace(/'/g, '&apos;') // The 4 other predefined entities, required
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // You may add other replacements here for HTML only (but it's not
      // necessary). Or for XML, only if the named entities are defined in its
      // DTD.
      .replace(/\r\n/g, crValue) // Must be before the next replacement
      .replace(/[\r\n]/g, crValue)
  );
}

export function ucFirst(str: string) {
  const c = str.substring(0, 1);
  const rest = str.substring(1);
  return c.toUpperCase() + rest;
}
