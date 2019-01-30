const deepCopy = x => {
  const out = Array.isArray(x) ? [] : {}

  // eslint-disable-next-line no-restricted-syntax
  for (const key in x) {
    // eslint-disable-next-line no-prototype-builtins
    if (x.hasOwnProperty(key)) {
      const temp = x[key]
      if (temp === null) {
        out[key] = null
      } else {
        out[key] = typeof temp === 'object' ? deepCopy(temp) : temp
      }
    }
  }

  return out
}

export default deepCopy
