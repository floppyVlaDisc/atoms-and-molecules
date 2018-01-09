export function multiplyByIndex(atoms, index) {
  return Object.keys(atoms).map(key => atoms[key] * index);
}
  
export function isInUpperCase(char) {
  return isString(char) && /[A-Z]/.test(char);
}

export function isInLowerCase(char) {
  return isString(char) && /[a-z]/.test(char);
}

export function isCharABracket(char) {
  return isString(char) && /[\{\}\[\]\(\)]/.test(char);
}

export function isString(char) {
  return typeof char === 'string';
}
  