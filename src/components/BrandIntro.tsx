import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

// Every part is a mask over the same supplied bitmap. No logo paths are drawn.
const parts = [
  { name: 'frame', delay: 0.18, x: -12, y: 12 },
  { name: 'bar-one', delay: 0.5, x: 0, y: 24 },
  { name: 'bar-two', delay: 0.66, x: 0, y: 28 },
  { name: 'bar-three', delay: 0.82, x: 0, y: 32 },
  { name: 'tick', delay: 0.95, x: -4, y: -4 },
  { name: 'arrow', delay: 1.05, x: -18, y: 18 },
  { name: 'wordmark', delay: 1.35, x: 0, y: 14 },
  { name: 'gold', delay: 1.55, x: -12, y: 0 },
  { name: 'signature', delay: 1.72, x: 0, y: 9 },
]

export default function BrandIntro({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const completed = useRef(false)
  const complete = () => {
    if (completed.current) return
    completed.current = true
    onComplete()
  }

  useEffect(() => {
    if (reduced) { onComplete(); return }
    let frame = 0
    let cancelled = false
    let assetsReady = false
    let lastProgress = -1
    const started = performance.now()
    const hero = new Image()
    hero.src = window.matchMedia('(max-width: 768px)').matches ? '/images/hero-mobile.webp' : '/images/hero-desktop.webp'
    const logo = new Image()
    logo.src = '/images/logo-original.webp'
    Promise.allSettled([hero.decode(), logo.decode(), document.fonts.ready]).then(() => {
      if (!cancelled) assetsReady = true
    })
    const finish = () => {
      if (!cancelled && !completed.current) { completed.current = true; onComplete() }
    }
    // This timer is independent of RAF: the intro can never trap a hidden tab.
    const timeout = window.setTimeout(finish, 4500)
    const tick = (now: number) => {
      if (cancelled || completed.current) return
      const elapsed = now - started
      const next = Math.min(assetsReady ? 100 : 94, Math.floor(elapsed / 29))
      if (next !== lastProgress) { lastProgress = next; setProgress(next) }
      if (assetsReady && elapsed >= 3100) { finish(); return }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => { cancelled = true; cancelAnimationFrame(frame); clearTimeout(timeout) }
  }, [onComplete, reduced])

  return <motion.div className="loader brand-intro" role="status" aria-label="Preparando o site da Rezende" initial={false} exit={{ y: '-101%' }} transition={{ duration: 0.8, ease }}>
    <div className="intro-architecture" aria-hidden="true"><span /><span /><span /><span /></div>
    <div className="intro-topline" aria-hidden="true"><span>REZENDE</span><span>PRECATÓRIOS E INVESTIMENTOS</span></div>
    <button className="loader-skip" onClick={complete}>Pular abertura <ArrowUpRight size={16} /></button>
    <div className="intro-composition">
      <div className="logo-formation" role="img" aria-label="Logo original Rezende: estrutura, crescimento e um novo caminho">
        {parts.map(part => <motion.div key={part.name} className={`formation-layer part-${part.name}`} aria-hidden="true" initial={{ opacity: 0, x: part.x, y: part.y }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: part.delay, duration: 0.72, ease }}>
          <span className="brand-logo"><img src="/images/logo-original.webp" width="1254" height="1254" alt="" fetchPriority="high" /></span>
        </motion.div>)}
        <motion.div className="formation-layer formation-complete" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.35, duration: 0.3 }}>
          <span className="brand-logo"><img src="/images/logo-original.webp" width="1254" height="1254" alt="" /></span>
        </motion.div>
      </div>
      <div className="intro-story" aria-hidden="true">
        {['Uma história.', 'Novas escolhas.', 'O seu próximo capítulo.'].map((text, i) => <motion.span key={text} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.65, duration: 0.65, ease }}>{text}</motion.span>)}
      </div>
      <div className="loader-line"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: progress / 100 }} transition={{ duration: 0.12 }} /></div>
    </div>
    <div className="loader-bottom"><span>ABRINDO NOVAS<br />POSSIBILIDADES.</span><span className="loader-progress" aria-hidden="true">{String(progress).padStart(2, '0')}<small>%</small></span><span>O TEMPO É SEU.<br />O FUTURO TAMBÉM.</span></div>
  </motion.div>
}
