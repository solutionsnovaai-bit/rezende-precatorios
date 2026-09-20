import { useState } from 'react'

/** Display filters remove the neutral background; the supplied bitmap is untouched. */
export function BrandFilters() {
  return <svg className="brand-filters" aria-hidden="true" width="0" height="0"><defs>
    <filter id="brand-background-key" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -3.33 -3.33 -3.33 0 9.2" />
    </filter>
  </defs></svg>
}
export default function BrandLogo({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  const [loaded, setLoaded] = useState(false)
  return <span className={`brand-logo ${className}`}><img className={loaded ? 'is-loaded' : undefined} onLoad={() => setLoaded(true)} src="/images/logo-original.webp" width="1254" height="1254" alt={decorative ? '' : 'Rezende — precatórios e investimentos'} decoding="async" fetchPriority="high" /></span>
}
