"""
Naruto Kayou - Download v3
- Corrige numeração do Capsule Corp para SSR, SR e R
- Suporte para adicionar novas coleções
- Tenta mais variações de URL
"""

import urllib.request
import os
import time

OUTPUT_DIR = "naruto-cards"
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.google.com/",
    "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
}

# ─── CONFIGURAÇÃO DE COLEÇÕES ─────────────────────────────────────────────────
# Para adicionar uma nova coleção, copie o bloco T4W6 e ajuste os números
# num_ccg = número global no Capsule Corp (cumulativo de todos os sets)

COLLECTIONS = {

    "T4W6": [
        # SE: global 013-016
        ("SE","001","013"),("SE","002","014"),("SE","003","015"),("SE","004","016"),
        # SP: global 067-070
        ("SP","001","067"),("SP","002","068"),("SP","003","069"),("SP","004","070"),
        # BP: global 022-028
        ("BP","001","022"),("BP","002","023"),("BP","003","024"),("BP","004","025"),
        ("BP","005","026"),("BP","006","027"),("BP","007","028"),
        # MR: global 051-056
        ("MR","001","051"),("MR","002","052"),("MR","003","053"),
        ("MR","004","054"),("MR","005","055"),("MR","006","056"),
        # PU: global 001-008
        *[("PU",f"{i:03d}",f"{i:03d}") for i in range(1,9)],
        # PTR: global 001-020
        *[("PTR",f"{i:03d}",f"{i:03d}") for i in range(1,21)],
        # UR: global 103-117
        *[("UR",f"{i:03d}",f"{102+i:03d}") for i in range(1,16)],
        # SSR: global 121-144
        *[("SSR",f"{i:03d}",f"{120+i:03d}") for i in range(1,25)],
        # SR: global 109-128
        *[("SR",f"{i:03d}",f"{108+i:03d}") for i in range(1,21)],
        # R: global 061-110
        *[("R",f"{i:03d}",f"{60+i:03d}") for i in range(1,51)],
    ],

    # Exemplo para adicionar T4W7 no futuro:
    # "T4W7": [
    #     ("SE","001","017"), ...
    # ],
}

def build_urls(collection, rarity, num_local, num_ccg):
    n = num_local
    g = num_ccg
    r = rarity
    # Prefixo da coleção ex: NRZ06, NRZ07
    wave_map = {"T4W6":"NRZ06","T4W7":"NRZ07","T4W5":"NRZ05"}
    prefix = wave_map.get(collection, "NRZ06")

    return [
        # Capsule Corp (numeração global)
        f"https://capsulecorpgear.com/wp-content/uploads/{r}-{g}-only-ccg.jpg",
        # Capsule Corp sem zero à esquerda
        f"https://capsulecorpgear.com/wp-content/uploads/{r}-{int(g)}-only-ccg.jpg",
        # Grand Anime Card padrão
        f"https://grandanimecard.com/cdn/shop/files/{prefix}-{r}-{n}.jpg",
        f"https://grandanimecard.com/cdn/shop/files/{r}-{n}.jpg",
        # Variações sem zero
        f"https://capsulecorpgear.com/wp-content/uploads/{r}-{int(n)}-only-ccg.jpg",
    ]

def download(url, dest):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=12) as resp:
        if resp.status == 200:
            data = resp.read()
            if len(data) > 5000:
                with open(dest, "wb") as f:
                    f.write(data)
                return True
    return False

# ─── MAIN ─────────────────────────────────────────────────────────────────────

# Escolhe qual coleção baixar (ou "ALL" para todas)
TARGET = "T4W6"  # Mude para "ALL" para baixar todas as coleções

collections_to_run = COLLECTIONS if TARGET == "ALL" else {TARGET: COLLECTIONS[TARGET]}

total_ok = total_fail = total_skip = 0

for collection, cards in collections_to_run.items():
    print(f"\n{'='*50}")
    print(f"  Coleção: {collection} ({len(cards)} cartas)")
    print(f"{'='*50}")

    ok = fail = skip = 0

    for rarity, num_local, num_ccg in cards:
        filename = f"NRZ06-{rarity}-{num_local}.jpg"
        dest = os.path.join(OUTPUT_DIR, filename)

        if os.path.exists(dest):
            skip += 1
            continue

        urls = build_urls(collection, rarity, num_local, num_ccg)
        downloaded = False

        for url in urls:
            try:
                if download(url, dest):
                    source = url.split("/")[2]
                    print(f"  ✓  {filename}  [{source}]")
                    downloaded = True
                    ok += 1
                    time.sleep(0.15)
                    break
            except Exception:
                continue

        if not downloaded:
            print(f"  ✗  {filename}")
            fail += 1

    print(f"\n  ✓ {ok}  ⊘ {skip}  ✗ {fail}")
    total_ok += ok
    total_fail += fail
    total_skip += skip

print(f"\n{'='*50}")
print(f"TOTAL: ✓ {total_ok}  ⊘ {total_skip}  ✗ {total_fail}")
print(f"Pasta: ./{OUTPUT_DIR}/  ({total_ok + total_skip} imagens)")

if total_ok + total_skip > 0:
    print("""
--- PRÓXIMOS PASSOS ---
1. cd naruto-cards
2. git add .
3. git commit -m "add card images"
4. git push
""")
