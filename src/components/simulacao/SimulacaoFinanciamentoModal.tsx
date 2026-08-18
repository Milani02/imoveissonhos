import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { simulacaoFinanciamento, waLink, whatsappNumbers } from "../../lib/content"

interface FormState {
  renda: string
  estadoCivil: string
  fgts: string
  jaPossuiImovel: string
  faixaValor: string
  cidade: string
  entrada: string
  idade: string
}

const initialState: FormState = {
  renda: "",
  estadoCivil: "",
  fgts: "",
  jaPossuiImovel: "",
  faixaValor: "",
  cidade: "",
  entrada: "",
  idade: "",
}

// Emojis via \u{...} (não literais): evita corrupção de caracteres multi-byte
// observada na transferência do módulo pelo dev server neste ambiente.
const EMOJI = {
  wave: "\u{1F44B}", // 👋
  house: "\u{1F3E1}", // 🏡
  clipboard: "\u{1F4CB}", // 📋
  money: "\u{1F4B0}", // 💰
  ring: "\u{1F48D}", // 💍
  bank: "\u{1F3E6}", // 🏦
  key: "\u{1F511}", // 🔑
  banknote: "\u{1F4B5}", // 💵
  pin: "\u{1F4CD}", // 📍
  card: "\u{1F4B3}", // 💳
  cake: "\u{1F382}", // 🎂
  smile: "\u{1F60A}", // 😊
} as const

function buildMessage(f: FormState): string {
  return `Olá! ${EMOJI.wave} Quero fazer uma *simulação de financiamento* ${EMOJI.house}

${EMOJI.clipboard} *Minhas informações:*

${EMOJI.money} Renda familiar mensal: ${f.renda}
${EMOJI.ring} Estado civil: ${f.estadoCivil}
${EMOJI.bank} FGTS para usar na compra: ${f.fgts}
${EMOJI.key} Já possui imóvel no nome: ${f.jaPossuiImovel}
${EMOJI.banknote} Faixa de valor do imóvel: ${f.faixaValor}
${EMOJI.pin} Cidade desejada: ${f.cidade}
${EMOJI.card} Valor de entrada: ${f.entrada}
${EMOJI.cake} Idade: ${f.idade}

Aguardo o contato! ${EMOJI.smile}`
}

const fieldClass =
  "w-full rounded-xl border border-ink-950/12 bg-white px-3.5 py-2.5 text-sm text-ink-950 placeholder:text-ink-950/35 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 focus:outline-none"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink-950/80">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

export function SimulacaoFinanciamentoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(initialState)

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    window.open(waLink(buildMessage(form), whatsappNumbers.geral), "_blank", "noopener,noreferrer")
    setForm(initialState)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-cream-50 p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold text-ink-950">{simulacaoFinanciamento.titulo}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-950/50 transition-colors hover:bg-ink-950/5 hover:text-ink-950"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-ink-950/60">{simulacaoFinanciamento.subtitulo}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field label="Qual é sua renda familiar mensal?">
                <input
                  required
                  value={form.renda}
                  onChange={(e) => set("renda", e.target.value)}
                  placeholder="Ex: R$ 3.500"
                  className={fieldClass}
                />
              </Field>

              <Field label="Você é solteiro, casado ou possui outro estado civil?">
                <select
                  required
                  value={form.estadoCivil}
                  onChange={(e) => set("estadoCivil", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {simulacaoFinanciamento.estadosCivis.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Possui FGTS para utilizar na compra?">
                <select required value={form.fgts} onChange={(e) => set("fgts", e.target.value)} className={fieldClass}>
                  <option value="" disabled>
                    Selecione
                  </option>
                  {simulacaoFinanciamento.simOuNao.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Você já possui algum imóvel em seu nome?">
                <select
                  required
                  value={form.jaPossuiImovel}
                  onChange={(e) => set("jaPossuiImovel", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {simulacaoFinanciamento.simOuNao.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Qual faixa de valor de imóvel você está procurando?">
                <select
                  required
                  value={form.faixaValor}
                  onChange={(e) => set("faixaValor", e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {simulacaoFinanciamento.faixasValor.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Em qual cidade você deseja comprar seu imóvel?">
                <select required value={form.cidade} onChange={(e) => set("cidade", e.target.value)} className={fieldClass}>
                  <option value="" disabled>
                    Selecione
                  </option>
                  {simulacaoFinanciamento.cidades.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>

              <Field label="Quanto você pretende dar de entrada?">
                <input
                  required
                  value={form.entrada}
                  onChange={(e) => set("entrada", e.target.value)}
                  placeholder="Ex: R$ 15.000 ou 10%"
                  className={fieldClass}
                />
              </Field>

              <Field label="Qual é sua idade?">
                <input
                  required
                  type="number"
                  min={18}
                  max={100}
                  value={form.idade}
                  onChange={(e) => set("idade", e.target.value)}
                  className={fieldClass}
                />
              </Field>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-400 sm:text-base"
              >
                {simulacaoFinanciamento.ctaEnviar}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
