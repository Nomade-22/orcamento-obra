// scripts.js
(function(){
  const $ = (sel, root=document)=>root.querySelector(sel);
  const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));
  const money = (v) => (v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

  const STAGES = [
    "Fundações","Estrutura e Alvenaria","Cobertura",
    "Instalações Elétricas","Instalações Hidráulicas",
    "Revestimentos e Acabamentos","Esquadrias e Louças"
  ];

  const state = {
    activeStage: STAGES[0],
    quantities: {},
    selections: {},
    logoDataUrl: null
  };

  const tabsEl = $("#tabs");
  STAGES.forEach(stage => {
    const b = document.createElement('button');
    b.className = "tab"+(stage===state.activeStage?" active":"");
    b.textContent = stage;
    b.addEventListener('click', ()=>{
      state.activeStage = stage;
      render();
    });
    tabsEl.appendChild(b);
  });

  function renderStage(stage){
    const comp = window.COMPOSICOES[stage];
    const matGroup = window.MATERIAIS[stage];
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <h2>${stage}</h2>
      <div class="meta">
        <label class="switch"><input id="toggleStage" type="checkbox" checked> Incluir esta etapa</label>
        <label>Área (${comp.base.tipo==="area" ? "m²" : "un"}): <input id="inputArea" type="number" min="0" step="0.01" value="${state.quantities[stage]?.area ?? 0}"></label>
        <label>Metro linear (ml): <input id="inputLinear" type="number" min="0" step="0.01" value="${state.quantities[stage]?.linear ?? 0}"></label>
      </div>
      <div class="search">
        <input id="search" placeholder="Buscar item nesta etapa..." />
        <button id="clearSearch" class="btn">Limpar</button>
      </div>
      <div class="box" style="padding:0">
        <table class="rows" id="rows">
          <thead>
            <tr>
              <th class="sel">Add</th>
              <th>Material</th>
              <th>Tipo/Variante</th>
              <th class="qty">Qtd. calculada</th>
              <th>Unid.</th>
              <th>Preço unit.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody></tbody>
          <tfoot>
            <tr><td colspan="6" style="text-align:right">Subtotal</td><td id="subTotal" class="money">R$ 0,00</td></tr>
          </tfoot>
        </table>
      </div>
      <div class="stageFooter">
        <div class="muted">Unidade de referência: ${comp.base.unidadeRef}</div>
        <div><strong>Subtotal etapa: <span id="footerSubtotal" class="money">R$ 0,00</span></strong></div>
      </div>
    `;

    const tbody = $("tbody", wrap);
    const searchInput = $("#search", wrap);
    const clearBtn = $("#clearSearch", wrap);
    const toggleStage = $("#toggleStage", wrap);
    const inputArea = $("#inputArea", wrap);
    const inputLinear = $("#inputLinear", wrap);
    const recalcSubtotal = ()=>{
      let sum=0;
      $$("#rows tbody tr", wrap).forEach(tr=>{
        const price = parseFloat(tr.dataset.total||"0");
        sum += price;
      });
      $("#subTotal", wrap).textContent = money(sum);
      $("#footerSubtotal", wrap).textContent = money(sum);
    };

    inputArea.addEventListener('input', e=>{
      state.quantities[stage] = state.quantities[stage] || {};
      state.quantities[stage].area = parseFloat(e.target.value||"0");
      render();
    });
    inputLinear.addEventListener('input', e=>{
      state.quantities[stage] = state.quantities[stage] || {};
      state.quantities[stage].linear = parseFloat(e.target.value||"0");
      render();
    });

    toggleStage.addEventListener('change', e=>{
      wrap.classList.toggle('stageOff', !e.target.checked);
      renderSummary();
    });

    const entries = Object.entries(comp.itens);
    const list = entries.map(([id, meta])=>{
      const material = matGroup[id] || window.findMaterialById(id);
      return { id, meta, material };
    }).filter(x=>x.material);

    function rowFor(item){
      const {id, meta, material} = item;
      const selected = (state.selections[stage]?.[id]?.checked) || false;
      const area = state.quantities[stage]?.area || 0;
      const linear = state.quantities[stage]?.linear || 0;
      const baseQty = (window.qtyFromBase(meta.consumo, window.COMPOSICOES[stage].base.tipo, area, linear));
      const sel = (state.selections[stage]?.[id]) || {};
      const qty = (sel.qtyOverride!=null ? sel.qtyOverride : baseQty);
      const total = qty * (material.preco||0);

      const tr = document.createElement('tr');
      tr.dataset.total = String(total);
      tr.innerHTML = `
        <td class="sel"><input type="checkbox" ${selected?'checked':''}></td>
        <td><strong>${material.nome}</strong><div class="muted">${id}</div></td>
        <td>
          <select>
            <option value="">Padrão</option>
          </select>
        </td>
        <td class="qty"><input type="number" min="0" step="0.01" value="${qty.toFixed(2)}"></td>
        <td>${material.unidade}</td>
        <td class="money">${money(material.preco)}</td>
        <td class="money">${money(total)}</td>
      `;

      const selEl = $("select", tr);
      selEl.addEventListener('change', e=>{
        state.selections[stage] = state.selections[stage] || {};
        state.selections[stage][id] = {...state.selections[stage][id], variante: e.target.value, checked:true};
        render();
      });

      const cb = $("input[type=checkbox]", tr);
      cb.addEventListener('change', e=>{
        state.selections[stage] = state.selections[stage] || {};
        state.selections[stage][id] = {...state.selections[stage][id], checked: e.target.checked};
        render();
      });

      const qtyEl = $("input[type=number]", tr);
      qtyEl.addEventListener('input', e=>{
        state.selections[stage] = state.selections[stage] || {};
        const v = parseFloat(e.target.value||"0");
        state.selections[stage][id] = {...state.selections[stage][id], qtyOverride: v, checked:true};
        render();
      });

      return tr;
    }

    list.forEach(item=>tbody.appendChild(rowFor(item)));

    searchInput.addEventListener('input', ()=>{
      const q = searchInput.value.toLowerCase();
      $$("#rows tbody tr", wrap).forEach(tr=>{
        const name = tr.children[1].innerText.toLowerCase();
        tr.style.display = name.includes(q) ? "" : "none";
      });
    });
    clearBtn.addEventListener('click', ()=>{ searchInput.value=""; searchInput.dispatchEvent(new Event('input')); });

    recalcSubtotal();
    return wrap;
  }

  function renderSummary(){
    let total = 0;
    const holder = $("#summaryLines");
    holder.innerHTML = "";
    STAGES.forEach(stage=>{
      const comp = window.COMPOSICOES[stage];
      const matGroup = window.MATERIAIS[stage];
      const area = state.quantities[stage]?.area||0;
      const linear = state.quantities[stage]?.linear||0;
      let sub=0;
      if(!comp) return;
      Object.entries(comp.itens).forEach(([id, meta])=>{
        const mat = matGroup[id] || window.findMaterialById(id);
        if(!mat) return;
        const selected = state.selections[stage]?.[id]?.checked;
        if(!selected) return;
        const qty = (state.selections[stage]?.[id]?.qtyOverride!=null)
          ? state.selections[stage][id].qtyOverride
          : window.qtyFromBase(meta.consumo, comp.base.tipo, area, linear);
        sub += qty * (mat.preco || 0);
      });
      if(sub>0){
        const line = document.createElement('div');
        line.className = "line";
        line.innerHTML = `<span>${stage}</span><span class="money">${money(sub)}</span>`;
        holder.appendChild(line);
      }
      total += sub;
    });
    $("#grandTotal").textContent = money(total);
  }

  function render(){
    $$("#tabs .tab").forEach(b=>{
      b.classList.toggle("active", b.textContent===state.activeStage);
    });
    const stageEl = $("#stage");
    stageEl.innerHTML = "";
    stageEl.appendChild(renderStage(state.activeStage));
    renderSummary();
  }

  window.qtyFromBase = (consumo, tipo, area, linear)=>{
    if(tipo==="area"){ return (area||0) * (consumo||0); }
    if(tipo==="linear"){ return (linear||0) * (consumo||0); }
    return consumo||0;
  };

  window.findMaterialById = (id)=>{
    for(const g of STAGES){
      const mg = window.MATERIAIS[g];
      if(mg && mg[id]) return mg[id];
    }
    return null;
  };

  $("#btnExportPDF").addEventListener('click', async ()=>{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:"pt", format:"a4"});
    const margin = 36;
    let y = margin;

    if(state.logoDataUrl){
      try{ doc.addImage(state.logoDataUrl, "PNG", margin, y-8, 120, 48); }catch(e){ /* ignore */ }
    }
    doc.setFont("helvetica","bold");
    doc.setFontSize(16);
    doc.text("Orçamento de Materiais", margin+ (state.logoDataUrl?140:0), y+10);
    y += 40;

    STAGES.forEach(stage=>{
      const comp = window.COMPOSICOES[stage];
      if(!comp) return;
      let sub = 0;
      const lines = [];
      Object.entries(comp.itens).forEach(([id, meta])=>{
        const sel = state.selections[stage]?.[id];
        if(!sel || !sel.checked) return;
        const mat = window.findMaterialById(id);
        if(!mat) return;
        const area = state.quantities[stage]?.area||0;
        const linear = state.quantities[stage]?.linear||0;
        const qty = (sel.qtyOverride!=null) ? sel.qtyOverride : window.qtyFromBase(meta.consumo, comp.base.tipo, area, linear);
        const total = qty * (mat.preco||0);
        sub += total;
        lines.push([mat.nome, qty, mat.unidade, mat.preco, total]);
      });
      if(lines.length){
        doc.setFont("helvetica","bold");
        doc.setFontSize(12);
        doc.text(stage, margin, y); y+=14;
        doc.setFont("helvetica","normal");
        doc.setFontSize(10);
        doc.text("Material", margin, y);
        doc.text("Qtd", margin+280, y);
        doc.text("Un", margin+340, y);
        doc.text("Unit", margin+380, y);
        doc.text("Total", margin+460, y);
        y+=10;
        lines.forEach(row=>{
          const [nm, q, un, pu, tt] = row;
          if(y>760){ doc.addPage(); y = margin; }
          doc.text(String(nm).slice(0,46), margin, y);
          doc.text(String((q||0).toFixed(2)), margin+280, y, {align:"right"});
          doc.text(String(un||""), margin+340, y);
          doc.text((pu||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}), margin+380, y, {align:"right"});
          doc.text((tt||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}), margin+460, y, {align:"right"});
          y+=14;
        });
        doc.setFont("helvetica","bold");
        doc.text("Subtotal: "+ (sub||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}), margin+380, y, {align:"right"});
        y+=18;
      }
    });

    const totalTxt = $("#grandTotal").textContent || "R$ 0,00";
    doc.setLineWidth(0.5); doc.line(margin, y, 559, y); y+=14;
    doc.setFontSize(12); doc.text("Total Geral", margin, y);
    doc.setFont("helvetica","bold"); doc.text(totalTxt, 559, y, {align:"right"});

    doc.save("orcamento_materiais.pdf");
  });

  $("#btnExportExcel").addEventListener('click', ()=>{
    const wb = XLSX.utils.book_new();
    STAGES.forEach(stage=>{
      const comp = window.COMPOSICOES[stage];
      if(!comp) return;
      const rows = [["Material","Qtd","Un","Unit (R$)","Total (R$)"]];
      let sub=0;
      Object.entries(comp.itens).forEach(([id, meta])=>{
        const sel = state.selections[stage]?.[id];
        if(!sel || !sel.checked) return;
        const mat = window.findMaterialById(id);
        if(!mat) return;
        const area = state.quantities[stage]?.area||0;
        const linear = state.quantities[stage]?.linear||0;
        const qty = (sel.qtyOverride!=null) ? sel.qtyOverride : window.qtyFromBase(meta.consumo, comp.base.tipo, area, linear);
        const total = qty * (mat.preco||0);
        sub += total;
        rows.push([mat.nome, qty, mat.unidade, mat.preco, total]);
      });
      rows.push([]); rows.push(["Subtotal","", "", "", sub]);
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, stage.slice(0,31));
    });
    XLSX.writeFile(wb, "orcamento_materiais.xlsx");
  });

  $("#btnPrint").addEventListener('click', ()=>window.print());

  $("#btnReset").addEventListener('click', ()=>{
    state.quantities = {};
    state.selections = {};
    render();
  });

  $("#btnFinalize").addEventListener('click', renderSummary);

  const logoInput = $("#logoInput");
  const logoPreview = $("#logoPreview");
  logoInput.addEventListener('change', (e)=>{
    const f = e.target.files[0];
    if(!f) return;
    const ok = /image\/(png|jpeg)/i.test(f.type);
    if(!ok){ alert("Use PNG ou JPG."); return; }
    const reader = new FileReader();
    reader.onload = ()=>{
      state.logoDataUrl = reader.result;
      logoPreview.src = state.logoDataUrl;
      logoPreview.style.display = "block";
      try{ localStorage.setItem("orc_logo_data", state.logoDataUrl); }catch(e){}
    };
    reader.readAsDataURL(f);
  });

  try{
    const saved = localStorage.getItem("orc_logo_data");
    if(saved){
      state.logoDataUrl = saved;
      logoPreview.src = saved;
      logoPreview.style.display = "block";
    }
  }catch(e){}

  render();
})();