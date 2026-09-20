import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Copy, FileCheck2, Handshake, Mail, Menu, ShieldCheck, X } from 'lucide-react'
import { COMPANY, faqs, processSteps } from './content'
import BrandIntro from './components/BrandIntro'
import Logo, { BrandFilters } from './components/BrandLogo'
import Gallery from './components/AutoGallery'
import { HeroWord, WordRibbon, PhotoEssay } from './components/MotionScenes'
import FloatingContact from './components/FloatingContact'
import BrandIcon from './components/BrandIcon'
import { MotionPreferencesProvider, useMotionPreferences } from './hooks/useMotionPreferences'
import { useSceneActivity } from './hooks/useSceneActivity'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { aboutSizes, imageSrcSet } from './assets'

const ease = [0.22, 1, 0.36, 1] as const

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { reduced } = useMotionPreferences()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.85, delay, ease }}>{children}</motion.div>
}

function Header({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const menuButton = useRef<HTMLButtonElement>(null)
  const instagramLink = useRef<HTMLAnchorElement>(null)
  const menuPanel = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => scrollY.on('change', y => setScrolled(y > 32)), [scrollY])
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = menuPanel.current?.querySelector<HTMLAnchorElement>('a')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
      if (e.key === 'Tab') {
        const elements = [instagramLink.current, menuButton.current, ...Array.from(menuPanel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[]
        const i = elements.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && i <= 0) { e.preventDefault(); elements.at(-1)?.focus() }
        else if (!e.shiftKey && i === elements.length - 1) { e.preventDefault(); elements[0]?.focus() }
      }
    }
    const mq = window.matchMedia('(min-width: 901px)')
    const onWide = () => { if (mq.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onWide) }
  }, [open])
  const links = [{ id: 'possibilidades', name: 'Possibilidades' }, { id: 'como-funciona', name: 'Como funciona' }, { id: 'sobre', name: 'A Rezende' }]
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-is-open' : ''}`}>
    <a className="brand-link" href="#inicio" aria-label="Rezende, início" onClick={() => setOpen(false)}><Logo /></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{links.map(l => <a href={`#${l.id}`} key={l.id}>{l.name}</a>)}</nav>
    <div className="header-actions">
      <a href="#contato" className="header-contact" aria-label="Vamos conversar"><span className="contact-label-full">Vamos conversar</span><span className="contact-label-short">Conversar</span><ArrowUpRight size={17} /></a>
      <a ref={instagramLink} className="header-instagram" href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Rezende (abre em nova aba)" title={COMPANY.instagramHandle}><BrandIcon brand="instagram" /></a>
      <button ref={menuButton} className="menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav ref={menuPanel} id="mobile-navigation" className="mobile-nav" data-lenis-prevent aria-label="Navegação móvel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      <span className="eyebrow">SEU PRÓXIMO CAPÍTULO</span>
      {links.map((l, i) => <a href={`#${l.id}`} key={l.id} onClick={() => setOpen(false)}><small>0{i + 1}</small>{l.name}<ArrowUpRight /></a>)}
      <a href="#contato" onClick={() => setOpen(false)}><small>04</small>Vamos conversar<ArrowUpRight /></a>
      <p>Confiança para decidir.<br />{' '}Liberdade para viver.</p>
    </motion.nav>}</AnimatePresence>
  </header>
}

function Hero({ ready }: { ready: boolean }) {
  const { reduced } = useMotionPreferences()
  const heroRef = useRef<HTMLElement>(null)
  const active = useSceneActivity(heroRef)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { stiffness: 65, damping: 24, mass: 1.2 })
  const y = useSpring(mouseY, { stiffness: 65, damping: 24, mass: 1.2 })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, 100])
  const move = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse' || !window.matchMedia('(min-width: 901px)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX / r.width - 0.5) * 30)
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 20)
  }
  return <section id="inicio" className="hero" ref={heroRef} onPointerMove={move} onPointerLeave={() => { mouseX.set(0); mouseY.set(0) }}>
    <motion.div className="hero-art" style={reduced ? {} : { x, y }}>
      <motion.picture style={reduced ? {} : { y: scrollOffset }}>
        <source media="(max-width: 768px)" srcSet="/images/hero-mobile.webp" />
        <img src="/images/hero-desktop.webp" alt="Logotipo original Rezende aplicado em relevo sobre uma superfície clara" width="1672" height="941" fetchPriority="high" />
      </motion.picture>
    </motion.div>
    <div className="hero-content">
      <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}><span className="gold-line" />ANTECIPAÇÃO DE PRECATÓRIOS</motion.div>
      <h1 aria-label="Seu tempo. Sua próxima conquista.">
        {['Seu tempo.', 'Sua próxima'].map((line, i) => <span className="line-mask" aria-hidden="true" key={line}><motion.span initial={reduced ? false : { y: '110%' }} animate={ready ? { y: 0 } : {}} transition={{ delay: 0.15 + i * 0.13, duration: 1.05, ease }}>{line}</motion.span></span>)}
        <HeroWord ready={ready} active={active} />
      </h1>
      <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.65, duration: 0.8 }}>
        <p>Transforme seu precatório em novas possibilidades.<br className="desktop-break" /> E comece a viver o que não precisa ficar para depois.</p>
        <a className="button button-dark" href="#contato"><span>Antecipar meu precatório</span><ArrowUpRight size={20} /></a>
        <a className="hero-secondary" href="#como-funciona">Entenda como funciona <ArrowDown size={14} /></a>
      </motion.div>
    </div>
    <span className="hero-caption">EXPERIÊNCIA QUE GERA CONFIANÇA.</span>
    <a className="scroll-invitation" href="#possibilidades"><span>DESCUBRA O QUE VEM A SEGUIR</span><ArrowDown size={17} /></a>
    <span className="hero-index" aria-hidden="true">01 — UM NOVO TEMPO</span>
  </section>
}

function TrustStrip() {
  return <div className="trust-strip">
    <div><ShieldCheck /><span>Transparência<br />{' '}<strong>em cada etapa.</strong></span></div>
    <div><FileCheck2 /><span>Formalização<br />{' '}<strong>por escritura pública.</strong></span></div>
    <div><Handshake /><span>Atendimento<br />{' '}<strong>de pessoa para pessoa.</strong></span></div>
    <a href="#sobre">Conheça a Rezende <ArrowUpRight size={19} /></a>
  </div>
}

function Process() {
  const [active, setActive] = useState(0)
  const step = processSteps[active]
  const { reduced } = useMotionPreferences()
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? 3 : (active + (e.key === 'ArrowDown' ? 1 : 3)) % 4
    setActive(next)
    document.getElementById(`step-tab-${next}`)?.focus()
  }
  return <section id="como-funciona" className="process-section wrap section-space">
    <Reveal className="section-heading"><span className="eyebrow">SIMPLES DE ENTENDER. SEGURO PARA DECIDIR.</span><h2>Clareza do primeiro contato<br />{' '}ao seu <em>próximo passo.</em></h2></Reveal>
    <div className="process-grid">
      <Reveal className="process-tabs" delay={0.1}><div role="tablist" aria-label="Etapas da antecipação" aria-orientation="vertical" onKeyDown={onKey}>{processSteps.map((s, i) => <button key={s.title} id={`step-tab-${i}`} className={`process-tab ${active === i ? 'is-active' : ''}`} role="tab" aria-selected={active === i} aria-controls="process-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)}><span className="step-number">0{i + 1}</span><span>{s.title}</span><ArrowUpRight size={23} /></button>)}</div><p>Você participa de cada decisão.<br />{' '}A nossa equipe acompanha cada etapa.</p></Reveal>
      <Reveal className="process-detail" delay={0.2}><div role="tabpanel" id="process-panel" aria-labelledby={`step-tab-${active}`} tabIndex={0}>
        <div className="process-detail-top"><span className="eyebrow">ETAPA 0{active + 1} / 04</span><FileCheck2 size={27} strokeWidth={1.3} /></div>
        <AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}><h3>{step.label}</h3><p>{step.text}</p><ul>{step.points.map(p => <li key={p}><Check size={16} />{p}</li>)}</ul></motion.div></AnimatePresence>
        <a href="#contato" className="text-link text-link-light">Começar uma conversa <ArrowUpRight size={18} /></a>
      </div></Reveal>
    </div>
  </section>
}

function About() {
  const { reduced } = useMotionPreferences()
  return <section id="sobre" className="about-section">
    <div className="about-grid wrap">
      <Reveal className="about-photo"><div className="about-image-frame"><motion.img initial={reduced ? false : { scale: 1.075 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.45, ease }} src="/images/tempo.webp" srcSet={imageSrcSet("tempo")} sizes={aboutSizes} decoding="async" alt="Um casal compartilha um momento de carinho e café à mesa" width="1448" height="1086" loading="lazy" /></div><div className="experience-badge"><strong>10<span>+</span></strong><span>ANOS DE EXPERIÊNCIA<br />{' '}EM INVESTIMENTOS E<br />{' '}ANTECIPAÇÃO DE CRÉDITOS</span></div></Reveal>
      <Reveal className="about-content" delay={0.15}><span className="eyebrow">MUITO ALÉM DE UMA NEGOCIAÇÃO</span><h2>O seu direito<br />{' '}tem uma história.<br />{' '}<em>A gente respeita.</em></h2><p className="about-lead">Por trás de cada precatório, existe uma vida que continua acontecendo.</p><p>A Rezende é especializada na compra de precatórios e reúne mais de 10 anos de experiência em investimentos e antecipação de créditos. Nosso trabalho é aproximar o seu direito de crédito das possibilidades que fazem sentido para você, hoje.</p><p>Com atendimento próximo, análise individual e condições claras, conduzimos a negociação com a transparência que uma decisão importante merece.</p><a className="text-link" href="#contato">Conte com a nossa experiência <ArrowUpRight size={18} /></a></Reveal>
    </div>
    <div className="brand-statement" aria-hidden="true"><span>Confiança para decidir.</span><em>Liberdade para viver.</em></div>
  </section>
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const { reduced } = useMotionPreferences()
  return <section className="faq-section wrap section-space" id="duvidas"><Reveal className="faq-heading"><span className="eyebrow">SEM DÚVIDAS PELO CAMINHO</span><h2>Uma boa decisão<br />{' '}começa com<br />{' '}<em>uma boa conversa.</em></h2><a href="#contato" className="text-link">Tire sua dúvida com a Rezende <ArrowUpRight size={18} /></a></Reveal><div className="faq-list">{faqs.map((faq, i) => <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={faq.question}><h3><button id={`faq-button-${i}`} aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{faq.question}</span><ChevronDown size={20} /></button></h3><motion.div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-button-${i}`} initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }} style={{ overflow: 'hidden' }} inert={open !== i}><p>{faq.answer}</p></motion.div></div>)}</div></section>
}

function Contact() {
  const readyRef = useRef<HTMLDivElement>(null)
  const { reduced } = useMotionPreferences()
  const [draft, setDraft] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [emailLink, setEmailLink] = useState('')
  const [invalid, setInvalid] = useState(false)
  useEffect(() => {
    if (draft && readyRef.current) {
      readyRef.current.focus({ preventScroll: true })
      readyRef.current.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
  }, [draft, reduced])
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (name.length < 3 || message.length < 10) { setInvalid(true); return }
    setInvalid(false)
    const body = `Olá, equipe Rezende. Gostaria de conversar sobre meu precatório.\n\nNome: ${name}\nE-mail: ${data.get('email')}\nTelefone: ${data.get('phone') || 'Não informado'}\n\nMensagem:\n${message}`
    setDraft(body)
    setEmailLink(`mailto:${COMPANY.email}?subject=${encodeURIComponent('Solicitação de análise de precatório')}&body=${encodeURIComponent(body)}`)
  }
  const copy = async () => {
    if (!draft) return
    try { await navigator.clipboard.writeText(draft); setCopied(true); setCopyError(false) } catch { setCopyError(true) }
  }
  return <section id="contato" className="contact-section">
    <div className="contact-grid wrap">
      <Reveal className="contact-copy"><span className="eyebrow">O PRIMEIRO PASSO PODE SER HOJE.</span><h2>Vamos transformar<br />{' '}<em>a espera</em><br />{' '}em possibilidades?</h2><p>Conte um pouco sobre o seu momento.<br />{' '}Nossa equipe está pronta para conversar.</p><a className="contact-email" href={`mailto:${COMPANY.email}`}><Mail size={21} /><span>{COMPANY.email}</span><ArrowUpRight size={20} /></a><div className="contact-note"><ShieldCheck size={21} /><span>Uma conversa transparente.<br />{' '}Uma decisão que continua sendo sua.</span></div></Reveal>
      <Reveal className="contact-form-wrap" delay={0.15}>
        {!draft ? <form onSubmit={submit} className="contact-form"><div className="form-heading"><span>Conte com a Rezende.</span><span className="eyebrow">VAMOS COMEÇAR</span></div><div className="field"><label htmlFor="contact-name">Seu nome completo <span>*</span></label><input id="contact-name" name="name" autoComplete="name" required minLength={3} maxLength={120} placeholder="Como podemos chamar você?" /></div><div className="form-row"><div className="field"><label htmlFor="contact-email">Seu e-mail <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={160} placeholder="voce@exemplo.com" /></div><div className="field"><label htmlFor="contact-phone">Telefone</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={25} pattern="[0-9+\(\)\s.\-]{8,25}" placeholder="(11) 99999-9999" title="Informe um telefone válido com DDD" /></div></div><div className="field"><label htmlFor="contact-message">Como podemos ajudar? <span>*</span></label><textarea id="contact-message" name="message" required minLength={10} maxLength={1500} rows={3} placeholder="Conte sobre o seu precatório e o que você deseja saber." /></div>{invalid && <p className="form-error" role="alert">Preencha seu nome e uma mensagem com pelo menos 10 caracteres.</p>}<p className="form-info">Preparamos sua mensagem para envio pelo seu aplicativo de e-mail. Não inclua documentos ou dados bancários neste primeiro contato.</p><button className="button button-gold" type="submit"><span>Preparar minha solicitação</span><ArrowUpRight size={20} /></button><p className="form-footnote">Seus dados serão incluídos apenas na mensagem que você decidir enviar.</p></form> : <div className="contact-ready" role="status" ref={readyRef} tabIndex={-1}><div className="ready-icon"><Check size={28} /></div><span className="eyebrow">MENSAGEM PREPARADA</span><h3>Só falta enviar.</h3><p>Abra seu aplicativo de e-mail, confira a mensagem e confirme o envio para a equipe Rezende.</p><a className="button button-gold" href={emailLink}><span>Abrir e-mail para enviar</span><ArrowUpRight size={20} /></a><button className="copy-message" onClick={copy}><Copy size={16} />{copied ? 'Mensagem copiada' : 'Copiar minha mensagem'}</button>{copyError && <p>Selecione e copie a mensagem abaixo.</p>}<details><summary>Ver minha mensagem</summary><pre>{draft}</pre></details><button className="edit-message" onClick={() => { setDraft(null); setCopied(false); setCopyError(false) }}>Preencher outra solicitação</button><p className="form-footnote">A mensagem ainda não foi enviada. O envio é concluído no seu e-mail.</p></div>}
      </Reveal>
    </div>
  </section>
}

function Footer() {
  const { paused, toggle } = useMotionPreferences()
  return <footer className="site-footer wrap"><div className="footer-main"><a href="#inicio" aria-label="Voltar ao início"><Logo /></a><p>Confiança para decidir.<br />{' '}<em>Liberdade para viver.</em></p><div className="footer-actions"><a className="footer-instagram" href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Rezende (abre em nova aba)"><BrandIcon brand="instagram" /><span>{COMPANY.instagramHandle}</span></a><a href="#inicio" className="back-top">VOLTAR AO TOPO <ArrowUpRight size={19} /></a></div></div><div className="footer-bottom"><span>© 2026 Rezende Precatórios. Todos os direitos reservados.</span><span>CNPJ: {COMPANY.cnpj}</span><a href={`mailto:${COMPANY.email}`}>Fale com a Rezende <ArrowUpRight size={13} /></a></div><button className="motion-toggle" onClick={toggle} aria-pressed={paused}>{paused ? 'Retomar movimento' : 'Pausar movimento'}</button><p className="footer-legal">A antecipação está sujeita à análise do crédito, da documentação e à formalização. Valores e prazos são definidos na proposta e no contrato.</p></footer>
}

function Site() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  useSmoothScroll(!loading && !menuOpen)
  const complete = useCallback(() => setLoading(false), [])
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  useEffect(() => {
    if (!loading) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [loading])
  return <>
    <BrandFilters />
    <AnimatePresence>{loading && <BrandIntro onComplete={complete} />}</AnimatePresence>
    <div inert={loading} style={{ '--reveal-state': loading ? 'paused' : 'running' } as CSSProperties}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} />
      <Header open={menuOpen} setOpen={setMenuOpen} />
      <main id="conteudo">
        <Hero ready={!loading} />
        <TrustStrip />
        <section className="intro-section wrap section-space" id="possibilidades"><Reveal><span className="eyebrow">SEU DIREITO. SUAS POSSIBILIDADES.</span><h2>Há coisas que<br />{' '}<em>não podem esperar.</em></h2></Reveal><Reveal className="intro-copy" delay={0.2}><p>Estar com quem importa. Conhecer um novo lugar. Tirar um plano do papel. A vida não segue o calendário de um precatório.</p><p>Com a Rezende, você conhece uma alternativa para antecipar esse crédito com condições claras, atendimento próximo e liberdade para decidir.</p><a className="text-link" href="#como-funciona">Descubra como dar o próximo passo <ArrowUpRight size={18} /></a></Reveal></section>
        <WordRibbon />
        <Gallery />
        <Process />
        <About />
        <PhotoEssay />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {!loading && !menuOpen && <FloatingContact />}
    </div>
  </>
}

export default function App() {
  return <MotionPreferencesProvider><Site /></MotionPreferencesProvider>
}
