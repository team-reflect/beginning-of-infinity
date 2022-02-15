export function castArray(value: any) {
  return Array.isArray(value) ? value : [value]
}
