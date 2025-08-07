// composicoes.js
// consumo = coeficiente por unidade da etapa (m², ml, m³)

window.COMPOSICOES = [
  {
    etapaId: "alicerce",
    titulo: "Alicerce",
    unidadeBase: "m²",
    opcoes: {
      "Lastro de brita + impermeabilização": [
        { item: "Brita 1 (m³)", unidade: "m³", consumo: 0.080 },
        { item: "Areia média (m³)", unidade: "m³", consumo: 0.030 },
        { item: "Cimento (kg)", unidade: "kg", consumo: 3.000 },
        { item: "Manta/primer impermeabilizante (L)", unidade: "L", consumo: 0.100 }
      ],
      "Sapata corrida (concreto magro)": [
        { item: "Brita 1 (m³)", unidade: "m³", consumo: 0.100 },
        { item: "Areia média (m³)", unidade: "m³", consumo: 0.080 },
        { item: "Cimento (kg)", unidade: "kg", consumo: 7.000 }
      ]
    }
  },
  {
    etapaId: "estrutura",
    titulo: "Estrutura",
    unidadeBase: "m³",
    opcoes: {
      "Concreto estrutural (fck 25)": [
        { item: "Brita 1 (m³)", unidade: "m³", consumo: 0.80 },
        { item: "Areia média (m³)", unidade: "m³", consumo: 0.45 },
        { item: "Cimento (kg)", unidade: "kg", consumo: 320 }
      ],
      "Concreto usinado (m³)": [
        { item: "Concreto usinado (m³)", unidade: "m³", consumo: 1.00 }
      ]
    }
  },
  {
    etapaId: "alvenaria",
    titulo: "Alvenaria",
    unidadeBase: "m²",
    opcoes: {
      "Bloco cerâmico 9x19x39": [
        { item: "Tijolo 9x19x39 (un)", unidade: "un", consumo: 27.00 },
        { item: "Argamassa (m³)", unidade: "m³", consumo: 0.035 }
      ],
      "Bloco de concreto 14x19x39": [
        { item: "Bloco de concreto 14x19x39 (un)", unidade: "un", consumo: 12.50 },
        { item: "Argamassa (m³)", unidade: "m³", consumo: 0.030 }
      ]
    }
  },
  {
    etapaId: "reboco",
    titulo: "Revestimento (Chapisco/Emboço/Reboco)",
    unidadeBase: "m²",
    opcoes: {
      "Reboco interno": [
        { item: "Cimento (kg)", unidade: "kg", consumo: 6.0 },
        { item: "Areia fina (m³)", unidade: "m³", consumo: 0.050 }
      ],
      "Reboco externo": [
        { item: "Cimento (kg)", unidade: "kg", consumo: 7.0 },
        { item: "Areia média (m³)", unidade: "m³", consumo: 0.055 },
        { item: "Hidrofugante/impermeabilizante (L)", unidade: "L", consumo: 0.050 }
      ],
      "Chapisco + Emboço": [
        { item: "Cimento (kg)", unidade: "kg", consumo: 8.0 },
        { item: "Areia média (m³)", unidade: "m³", consumo: 0.055 }
      ]
    }
  },
  {
    etapaId: "contrapiso",
    titulo: "Contrapiso",
    unidadeBase: "m²",
    opcoes: {
      "Cimento+Areia (tradicional)": [
        { item: "Cimento (kg)", unidade: "kg", consumo: 7.0 },
        { item: "Areia média (m³)", unidade: "m³", consumo: 0.060 }
      ],
      "Argamassa industrializada": [
        { item: "Argamassa ensacada (saco)", unidade: "saco", consumo: 0.22 }
      ]
    }
  },
  {
    etapaId: "instalacoes",
    titulo: "Instalações (hidráulica/elétrica)",
    unidadeBase: "ml",
    opcoes: {
      "Eletroduto + caixas (embutido)": [
        { item: "Eletroduto PVC 3/4\" (m)", unidade: "m", consumo: 1.00 },
        { item: "Caixa 4x2 (un)", unidade: "un", consumo: 0.05 }
      ],
      "Esgoto DN100 (linha principal)": [
        { item: "Cano esgoto 100mm (m)", unidade: "m", consumo: 1.00 },
        { item: "Joelho 100mm (un)", unidade: "un", consumo: 0.05 }
      ]
    }
  },
  {
    etapaId: "pintura",
    titulo: "Pintura",
    unidadeBase: "m²",
    opcoes: {
      "Acrílica interna (2 demãos + massa)": [
        { item: "Tinta acrílica (L)", unidade: "L", consumo: 0.300 },
        { item: "Massa corrida (kg)", unidade: "kg", consumo: 0.400 },
        { item: "Selador acrílico (L)", unidade: "L", consumo: 0.100 }
      ],
      "Acrílica externa": [
        { item: "Tinta acrílica (L)", unidade: "L", consumo: 0.350 },
        { item: "Selador acrílico (L)", unidade: "L", consumo: 0.120 }
      ],
      "Textura acrílica": [
        { item: "Textura acrílica (kg)", unidade: "kg", consumo: 1.200 }
      ]
    }
  },
  {
    etapaId: "forro",
    titulo: "Forro",
    unidadeBase: "m²",
    opcoes: {
      "Forro PVC": [
        { item: "Forro PVC (m²)", unidade: "m²", consumo: 1.000 }
      ]
    }
  },
  {
    etapaId: "cobertura",
    titulo: "Cobertura",
    unidadeBase: "m²",
    opcoes: {
      "Telha fibrocimento": [
        { item: "Telha fibrocimento (m²)", unidade: "m²", consumo: 1.10 },
        { item: "Parafuso telheiro (un)", unidade: "un", consumo: 2.00 },
        { item: "Madeira serrada (m³)", unidade: "m³", consumo: 0.030 }
      ],
      "Telha trapezoidal TP40": [
        { item: "Chapa TP40 (m²)", unidade: "m²", consumo: 1.05 },
        { item: "Parafuso telheiro (un)", unidade: "un", consumo: 2.00 }
      ],
      "Telha cerâmica (americana)": [
        { item: "Telha cerâmica (m²)", unidade: "m²", consumo: 1.10 },
        { item: "Madeira serrada (m³)", unidade: "m³", consumo: 0.035 }
      ]
    }
  },
  {
    etapaId: "acabamentos",
    titulo: "Acabamentos",
    unidadeBase: "m²",
    opcoes: {
      "Piso cerâmico 60x60": [
        { item: "Piso 60x60 (m²)", unidade: "m²", consumo: 1.00 },
        { item: "Argamassa AC3 (saco)", unidade: "saco", consumo: 0.20 },
        { item: "Espaçador p/ piso (un)", unidade: "un", consumo: 10.0 }
      ],
      "Porcelanato 60x120": [
        { item: "Porcelanato 60x120 (m²)", unidade: "m²", consumo: 1.00 },
        { item: "Argamassa AC3 (saco)", unidade: "saco", consumo: 0.23 },
        { item: "Espaçador p/ piso (un)", unidade: "un", consumo: 8.0 }
      ],
      "Rejuntamento (complementar)": [
        { item: "Rejunte (kg)", unidade: "kg", consumo: 0.50 }
      ]
    }
  },
  {
    etapaId: "limpeza",
    titulo: "Limpeza final",
    unidadeBase: "m²",
    opcoes: {
      "Limpeza pós-obra (materiais)": [
        { item: "Saco de lixo 100L (un)", unidade: "un", consumo: 0.05 },
        { item: "Detergente 5L (un)", unidade: "un", consumo: 0.01 },
        { item: "Pano multiuso (un)", unidade: "un", consumo: 0.10 }
      ]
    }
  }
];
