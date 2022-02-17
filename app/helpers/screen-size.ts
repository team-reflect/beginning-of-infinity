type ScreenSize = 'sm' | 'md' | 'lg' | 'xl'

const Dimensions: {[key: string]: number} = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const screenIs = (size: ScreenSize) => {
  if (typeof window === 'undefined') return undefined

  const dimension = Dimensions[size]

  if (!dimension) {
    throw new Error(`Unknown screen size: ${size}`)
  }

  const mediaQuery = `(min-width: ${dimension}px)`

  return window.matchMedia(mediaQuery).matches
}
