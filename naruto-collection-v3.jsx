import { useState, useEffect, useCallback } from "react";

const CARD_DB = [{"id":"SE","label":"SE","color":"#FFD700","glow":"#FFD70099","bg":"linear-gradient(135deg,#1a1400,#3d2e00,#1a1400)","cards":[{"num":"001","name":"Naruto & Sasuke","id":"SE-001"},{"num":"002","name":"Kakashi & Obito","id":"SE-002"},{"num":"003","name":"Minato & Kushina","id":"SE-003"},{"num":"004","name":"Itachi Uchiha","id":"SE-004"}]},{"id":"SP","label":"SP","color":"#FF6BFF","glow":"#FF6BFF99","bg":"linear-gradient(135deg,#1a001a,#3d003d,#1a001a)","cards":[{"num":"001","name":"Naruto Uzumaki","id":"SP-001"},{"num":"002","name":"Sasuke Uchiha","id":"SP-002"},{"num":"003","name":"Sakura Haruno","id":"SP-003"},{"num":"004","name":"Kakashi Hatake","id":"SP-004"}]},{"id":"BP","label":"BP","color":"#FF4444","glow":"#FF444499","bg":"linear-gradient(135deg,#1a0000,#3d0000,#1a0000)","cards":[{"num":"001","name":"Team 7","id":"BP-001"},{"num":"002","name":"Naruto Rasengan","id":"BP-002"},{"num":"003","name":"Sasuke Chidori","id":"BP-003"},{"num":"004","name":"Minato Flash","id":"BP-004"},{"num":"005","name":"Obito & Rin","id":"BP-005"},{"num":"006","name":"Young Kakashi","id":"BP-006"},{"num":"007","name":"Itachi & Sasuke","id":"BP-007"}]},{"id":"MR","label":"MR","color":"#FF8C00","glow":"#FF8C0099","bg":"linear-gradient(135deg,#1a0a00,#3d1f00,#1a0a00)","cards":[{"num":"001","name":"Naruto 4-Tails","id":"MR-001"},{"num":"002","name":"Sasuke Curse Mark","id":"MR-002"},{"num":"003","name":"Jiraiya Sage","id":"MR-003"},{"num":"004","name":"Tsunade Strength","id":"MR-004"},{"num":"005","name":"Orochimaru","id":"MR-005"},{"num":"006","name":"Itachi Sharingan","id":"MR-006"}]},{"id":"PU","label":"PU","color":"#A259FF","glow":"#A259FF99","bg":"linear-gradient(135deg,#0d001a,#220038,#0d001a)","cards":[{"num":"001","name":"Kakashi Hatake","id":"PU-001"},{"num":"002","name":"Rock Lee","id":"PU-002"},{"num":"003","name":"Neji Hyuga","id":"PU-003"},{"num":"004","name":"Hinata Hyuga","id":"PU-004"},{"num":"005","name":"Shikamaru Nara","id":"PU-005"},{"num":"006","name":"Gaara","id":"PU-006"},{"num":"007","name":"Temari","id":"PU-007"},{"num":"008","name":"Kankuro","id":"PU-008"}]},{"id":"PTR","label":"PTR","color":"#00CFFF","glow":"#00CFFF99","bg":"linear-gradient(135deg,#00141a,#002d3d,#00141a)","cards":[{"num":"001","name":"PTR-001","id":"PTR-001"},{"num":"002","name":"PTR-002","id":"PTR-002"},{"num":"003","name":"PTR-003","id":"PTR-003"},{"num":"004","name":"PTR-004","id":"PTR-004"},{"num":"005","name":"PTR-005","id":"PTR-005"},{"num":"006","name":"PTR-006","id":"PTR-006"},{"num":"007","name":"PTR-007","id":"PTR-007"},{"num":"008","name":"PTR-008","id":"PTR-008"},{"num":"009","name":"PTR-009","id":"PTR-009"},{"num":"010","name":"PTR-010","id":"PTR-010"},{"num":"011","name":"PTR-011","id":"PTR-011"},{"num":"012","name":"PTR-012","id":"PTR-012"},{"num":"013","name":"PTR-013","id":"PTR-013"},{"num":"014","name":"PTR-014","id":"PTR-014"},{"num":"015","name":"PTR-015","id":"PTR-015"},{"num":"016","name":"PTR-016","id":"PTR-016"},{"num":"017","name":"PTR-017","id":"PTR-017"},{"num":"018","name":"PTR-018","id":"PTR-018"},{"num":"019","name":"PTR-019","id":"PTR-019"},{"num":"020","name":"PTR-020","id":"PTR-020"}]},{"id":"UR","label":"UR","color":"#00E5A0","glow":"#00E5A099","bg":"linear-gradient(135deg,#001a0f,#003d22,#001a0f)","cards":[{"num":"001","name":"Naruto Uzumaki","id":"UR-001"},{"num":"002","name":"Sasuke Uchiha","id":"UR-002"},{"num":"003","name":"Sakura Haruno","id":"UR-003"},{"num":"004","name":"Kakashi Hatake","id":"UR-004"},{"num":"005","name":"Minato Namikaze","id":"UR-005"},{"num":"006","name":"Itachi Uchiha","id":"UR-006"},{"num":"007","name":"Jiraiya","id":"UR-007"},{"num":"008","name":"Tsunade","id":"UR-008"},{"num":"009","name":"Orochimaru","id":"UR-009"},{"num":"010","name":"Gaara","id":"UR-010"},{"num":"011","name":"Rock Lee","id":"UR-011"},{"num":"012","name":"Neji Hyuga","id":"UR-012"},{"num":"013","name":"Hinata Hyuga","id":"UR-013"},{"num":"014","name":"Shikamaru Nara","id":"UR-014"},{"num":"015","name":"Obito Uchiha","id":"UR-015"}]},{"id":"SSR","label":"SSR","color":"#4FC3F7","glow":"#4FC3F799","bg":"linear-gradient(135deg,#00101a,#002033,#00101a)","cards":[{"num":"001","name":"SSR-001","id":"SSR-001"},{"num":"002","name":"SSR-002","id":"SSR-002"},{"num":"003","name":"SSR-003","id":"SSR-003"},{"num":"004","name":"SSR-004","id":"SSR-004"},{"num":"005","name":"SSR-005","id":"SSR-005"},{"num":"006","name":"SSR-006","id":"SSR-006"},{"num":"007","name":"SSR-007","id":"SSR-007"},{"num":"008","name":"SSR-008","id":"SSR-008"},{"num":"009","name":"SSR-009","id":"SSR-009"},{"num":"010","name":"SSR-010","id":"SSR-010"},{"num":"011","name":"SSR-011","id":"SSR-011"},{"num":"012","name":"SSR-012","id":"SSR-012"},{"num":"013","name":"SSR-013","id":"SSR-013"},{"num":"014","name":"SSR-014","id":"SSR-014"},{"num":"015","name":"SSR-015","id":"SSR-015"},{"num":"016","name":"SSR-016","id":"SSR-016"},{"num":"017","name":"SSR-017","id":"SSR-017"},{"num":"018","name":"SSR-018","id":"SSR-018"},{"num":"019","name":"SSR-019","id":"SSR-019"},{"num":"020","name":"SSR-020","id":"SSR-020"},{"num":"021","name":"SSR-021","id":"SSR-021"},{"num":"022","name":"SSR-022","id":"SSR-022"},{"num":"023","name":"SSR-023","id":"SSR-023"},{"num":"024","name":"SSR-024","id":"SSR-024"}]},{"id":"SR","label":"SR","color":"#81C784","glow":"#81C78499","bg":"linear-gradient(135deg,#001a00,#003300,#001a00)","cards":[{"num":"001","name":"SR-001","id":"SR-001"},{"num":"002","name":"SR-002","id":"SR-002"},{"num":"003","name":"SR-003","id":"SR-003"},{"num":"004","name":"SR-004","id":"SR-004"},{"num":"005","name":"SR-005","id":"SR-005"},{"num":"006","name":"SR-006","id":"SR-006"},{"num":"007","name":"SR-007","id":"SR-007"},{"num":"008","name":"SR-008","id":"SR-008"},{"num":"009","name":"SR-009","id":"SR-009"},{"num":"010","name":"SR-010","id":"SR-010"},{"num":"011","name":"SR-011","id":"SR-011"},{"num":"012","name":"SR-012","id":"SR-012"},{"num":"013","name":"SR-013","id":"SR-013"},{"num":"014","name":"SR-014","id":"SR-014"},{"num":"015","name":"SR-015","id":"SR-015"},{"num":"016","name":"SR-016","id":"SR-016"},{"num":"017","name":"SR-017","id":"SR-017"},{"num":"018","name":"SR-018","id":"SR-018"},{"num":"019","name":"SR-019","id":"SR-019"},{"num":"020","name":"SR-020","id":"SR-020"}]},{"id":"R","label":"R","color":"#90A4AE","glow":"#90A4AE99","bg":"linear-gradient(135deg,#0a0a12,#15152a,#0a0a12)","cards":[{"num":"001","name":"R-001","id":"R-001"},{"num":"002","name":"R-002","id":"R-002"},{"num":"003","name":"R-003","id":"R-003"},{"num":"004","name":"R-004","id":"R-004"},{"num":"005","name":"R-005","id":"R-005"},{"num":"006","name":"R-006","id":"R-006"},{"num":"007","name":"R-007","id":"R-007"},{"num":"008","name":"R-008","id":"R-008"},{"num":"009","name":"R-009","id":"R-009"},{"num":"010","name":"R-010","id":"R-010"},{"num":"011","name":"R-011","id":"R-011"},{"num":"012","name":"R-012","id":"R-012"},{"num":"013","name":"R-013","id":"R-013"},{"num":"014","name":"R-014","id":"R-014"},{"num":"015","name":"R-015","id":"R-015"},{"num":"016","name":"R-016","id":"R-016"},{"num":"017","name":"R-017","id":"R-017"},{"num":"018","name":"R-018","id":"R-018"},{"num":"019","name":"R-019","id":"R-019"},{"num":"020","name":"R-020","id":"R-020"},{"num":"021","name":"R-021","id":"R-021"},{"num":"022","name":"R-022","id":"R-022"},{"num":"023","name":"R-023","id":"R-023"},{"num":"024","name":"R-024","id":"R-024"},{"num":"025","name":"R-025","id":"R-025"},{"num":"026","name":"R-026","id":"R-026"},{"num":"027","name":"R-027","id":"R-027"},{"num":"028","name":"R-028","id":"R-028"},{"num":"029","name":"R-029","id":"R-029"},{"num":"030","name":"R-030","id":"R-030"},{"num":"031","name":"R-031","id":"R-031"},{"num":"032","name":"R-032","id":"R-032"},{"num":"033","name":"R-033","id":"R-033"},{"num":"034","name":"R-034","id":"R-034"},{"num":"035","name":"R-035","id":"R-035"},{"num":"036","name":"R-036","id":"R-036"},{"num":"037","name":"R-037","id":"R-037"},{"num":"038","name":"R-038","id":"R-038"},{"num":"039","name":"R-039","id":"R-039"},{"num":"040","name":"R-040","id":"R-040"},{"num":"041","name":"R-041","id":"R-041"},{"num":"042","name":"R-042","id":"R-042"},{"num":"043","name":"R-043","id":"R-043"},{"num":"044","name":"R-044","id":"R-044"},{"num":"045","name":"R-045","id":"R-045"},{"num":"046","name":"R-046","id":"R-046"},{"num":"047","name":"R-047","id":"R-047"},{"num":"048","name":"R-048","id":"R-048"},{"num":"049","name":"R-049","id":"R-049"},{"num":"050","name":"R-050","id":"R-050"}]}];

const ALL_CARDS = CARD_DB.flatMap(r => r.cards.map(c => ({...c, rarity:r.id, color:r.color, glow:r.glow, bg:r.bg})));
const RARITY_MAP = Object.fromEntries(CARD_DB.map(r => [r.id, r]));
const STORAGE_KEY = "naruto-t4w6-v3";

// Visual card art patterns based on rarity
const SYMBOLS = { SE:"✦", SP:"◈", BP:"⬟", MR:"◉", PU:"⬡", PTR:"◎", UR:"✸", SSR:"❋", SR:"◆", R:"○" };

function CardFace({ card, owned }) {
  const r = RARITY_MAP[card.rarity];
  const sym = SYMBOLS[card.rarity] || "○";
  const shortName = card.name.length > 13 ? card.name.slice(0,12)+"…" : card.name;
  
  return (
    <div style={{
      width:"100%", height:"100%",
      background: owned ? r.bg : "linear-gradient(135deg,#0a0a0e,#111118,#0a0a0e)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"space-between",
      padding:"8% 5% 7%",
      position:"relative", overflow:"hidden",
      borderRadius:6,
    }}>
      {/* Corner decorations */}
      <div style={{position:"absolute",top:4,left:4,width:8,height:8,border:`1px solid ${owned?r.color+"66":"#ffffff11"}`,borderRight:"none",borderBottom:"none"}}/>
      <div style={{position:"absolute",top:4,right:4,width:8,height:8,border:`1px solid ${owned?r.color+"66":"#ffffff11"}`,borderLeft:"none",borderBottom:"none"}}/>
      <div style={{position:"absolute",bottom:4,left:4,width:8,height:8,border:`1px solid ${owned?r.color+"66":"#ffffff11"}`,borderRight:"none",borderTop:"none"}}/>
      <div style={{position:"absolute",bottom:4,right:4,width:8,height:8,border:`1px solid ${owned?r.color+"66":"#ffffff11"}`,borderLeft:"none",borderTop:"none"}}/>

      {/* Glow ring when owned */}
      {owned && <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 40%, ${r.color}18 0%, transparent 70%)`,pointerEvents:"none"}}/>}

      {/* Rarity badge top */}
      <div style={{
        fontSize:9, fontWeight:900, letterSpacing:2,
        color: owned ? r.color : "#ffffff33",
        fontFamily:"'Bebas Neue',cursive",
        textShadow: owned ? `0 0 8px ${r.color}` : "none",
      }}>{card.rarity}</div>

      {/* Central symbol */}
      <div style={{
        fontSize: card.rarity==="SE"||card.rarity==="SP"?"28px":"22px",
        color: owned ? r.color : "#ffffff18",
        textShadow: owned ? `0 0 12px ${r.color}, 0 0 24px ${r.color}66` : "none",
        lineHeight:1, textAlign:"center",
        filter: owned ? "none" : "grayscale(1)",
      }}>{sym}</div>

      {/* Card number + name */}
      <div style={{textAlign:"center", width:"100%"}}>
        <div style={{fontSize:8, color: owned ? r.color+"cc" : "#ffffff22", fontFamily:"monospace", marginBottom:2}}>
          #{card.num}
        </div>
        <div style={{
          fontSize: shortName.length > 10 ? 7 : 8,
          color: owned ? "#ffffffcc" : "#ffffff22",
          fontFamily:"'Rajdhani',sans-serif",
          lineHeight:1.2, fontWeight:600,
        }}>{shortName}</div>
      </div>
    </div>
  );
}

function CardTile({ card, owned, dupes, onToggle, onAddDupe }) {
  const [hov, setHov] = useState(false);
  const r = RARITY_MAP[card.rarity];

  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={()=>onToggle(card.id)}
      style={{
        position:"relative", borderRadius:7, overflow:"hidden", cursor:"pointer",
        transition:"transform 0.15s, box-shadow 0.15s",
        transform: hov ? "scale(1.08)" : "scale(1)",
        boxShadow: owned
          ? `0 0 ${hov?18:8}px ${r.glow}, inset 0 0 0 1px ${r.color}66`
          : `inset 0 0 0 1px #ffffff0f`,
        aspectRatio:"7/10",
      }}
    >
      <CardFace card={card} owned={owned} />

      {/* Owned checkmark */}
      {owned && (
        <div style={{position:"absolute",top:4,right:4,width:14,height:14,borderRadius:"50%",background:r.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#000",fontWeight:900,zIndex:2}}>✓</div>
      )}

      {/* Duplicate badge */}
      {owned && dupes > 1 && (
        <div onClick={e=>{e.stopPropagation();onAddDupe(card.id);}} style={{position:"absolute",bottom:4,right:4,background:"#000000cc",border:`1px solid ${r.color}`,color:r.color,fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:10,fontFamily:"monospace",cursor:"pointer",zIndex:2}}>×{dupes}</div>
      )}

      {/* Hover add hint */}
      {hov && !owned && (
        <div style={{position:"absolute",inset:0,background:"#00000055",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1}}>
          <div style={{width:24,height:24,borderRadius:"50%",border:"1.5px solid #ffffff44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#ffffff66"}}>+</div>
        </div>
      )}
    </div>
  );
}

function ProgBar({ id, label, owned, total, color }) {
  const pct = total > 0 ? (owned/total)*100 : 0;
  return (
    <div style={{marginBottom:6, display:"flex", alignItems:"center", gap:8}}>
      <div style={{width:32, fontSize:9, fontFamily:"'Bebas Neue',cursive", letterSpacing:1, color, textAlign:"right", flexShrink:0}}>{label}</div>
      <div style={{flex:1, height:4, background:"#ffffff0d", borderRadius:2, overflow:"hidden"}}>
        <div style={{width:`${pct}%`, height:"100%", background:`linear-gradient(90deg,${color}55,${color})`, borderRadius:2, transition:"width 0.4s", boxShadow:pct>0?`0 0 5px ${color}`:"none"}}/>
      </div>
      <div style={{width:28, fontSize:9, fontFamily:"monospace", color:"#ffffff44", textAlign:"right", flexShrink:0}}>{owned}/{total}</div>
    </div>
  );
}

export default function App() {
  const [owned, setOwned] = useState({});
  const [filterR, setFilterR] = useState("ALL");
  const [filterS, setFilterS] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get(STORAGE_KEY); if(r?.value) setOwned(JSON.parse(r.value)); } catch {}
      setLoaded(true);
    })();
  }, []);

  const save = useCallback(async (data) => { try { await window.storage.set(STORAGE_KEY, JSON.stringify(data)); } catch {} }, []);

  const toggle = useCallback((id) => {
    setOwned(prev => {
      const next = {...prev};
      if(!next[id]) next[id]=1; else delete next[id];
      save(next); return next;
    });
  }, [save]);

  const addDupe = useCallback((id) => {
    setOwned(prev => { const next={...prev,[id]:(prev[id]||0)+1}; save(next); return next; });
  }, [save]);

  const totalOwned = Object.keys(owned).length;
  const totalDupes = Object.values(owned).reduce((a,b)=>a+Math.max(0,b-1),0);
  const pct = Math.round(totalOwned/ALL_CARDS.length*100);

  const filtered = ALL_CARDS.filter(c => {
    if(filterR!=="ALL" && c.rarity!==filterR) return false;
    if(filterS==="OWNED" && !owned[c.id]) return false;
    if(filterS==="MISSING" && owned[c.id]) return false;
    if(search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if(!loaded) return (
    <div style={{background:"#07071a",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
      <div style={{color:"#FFD700",fontFamily:"'Bebas Neue',cursive",fontSize:22,letterSpacing:4}}>NARUTO KAYOU</div>
      <div style={{color:"#ffffff33",fontSize:11,letterSpacing:2}}>CARREGANDO…</div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#07071a",color:"#fff",fontFamily:"'Rajdhani','Trebuchet MS',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#07071a}::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:2px}
        .cgrid{display:grid;gap:6px}
        @media(max-width:380px){.cgrid{grid-template-columns:repeat(3,1fr)!important}}
        @media(min-width:381px)and(max-width:560px){.cgrid{grid-template-columns:repeat(4,1fr)!important}}
        @media(min-width:561px)and(max-width:800px){.cgrid{grid-template-columns:repeat(5,1fr)!important}}
        @media(min-width:801px)and(max-width:1100px){.cgrid{grid-template-columns:repeat(7,1fr)!important}}
        @media(min-width:1101px){.cgrid{grid-template-columns:repeat(9,1fr)!important}}
        input:focus,button:focus{outline:none}
        button{transition:all 0.12s}
      `}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(180deg,#0c0c24 0%,#07071a 100%)",borderBottom:"1px solid #ffffff08",padding:"10px 14px",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(4px)"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
            <div>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,letterSpacing:3,background:"linear-gradient(90deg,#FF6B35,#FFD700,#FF6B35)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200%"}}>NARUTO KAYOU</div>
              <div style={{fontSize:8,color:"#ffffff33",letterSpacing:2.5,marginTop:-2}}>T4W6 · NRZ06 · CHAPTER OF FORMATION</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,lineHeight:1,background:`linear-gradient(90deg,#FF6B35,#FFD700)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textShadow:"none"}}>
                {totalOwned}<span style={{fontSize:11,WebkitTextFillColor:"#ffffff22"}}>/{ALL_CARDS.length}</span>
              </div>
              <div style={{fontSize:8,color:"#ffffff33",letterSpacing:1}}>
                {pct}% completo{totalDupes>0?` · ${totalDupes}×`:""} 
              </div>
            </div>
          </div>
          {/* Master progress */}
          <div style={{height:2,background:"#ffffff0a",borderRadius:1,overflow:"hidden"}}>
            <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#FF6B35,#FFD700)",transition:"width 0.5s",boxShadow:"0 0 6px #FFD70044"}}/>
          </div>
        </div>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"10px 10px 80px"}}>

        {/* RARITY PROGRESS */}
        <div style={{background:"#0c0c22",border:"1px solid #ffffff08",borderRadius:10,padding:"10px 14px",marginBottom:10}}>
          <div style={{fontSize:9,fontFamily:"'Bebas Neue',cursive",letterSpacing:2,color:"#ffffff25",marginBottom:8}}>PROGRESSO POR RARIDADE</div>
          {CARD_DB.map(r=>(
            <ProgBar key={r.id} id={r.id} label={r.id} owned={r.cards.filter(c=>owned[c.id]).length} total={r.cards.length} color={r.color}/>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{marginBottom:10}}>
          <input
            placeholder="🔍 buscar — nome ou código (ex: Kakashi, SE-001)…"
            value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",background:"#0c0c22",border:"1px solid #ffffff12",borderRadius:8,padding:"7px 11px",color:"#fff",fontSize:12,fontFamily:"'Rajdhani',sans-serif",marginBottom:7}}
          />
          {/* Rarity pills */}
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>
            {["ALL",...CARD_DB.map(r=>r.id)].map(rid=>{
              const r=rid==="ALL"?null:RARITY_MAP[rid];
              const active=filterR===rid;
              return (
                <button key={rid} onClick={()=>setFilterR(rid)} style={{padding:"2px 9px",borderRadius:20,border:active?`1.5px solid ${r?.color||"#ffffffaa"}`:"1.5px solid #ffffff14",background:active?(r?.color||"#fff")+"18":"transparent",color:active?(r?.color||"#fff"):"#ffffff33",fontSize:10,fontFamily:"'Bebas Neue',cursive",letterSpacing:1,cursor:"pointer",boxShadow:active&&r?`0 0 8px ${r.glow}`:"none"}}>
                  {rid}
                </button>
              );
            })}
          </div>
          {/* Status + count */}
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            {["ALL","OWNED","MISSING"].map(s=>(
              <button key={s} onClick={()=>setFilterS(s)} style={{padding:"2px 9px",borderRadius:20,border:filterS===s?"1.5px solid #ffffff55":"1.5px solid #ffffff12",background:filterS===s?"#ffffff0f":"transparent",color:filterS===s?"#ffffffcc":"#ffffff2a",fontSize:9,letterSpacing:1,fontFamily:"'Bebas Neue',cursive",cursor:"pointer"}}>
                {s==="ALL"?"TODAS":s==="OWNED"?"TENHO":"FALTAM"}
              </button>
            ))}
            <span style={{marginLeft:"auto",fontSize:9,color:"#ffffff1a",fontFamily:"monospace"}}>{filtered.length} cartas</span>
          </div>
        </div>

        {/* CARD GRID */}
        <div className="cgrid">
          {filtered.map(card=>(
            <CardTile key={card.id} card={card} owned={!!owned[card.id]} dupes={owned[card.id]||0} onToggle={toggle} onAddDupe={addDupe}/>
          ))}
        </div>

        {filtered.length===0 && (
          <div style={{textAlign:"center",color:"#ffffff18",padding:48,fontSize:13,fontFamily:"'Rajdhani',sans-serif"}}>
            Nenhuma carta encontrada
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"linear-gradient(transparent,#07071a 70%)",padding:"20px 12px 10px",textAlign:"center",pointerEvents:"none"}}>
        <div style={{fontSize:8,color:"#ffffff14",letterSpacing:1.5,fontFamily:"'Bebas Neue',cursive"}}>TOQUE PARA MARCAR · BADGE ×N PARA DUPLICATA</div>
      </div>
    </div>
  );
}
