// materiais.js
// Preços baseados nos itens da sua lista. Ajuste à vontade.

window.MATERIAIS = {
  // Bases
  "Cimento (kg)": { unidade: "kg", preco: 0.80 },                // 50kg ~ 40,00 → 0,80/kg
  "Areia fina (m³)": { unidade: "m³", preco: 145.00 },           // AREIA FINA M3 145,00
  "Areia média (m³)": { unidade: "m³", preco: 102.67 },          // AREIA MEDIA M3 102,67
  "Brita 1 (m³)": { unidade: "m³", preco: 99.00 },               // BRITA MT3 99,00
  "Argamassa (m³)": { unidade: "m³", preco: 320.00 },

  // Impermeabilização
  "Manta/primer impermeabilizante (L)": { unidade: "L", preco: 35.00 },
  "Hidrofugante/impermeabilizante (L)": { unidade: "L", preco: 29.90 },

  // Concreto
  "Concreto usinado (m³)": { unidade: "m³", preco: 600.44 },     // CONCRETO USINADO M3 600,44

  // Alvenaria
  "Tijolo 9x19x39 (un)": { unidade: "un", preco: 1.10 },
  "Bloco de concreto 14x19x39 (un)": { unidade: "un", preco: 3.90 },

  // Instalações
  "Eletroduto PVC 3/4\" (m)": { unidade: "m", preco: 25.00 },   // peça ~25; ajuste se usar preço por metro
  "Caixa 4x2 (un)": { unidade: "un", preco: 2.10 },              // CAIXA 4X2 PVC PR NACIONAL 2,10
  "Cano esgoto 100mm (m)": { unidade: "m", preco: 18.45 },        // aproximado do 75mm → ajuste p/ seu DN100
  "Joelho 100mm (un)": { unidade: "un", preco: 7.90 },            // JOELHO ESGOTO 90º X100MM 7,90

  // Pintura
  "Tinta acrílica (L)": { unidade: "L", preco: 22.00 },
  "Massa corrida (kg)": { unidade: "kg", preco: 4.08 },          // MASSA CORRIDA 6KG = 24,50 → 4,08/kg
  "Selador acrílico (L)": { unidade: "L", preco: 21.00 },
  "Textura acrílica (kg)": { unidade: "kg", preco: 12.00 },

  // Forro
  "Forro PVC (m²)": { unidade: "m²", preco: 35.00 },

  // Cobertura
  "Telha fibrocimento (m²)": { unidade: "m²", preco: 60.00 },
  "Chapa TP40 (m²)": { unidade: "m²", preco: 234.27 },            // CHAPA GALV/ALUZINCO TP40 6M UN 234,27 (~m²)
  "Parafuso telheiro (un)": { unidade: "un", preco: 0.85 },       // PARAFUSO TELHEIRO UN 0,85
  "Madeira serrada (m³)": { unidade: "m³", preco: 1600.00 },
  "Telha cerâmica (m²)": { unidade: "m²", preco: 95.00 },         // placeholder

  // Acabamentos
  "Piso 60x60 (m²)": { unidade: "m²", preco: 19.14 },             // PISO 60X60 VALENCIA ALGERES 19,14
  "Porcelanato 60x120 (m²)": { unidade: "m²", preco: 89.00 },     // placeholder
  "Argamassa AC3 (saco)": { unidade: "saco", preco: 23.85 },      // ARGAMASSA AC3 23,85
  "Espaçador p/ piso (un)": { unidade: "un", preco: 0.03 },
  "Rejunte (kg)": { unidade: "kg", preco: 8.90 },

  // Limpeza
  "Saco de lixo 100L (un)": { unidade: "un", preco: 1.20 },
  "Detergente 5L (un)": { unidade: "un", preco: 16.53 },          // DETERGENTE NEUTRO 5L AGE 16,53
  "Pano multiuso (un)": { unidade: "un", preco: 0.45 }
};
