// composicoes.js
window.COMPOSICOES = {
  "Fundações": {
    base: { tipo: "area", unidadeRef: "m² de fundação" },
    itens: {
      "cimento_50kg": { consumo: 0.12 },
      "areia_fina_m3": { consumo: 0.05 },
      "brita_m3": { consumo: 0.05 },
      "arame_recozido_kg": { consumo: 0.08 },
      "madeira_forma_maderite": { consumo: 0.02 },
      "lona_preta_m2": { consumo: 1.00 },
      "impermeabilizante_manta": { consumo: 0.20 },
      "prego_17x27_kg": { consumo: 0.02 },
      "coluna_pop_12x17": { consumo: 0.03 },
      "concreto_usinado_m3": { consumo: 0.08 }
    },
    variacoes: {
      concreto: [
        { id:"traço_1_3_3", rotulo:"Concreto obra (traço 1:3:3)", ajuste:{ "cimento_50kg": +0.02, "areia_fina_m3": +0.01, "brita_m3": +0.01 } },
        { id:"usinado", rotulo:"Concreto usinado", ajuste:{ "concreto_usinado_m3": +0.06, "cimento_50kg": -0.12, "areia_fina_m3": -0.05, "brita_m3": -0.05 } }
      ]
    }
  },

  "Estrutura e Alvenaria": {
    base: { tipo:"area", unidadeRef:"m² de parede" },
    itens: {
      "tijolo_6_furos": { consumo: 28.0 },
      "areia_assentamento_m3": { consumo: 0.04 },
      "cal_20kg": { consumo: 0.20 },
      "malha_15x15_4_2_2x3": { consumo: 0.15 },
      "arame_recozido_kg": { consumo: 0.02 },
      "prego_17x27_kg": { consumo: 0.01 }
    },
    variacoes: {
      alvenaria: [
        { id:"tijolo_6_furos", rotulo:"Tijolo cerâmico 6 furos", ajuste:{} },
        { id:"bloco_concreto_14x19x39", rotulo:"Bloco de concreto 14x19x39", ajuste:{ "tijolo_6_furos": -28, "bloco_concreto_14x19x39": +12.5, "areia_assentamento_m3": +0.01 } }
      ]
    }
  },

  "Cobertura": {
    base: { tipo:"area", unidadeRef:"m² de cobertura" },
    itens: {
      "caibro_eucalipto_5x7_5_4": { consumo: 0.10 },
      "perfil_terca_chapa14_75x40x20": { consumo: 0.08 },
      "telha_metalica_m2": { consumo: 1.05 },
      "calha_rufo_m": { consumo: 0.10 }
    },
    variacoes: {
      estrutura: [
        { id:"madeira", rotulo:"Estrutura de madeira", ajuste:{ "perfil_terca_chapa14_75x40x20": -0.08, "caibro_eucalipto_5x7_5_4": +0.12 } },
        { id:"metalica", rotulo:"Estrutura metálica (Gerdau/Arcelor)", ajuste:{ "caibro_eucalipto_5x7_5_4": -0.10, "perfil_terca_chapa14_75x40x20": +0.12 } }
      ]
    }
  },

  "Instalações Elétricas": {
    base: { tipo:"area", unidadeRef:"m² de área construída" },
    itens: {
      "cabo_flex_2_5mm_mt": { consumo: 1.2 },
      "cabo_flex_4mm_mt": { consumo: 0.5 },
      "eletroduto_pvc_3_4": { consumo: 0.20 },
      "caixa_4x2_pvc": { consumo: 0.06 },
      "disjuntor_mono_16a": { consumo: 0.008 },
      "tomada_10a": { consumo: 0.05 },
      "interruptor_simples": { consumo: 0.03 }
    },
    variacoes: {}
  },

  "Instalações Hidráulicas": {
    base: { tipo:"area", unidadeRef:"m² de área molhada" },
    itens: {
      "tubo_pvc_20mm_mt": { consumo: 0.6 },
      "joelho_20mm": { consumo: 0.12 },
      "luva_20mm": { consumo: 0.12 },
      "adesivo_pvc_175g": { consumo: 0.01 },
      "fita_vedarosca": { consumo: 0.02 },
      "caixa_dagua_2000l": { consumo: 0.002 }
    },
    variacoes: {}
  },

  "Revestimentos e Acabamentos": {
    base: { tipo:"area", unidadeRef:"m² de revestimento" },
    itens: {
      "argamassa_ac3_20kg": { consumo: 0.35 },
      "rejunte_kg": { consumo: 0.25 },
      "massa_corrida_6kg": { consumo: 0.20 },
      "massa_acrilica_25kg": { consumo: 0.04 },
      "tinta_acrilica_18l": { consumo: 0.02 },
      "piso_60x60_m2": { consumo: 1.00 },
      "rodape_metro": { consumo: 0.25 }
    },
    variacoes: {}
  },

  "Esquadrias e Louças": {
    base: { tipo:"area", unidadeRef:"m² de área construída" },
    itens: {
      "porta_interna_70x210": { consumo: 0.02 },
      "janela_angelim_120x160": { consumo: 0.008 },
      "fechadura_interna": { consumo: 0.02 },
      "dobradica_70x70_branca": { consumo: 0.04 },
      "vaso_sanitario": { consumo: 0.01 },
      "pia_inox_120": { consumo: 0.01 },
      "chuveiro": { consumo: 0.01 }
    },
    variacoes: {}
  }
};
