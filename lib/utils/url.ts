export const join = (base: string, path: string) => new URL(path, base).href
