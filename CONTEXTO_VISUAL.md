# Contexto Visual — Naruto Kayou Catálogo

## Referência visual já construída

O catálogo já foi desenvolvido e testado. Use como referência visual e funcional.

## Cores por raridade

```js
const RARITIES = [
  { id:"SE",  color:"#FFD700", glow:"#FFD70099", sym:"✦" },
  { id:"SP",  color:"#FF6BFF", glow:"#FF6BFF99", sym:"◈" },
  { id:"BP",  color:"#FF4444", glow:"#FF444499", sym:"⬟" },
  { id:"MR",  color:"#FF8C00", glow:"#FF8C0099", sym:"◉" },
  { id:"PU",  color:"#A259FF", glow:"#A259FF99", sym:"⬡" },
  { id:"PTR", color:"#00CFFF", glow:"#00CFFF99", sym:"◎" },
  { id:"UR",  color:"#00E5A0", glow:"#00E5A099", sym:"✸" },
  { id:"SSR", color:"#4FC3F7", glow:"#4FC3F799", sym:"❋" },
  { id:"SR",  color:"#81C784", glow:"#81C78499", sym:"◆" },
  { id:"R",   color:"#90A4AE", glow:"#90A4AE99", sym:"○" },
]
```

## URL das imagens

```
https://raw.githubusercontent.com/gustavomendesb2/naruto-kayou-cards/main/NRZ06-{RARITY}-{NUM}.jpg
```
Exemplo: `NRZ06-SE-001.jpg`, `NRZ06-PTR-010.jpg`

## Visual das cartas

- **Carta obtida**: imagem colorida + brilho (box-shadow) na cor da raridade + checkmark ✓
- **Carta não obtida**: imagem em grayscale + escurecida (filter: grayscale brightness 0.4)
- **Placeholder** (quando imagem não carrega): fundo escuro + símbolo da raridade centralizado + número + nome
- **Badge duplicata**: aparece no canto inferior direito quando count > 1, ex: ×2

## Layout

- Background: `#07071a` (azul escuro quase preto)
- Header sticky com título + contador + barra de progresso geral
- Painel de progresso por raridade (barras finas coloridas)
- Filtros: pills de raridade + pills TODAS/TENHO/FALTAM + campo de busca
- Grid: 3 colunas mobile → 5 tablet → 7-9 desktop
- Cards com aspect-ratio 7/10

## Comportamentos

- Clique/toque → toggle obtida/não obtida
- Clique no badge ×N → incrementa duplicatas
- Busca por nome ou ID (ex: "Kakashi", "SE-001")
- Dados salvos no localStorage com chave "naruto-t4w6-v3"
- Hover: scale(1.07) + mostrar nome da carta
