// Texto do contrato usado na tela da cliente, no download e no painel admin.
window.CT = {
  clauses: v => `<li><b>Objeto.</b> Produção de conteúdo em foto e vídeo e gestão de postagens no Instagram para a CONTRATANTE, conforme o pacote Completo descrito abaixo.</li>
  <li><b>Escopo do pacote Completo.</b>
   <ul>
    <li>10 vídeos editados e 40 fotos editadas, com tratamento de cor</li>
    <li>Captação com equipamento profissional; edição com trilha sonora e legendas</li>
    <li>Roteiro personalizado e estratégia de postagem e marketing</li>
    <li>Postagens no Instagram feitas pelo GT Studio, com estratégias de alcance e autoridade</li>
    <li>Acompanhamento de resultados do perfil e prioridade no agendamento das captações</li>
    <li>3 rodadas de ajustes após a entrega</li>
   </ul></li>
  <li><b>Valor.</b> R$ 1.000,00. Este valor é uma condição promocional de Black Friday, válida somente neste mês (novembro de 2026). A partir do mês seguinte, o pacote passa para o valor normal de R$ 1.200,00.</li>
  <li><b>Pagamento.</b> 30% de entrada (R$ 300,00), pagos antes do início dos trabalhos, e o restante (R$ 700,00) no dia 5 do mês seguinte à assinatura, que neste caso é <b id="venc">${v}</b>. Pagamento por Pix, para a chave indicada abaixo.</li>
  <li><b>Prazo.</b> Entrega em até 7 dias contados da captação, com qualidade e em formato digital pronto para as redes sociais. O prazo pode ser prorrogado se houver atraso da CONTRATANTE em liberar locais, informações ou aprovações.</li>
  <li><b>Ajustes.</b> Até 3 rodadas, referentes ao que foi captado e planejado. Captações extras, deslocamentos maiores ou produções especiais são orçados à parte.</li>
  <li><b>Obrigações da CONTRATANTE.</b> Combinar datas e horários das captações, liberar acesso aos imóveis e ao perfil do Instagram e responder às aprovações em tempo razoável.</li>
  <li><b>Uso do material.</b> Os arquivos finais podem ser usados pela CONTRATANTE em suas redes e divulgação. O GT Studio pode manter cópia do material para fins de arquivo.</li>
  <li><b>Cancelamento.</b> Em caso de cancelamento do pacote pela CONTRATANTE, o valor já pago não será devolvido.</li>
  <li><b>Foro.</b> Fica eleito o foro da comarca de Arapongas/PR para resolver dúvidas deste contrato.</li>`,
  doc: (r, G) => {
    const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
    const v = String(r.vencimento).split("-").reverse().join("/");
    const q = r.quando || new Date(r.criado_em).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Contrato GT Studio · ${esc(r.empresa)}</title><style>body{font:15px/1.65 Georgia,serif;max-width:720px;margin:30px auto;padding:0 18px;color:#2a251f;background:#fff}h1{font-size:24px}h2{font-size:17px;border-left:3px solid #b8452e;padding-left:8px;margin-top:26px}li{margin-bottom:8px}ul{color:#6b6150}</style></head><body>
<h1>Contrato de prestação de serviços · GT Studio</h1>
<h2>Partes</h2>
<p><b>CONTRATADO:</b> Gabriel Antonio Rocha Mota, responsável pelo GT Studio, em Arapongas/PR.</p>
<p><b>CONTRATANTE:</b> ${esc(r.empresa)}, CNPJ ${esc(r.cnpj)}, representada por ${esc(r.representante)}, CPF ${esc(r.cpf)}. Endereço: ${esc(r.endereco)}. Contato: ${esc(r.contato)}.</p>
<h2>Cláusulas</h2><ol>${window.CT.clauses(v)}</ol>
<h2>Pagamento via Pix</h2><p>Chave: ${esc((G || {}).PIX_CHAVE)} · Favorecido: ${esc((G || {}).PIX_FAVORECIDO)}</p>
<h2>Assinatura</h2><p>Assinado eletronicamente por <b>${esc(r.assinatura)}</b> em ${esc(q)}.</p></body></html>`;
  }
};
