import { LinkButton } from "./ui/LinkButton"

export function NotFound({ voltarPara = "/", voltarLabel = "Voltar para a home" }: { voltarPara?: string; voltarLabel?: string }) {
  return (
    <section className="bg-cream-50 px-5 py-32 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <span className="text-xs font-bold tracking-[0.25em] text-gold-600 uppercase">Ops</span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          Não encontramos esse imóvel
        </h1>
        <p className="mt-4 text-base text-ink-950/60">Ele pode ter sido vendido ou o link mudou de endereço.</p>
        <LinkButton to={voltarPara} className="mt-8 inline-flex">
          {voltarLabel}
        </LinkButton>
      </div>
    </section>
  )
}
