export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateShortcode(code) {
  return /^[a-zA-Z0-9]{3,10}$/.test(code);
}
