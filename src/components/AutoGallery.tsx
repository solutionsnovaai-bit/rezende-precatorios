import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { chapters } from '../content'
import { imageSrcSet, gallerySizes } from '../assets'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { ImageFilmstrip } from './MotionScenes'

const ease = [0.22, 1, 0.36, 1] as const
const INTERVAL = 3400

export default function AutoGallery() {
  const { reduced } = useMotionPreferences()
  const [[index, direction], setSlide] = useState([0, 1])
  const [focused, setFocused] = useState(false)
  const [holding, setHolding] = useState(false)
  const galleryRef = useRef<HTMLElement>(null)
  const visible = useSceneActivity(galleryRef)
  const start = useRef<{ x: number; y: number } | null>(null)
  const running = visible && !reduced && !focused && !holding
  const go = useCallback((delta: number) => setSlide(([i]) => [(i + delta + chapters.length) % chapters.length, delta]), [])
  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => go(1), INTERVAL)
    return () => clearTimeout(timer)
  }, [running, index, go])
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (!visible || connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType || '')) return
    const timer = window.setTimeout(() => {
      const next = chapters[(index + 1) % chapters.length]
      const image = new Image()
      image.decoding = 'async'
      image.sizes = gallerySizes
      image.srcset = imageSrcSet(next.image)
      image.src = `/images/${next.image}.webp`
    }, 300)
    return () => clearTimeout(timer)
  }, [visible, index])
  const slide = chapters[index]
  return <section className="gallery-section gallery-v2" aria-label="Possibilidades para o seu próximo capítulo" ref={galleryRef}>
    <div className="gallery-heading wrap">
      <motion.div initial={reduced ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}><span className="eyebrow">O QUE VOCÊ FARIA COM ESSE NOVO TEMPO?</span><h2>O próximo capítulo<br />{' '}pode ser <em>extraordinário.</em></h2></motion.div>
      <div className="gallery-intro"><p>Seu precatório é um direito.<br />{' '}O que ele pode tornar possível<br />{' '}é uma escolha sua.</p><span className="gallery-small-line" /></div>
    </div>
    <div className="gallery-stage" tabIndex={0} role="region" aria-roledescription="carrossel" aria-label="Inspirações; imagens automáticas. Use as setas do teclado ou arraste para navegar." onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) } }} onFocus={() => setFocused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false) }}>
      <div className="gallery-visual" onPointerDown={e => { start.current = { x: e.clientX, y: e.clientY }; setHolding(true); e.currentTarget.setPointerCapture(e.pointerId) }} onPointerUp={e => { if (start.current) { const dx = e.clientX - start.current.x; const dy = e.clientY - start.current.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1) } start.current = null; setHolding(false) }} onPointerCancel={() => { start.current = null; setHolding(false) }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img key={slide.image} custom={direction} variants={{ enter: (d: number) => ({ opacity: 0, scale: 1.065, x: reduced ? 0 : d * 70 }), center: { opacity: 1, scale: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -45 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : 0.85, ease }} src={`/images/${slide.image}.webp`} srcSet={imageSrcSet(slide.image)} sizes={gallerySizes} decoding="async" width="1448" height="1086" alt={slide.alt} loading="lazy" draggable={false} />
        </AnimatePresence>
        <span className="image-label">A VIDA TEM OUTROS PLANOS PARA VOCÊ.</span>
      </div>
      <div className="gallery-story" aria-live="off">
        <span className="chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}<small> / 09</small></span>
        <motion.div className="gallery-story-copy" key={index} initial={reduced ? false : { opacity: 0.35, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}><span className="eyebrow">{slide.category}</span><h3>{slide.title}</h3><p>{slide.text}</p></motion.div>
        <a className="text-link text-link-light" href="#contato">Vamos falar sobre o seu futuro <ArrowUpRight size={18} /></a>
        <div className="gallery-timeline" aria-hidden="true">{chapters.map((c, i) => <span className={i < index ? 'is-complete' : ''} key={c.image}>{i === index && <i key={`${index}-${running}`} style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? 'running' : 'paused' }} />}</span>)}</div>
      </div>
    </div>
    <ImageFilmstrip />
    <p className="gallery-disclaimer wrap">Imagens ilustrativas de possibilidades. A proposta de antecipação é individual e depende da análise do crédito.</p>
  </section>
}
