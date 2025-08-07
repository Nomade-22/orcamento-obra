// scripts.js
const BRL = v => (v||0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});

function el(tag, attrs={}, html=""){
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => e.setAttribute(k,v));
  if(html) e.innerHTML = html;
  return e;
}

window.addEventListener('DOMContentLoaded', () => {
  montarAbas(COMPOSICOES);
});

function montarAbas(composicoes){
  const tabList = document.getElementById('tabList');
  const tabPanels = document.getElementById('tabPanels');
  tabList.innerHTML = ""; tabPanels.innerHTML = "";

  composicoes.forEach((etapa, idx) => {
    const b = el('button', { type:'button', 'data-tab': etapa.etapaId }, etapa.titulo);
    b.addEventListener('click', () => ativarAba(etapa.etapaId));
    if(idx===0) b.classList.add('active');
    tabList.appendChild(b);

    const p = el('div', { id: etapa.etapaId, class:'tab-panel' });
    if(idx===0) p.classList.add('active');

    const card = el('div', { class:'etapa-card' });

    const topo = el('div', { class:'linha' });
    const cb = el('input', { type:'checkbox', id:`check_${etapa.etapaId}` });
    cb.checked = true;
    topo.appendChild(cb);
    topo.appendChild(el('label', {}, `<strong>Incluir etapa</strong> &nbsp; <small>(unidade base: ${etapa.unidadeBase})</small>`));
    card.appendChild(topo);

    const grid1 = el('div', { class:'grid' });

    const selWrap = el('div');
    selWrap.appendChild(el('label', { for:`sel_${etapa.etapaId}` }, 'Tipo/Composição:'));
    const sel = el('select', { id:`sel_${etapa.etapaId}` });
    Object.keys(etapa.opcoes).forEach(nome => {
      sel.appendChild(el('option', { value:nome }, nome));
    });
    selWrap.appendChild(sel);

    const metrWrap = el('div');
    metrWrap.appendChild(el('label', { for:`metr_${etapa.etapaId}` }, `Metragem (${etapa.unidadeBase}):`));
    metrWrap.appendChild(el('input', { type:'number', id:`metr_${etapa.etapaId}`, value:'50', step:'0.01', min:'0' }));

    grid1.appendChild(selWrap);
    grid1.appendChild(metrWrap);
    card.appendChild(grid1);

    const res = el('div', { id:`res_${etapa.etapaId}`, class:'resultado' }, 'Preencha e clique em "Calcular orçamento".');
    card.appendChild(res);

    p.appendChild(card);
    tabPanels.appendChild(p);
  });
}

function ativarAba(id){
  document.querySelectorAll('.tab-list button').forEach(b=>{
    b.classList.toggle('active', b.getAttribute('data-tab')===id);
  });
  document.querySelectorAll('.tab-panel').forEach(p=>{
    p.classList.toggle('active', p.id===id);
  });
}

function calcularTudo(){
  let totalGeral = 0;
  const linhasExcel = [];

  COMPOSICOES.forEach(etapa=>{
    const incluir = document.getElementById(`check_${etapa.etapaId}`).checked;
    const metr = parseFloat((document.getElementById(`metr_${etapa.etapaId}`).value || '0').toString().replace(',','.')) || 0;
    const tipo = document.getElementById(`sel_${etapa.etapaId}`).value;
    const saida = document.getElementById(`res_${etapa.etapaId}`);

    if(!incluir || metr<=0){
      saida.textContent = "Etapa desmarcada ou metragem inválida.";
      return;
    }

    const itens = etapa.opcoes[tipo] || [];
    let subtotal = 0;
    let texto = `• ${etapa.titulo} — ${tipo}\nMetragem: ${metr} ${etapa.unidadeBase}\n\n`;

    itens.forEach(insumo=>{
      const mat = MATERIAIS[insumo.item];
      const preco = mat ? mat.preco : 0;
      const qtd = insumo.consumo * metr;
      const custo = qtd * preco;
      subtotal += custo;

      texto += `${insumo.item}: ${qtd.toFixed(3)} ${insumo.unidade} × ${BRL(preco)} = ${BRL(custo)}\n`;

      linhasExcel.push({
        Etapa: etapa.titulo,
        Tipo: tipo,
        Item: insumo.item,
        Unidade: insumo.unidade,
        Quantidade: Number(qtd.toFixed(3)),
        PrecoUnit: preco,
        Custo: Number(custo.toFixed(2))
      });
    });

    texto += `\nSubtotal: ${BRL(subtotal)}`;
    totalGeral += subtotal;
    saida.textContent = texto;
  });

  document.getElementById('totalGeral').textContent = `Total geral: ${BRL(totalGeral)}`;

  window.__ULTIMO_EXCEL__ = { linhas: linhasExcel, total: totalGeral };
  window.__ULTIMO_PDF__ = gerarTextoPDF();
}

function gerarTextoPDF(){
  let blocos = [];
  COMPOSICOES.forEach(etapa=>{
    const res = document.getElementById(`res_${etapa.etapaId}`);
    if(res && res.textContent && !res.textContent.startsWith("Etapa desmarcada")){
      blocos.push(res.textContent);
    }
  });
  const total = document.getElementById('totalGeral')?.textContent || '';
  return `${blocos.join("\n\n-----------------------------\n\n")}\n\n${total}`;
}

function exportarPDF(){
  if(!window.jspdf){ alert("Biblioteca jsPDF não carregada."); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const margem = 36, largura = 523;
  doc.setFont('helvetica','normal');
  doc.setFontSize(12);

  const texto = window.__ULTIMO_PDF__ || gerarTextoPDF();
  const linhas = doc.splitTextToSize(texto, largura);
  doc.text(linhas, margem, margem);
  doc.save('orcamento.pdf');
}

function exportarExcel(){
  if(!window.XLSX){ alert("Biblioteca XLSX não carregada."); return; }
  const data = window.__ULTIMO_EXCEL__ || {linhas:[], total:0};
  const linhas = data.linhas;

  const ws1 = XLSX.utils.json_to_sheet(linhas);
  const ws2 = XLSX.utils.json_to_sheet([{ "Total Geral (BRL)": data.total }]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws1, "Detalhes");
  XLSX.utils.book_append_sheet(wb, ws2, "Resumo");
  XLSX.writeFile(wb, "orcamento.xlsx");
}
