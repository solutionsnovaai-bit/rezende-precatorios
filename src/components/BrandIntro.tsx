import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import BrandLogo from './BrandLogo'

const ease = [0.22, 1, 0.36, 1] as const

export default function BrandIntro({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [logoReady, setLogoReady] = useState(false)
  const completed = useRef(false)
  const complete = () => {
    if (completed.current) return
    completed.current = true
    onComplete()
  }
  useEffect(() => {
    if (reduced) { onComplete(); return }
    let cancelled = false
    let minimumTimer = 0
    const hero = new Image()
    hero.src = window.matchMedia('(max-width: 768px)').matches ? '/images/hero-mobile.webp' : '/images/hero-desktop.webp'
    const logo = new Image()
    logo.src = '/images/logo-original.webp'
    const logoDecoded = logo.decode().then(() => { if (!cancelled) setLogoReady(true) })
    const finish = () => {
      if (!cancelled && !completed.current) { completed.current = true; onComplete() }
    }
    const minimumDuration = new Promise<void>(resolve => { minimumTimer = window.setTimeout(resolve, 2800) })
    Promise.allSettled([hero.decode(), logoDecoded, document.fonts.ready, minimumDuration]).then(finish)
    const timeout = window.setTimeout(finish, 4000)
    return () => { cancelled = true; clearTimeout(minimumTimer); clearTimeout(timeout) }
  }, [onComplete, reduced])

  return <motion.div className="brand-intro-v2" role="status" aria-label="Preparando o site da Rezende" initial={false} exit={{ clipPath: 'inset(0 0 100% 0 round 0px)' }} transition={{ duration: reduced ? 0 : 0.85, ease }}>
    <div className="intro-top"><button onClick={complete}>Pular abertura <ArrowUpRight size={16} /></button></div>
    <div className="intro-brand-film">
      <div className="intro-logo-space">
        <motion.div className="intro-logo-reveal" initial={{ clipPath: 'inset(0 100% 0 0)', y: 14, scale: 0.965, rotateX: 6 }} animate={logoReady ? { clipPath: 'inset(0 0% 0 0)', y: 0, scale: 1, rotateX: 0 } : {}} transition={{ duration: 1.5, delay: 0.18, ease }}><BrandLogo /></motion.div>
        <motion.div className="intro-logo-light" aria-hidden="true" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={logoReady ? { clipPath: ['inset(0 100% 0 0)', 'inset(0 40% 0 30%)', 'inset(0 0% 0 100%)'] } : {}} transition={{ duration: 0.95, delay: 1.35, ease }}><BrandLogo decorative /></motion.div>
      </div>
      <motion.p className="intro-brand-caption" aria-hidden="true" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7, ease }}>Seu direito. Novas possibilidades.</motion.p>
    </div>
  </motion.div>
}
