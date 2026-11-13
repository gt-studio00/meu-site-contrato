// Texto do contrato, montado a partir dos valores definidos no painel admin.
window.CT = {
  esc: s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])),
  brl: n => "R$ " + Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  calc: t => { const entrada = Math.round(t.valor * t.entrada_pct) / 100; return { entrada, resto: Math.round((t.valor - entrada) * 100) / 100 }; },
  itens: t => String(t.itens || "").split("\n").map(s => s.trim()).filter(Boolean),
  clauses: (t, due) => {
    const e = CT.esc, b = CT.brl, k = CT.calc(t), full = t.entrada_pct >= 100;
    const pag = full
      ? `Pagamento integral de ${b(t.valor)} antes do início dos trabalhos.`
      : `${t.entrada_pct}% de entrada (${b(k.entrada)}), pagos antes do início dos trabalhos, e o restante (${b(k.resto)}) no dia ${t.vencimento_dia} do mês seguinte à assinatura, que neste caso é <b id="venc">${e(due)}</b>.`;
    return `<li><b>Objeto.</b> Produção de conteúdo em foto e vídeo para a CONTRATANTE, conforme o pacote ${e(t.pacote)} descrito abaixo.</li>
  <li><b>Escopo do pacote ${e(t.pacote)}.</b><ul>${CT.itens(t).map(i => `<li>${e(i)}</li>`).join("")}<li>${t.ajustes} rodada(s) de ajustes após a entrega</li></ul></li>
  <li><b>Valor.</b> ${b(t.valor)}.${t.promo_texto ? " " + e(t.promo_texto) : ""}</li>
  <li><b>Pagamento.</b> ${pag} Pagamento por Pix, para a chave indicada abaixo.</li>
  <li><b>Prazo.</b> Entrega em até ${t.prazo_dias} dias contados da captação, com qualidade e em formato digital pronto para as redes sociais. O prazo pode ser prorrogado se houver atraso da CONTRATANTE em liberar locais, informações ou aprovações.</li>
  <li><b>Ajustes.</b> Até ${t.ajustes} rodada(s), referentes ao que foi captado e planejado. Captações extras, deslocamentos maiores ou produções especiais são orçados à parte.</li>
  <li><b>Obrigações da CONTRATANTE.</b> Combinar datas e horários das captações, liberar acesso aos locais e aos perfis necessários e responder às aprovações em tempo razoável.</li>
  <li><b>Uso do material.</b> Os arquivos finais podem ser usados pela CONTRATANTE em suas redes e divulgação. O GT Studio pode manter cópia do material para fins de arquivo.</li>
  <li><b>Cancelamento.</b> Em caso de cancelamento do pacote pela CONTRATANTE, o valor já pago não será devolvido.</li>
  <li><b>Foro.</b> Fica eleito o foro da comarca de Arapongas/PR para resolver dúvidas deste contrato.</li>`;
  },
  doc: (r, G) => {
    const e = CT.esc; G = G || {};
    const due = r.vencimento ? String(r.vencimento).split("-").reverse().join("/") : "";
    const q = r.quando || new Date(r.assinado_em).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Contrato GT Studio · ${e(r.empresa)}</title><style>body{font:15px/1.65 Georgia,serif;max-width:720px;margin:30px auto;padding:0 18px;color:#2a251f;background:#fff}h1{font-size:24px}h2{font-size:17px;border-left:3px solid #b8452e;padding-left:8px;margin-top:26px}li{margin-bottom:8px}ul{color:#6b6150}</style></head><body>
<h1>Contrato de prestação de serviços · GT Studio</h1>
<h2>Partes</h2>
<p><b>CONTRATADO:</b> Gabriel Antonio Rocha Mota, responsável pelo GT Studio, em Arapongas/PR.</p>
<p><b>CONTRATANTE:</b> ${e(r.empresa)}, CNPJ ${e(r.cnpj)}, representada por ${e(r.representante)}, CPF ${e(r.cpf)}. Endereço: ${e(r.endereco)}. Contato: ${e(r.contato)}.</p>
<h2>Cláusulas</h2><ol>${CT.clauses(r, due)}</ol>
<h2>Pagamento via Pix</h2><p>Chave: ${e(G.PIX_CHAVE)} · Favorecido: ${e(G.PIX_FAVORECIDO)}</p>
<h2>Assinatura</h2><p>Assinado eletronicamente por <b>${e(r.assinatura)}</b> em ${e(q)}.</p></body></html>`;
  }
};
