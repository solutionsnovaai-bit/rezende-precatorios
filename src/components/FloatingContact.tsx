import { MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { COMPANY } from '../content'
import BrandIcon from './BrandIcon'

export const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || COMPANY.whatsapp).replace(/\D/g, '')
export const whatsappUrl = /^\d{10,15}$/.test(whatsappNumber)
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de conversar com a Rezende sobre meu precatório.')}`
  : ''

export default function FloatingContact() {
  return <motion.a className={`contact-bubble ${whatsappUrl ? 'is-whatsapp' : ''}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} href={whatsappUrl || '#contato'} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined} aria-label={whatsappUrl ? 'Conversar com a Rezende no WhatsApp (abre em nova aba)' : `Conversar com ${COMPANY.name}`}>
    <span className="contact-bubble-label">{whatsappUrl ? 'Fale pelo WhatsApp' : 'Vamos conversar?'}</span><span className="contact-bubble-symbol">{whatsappUrl ? <BrandIcon brand="whatsapp" /> : <MessageCircle size={29} strokeWidth={1.65} />}</span>
  </motion.a>
}
