'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';

const carImages = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2200&q=90'
];

const specs = [
  ['3.2','SECONDS','0—100 KM/H'],['780','HP','POWER'],['920','NM','TORQUE'],['320','KM/H','TOP SPEED']
];

const hotspots = [
  ['01','POWERTRAIN','Dual-motor architecture','780 HP · 920 Nm'],
  ['02','AERODYNAMICS','Active airflow surfaces','-18% drag'],
  ['03','SUSPENSION','Predictive adaptive control','1,000 Hz sensing'],
  ['04','BRAKING','Carbon-ceramic system','6-piston front'],
  ['05','THERMAL','Liquid-cooled architecture','Track-ready cooling'],
];

const gallery = [
  [carImages[0],'AURIX / STUDIO 01'],[carImages[1],'AURIX / FORM 02'],[carImages[2],'AURIX / NIGHT 03'],[carImages[3],'AURIX / DETAIL 04'],
  ['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=90','AURIX / MOTION 05'],
  ['https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1800&q=90','AURIX / INTERIOR 06']
];

function Reveal({children, className='' }: {children:React.ReactNode; className?:string}) {
  return <motion.div className={className} initial={{opacity:0,y:34}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.8,ease:[.22,1,.36,1]}}>{children}</motion.div>
}

export default function Page(){
  const [loading,setLoading]=useState(true); const [menu,setMenu]=useState(false); const [cursor,setCursor]=useState({x:0,y:0,label:''});
  const [hot,setHot]=useState(0); const [galleryOpen,setGalleryOpen]=useState<number|null>(null); const [config,setConfig]=useState({color:'OBSIDIAN',wheel:'FORGED',interior:'ONYX'}); const [submitted,setSubmitted]=useState(false); const [sound,setSound]=useState(false);
  const {scrollYProgress}=useScroll(); const progress=useSpring(scrollYProgress,{stiffness:80,damping:25}); const heroY=useTransform(progress,[0,.22],[0,-80]);
  useEffect(()=>{const t=setTimeout(()=>setLoading(false),1450); return ()=>clearTimeout(t)},[]);
  useEffect(()=>{const move=(e:MouseEvent)=>setCursor(c=>({...c,x:e.clientX,y:e.clientY})); window.addEventListener('mousemove',move); return ()=>window.removeEventListener('mousemove',move)},[]);
  const filter=useMemo(()=>({OBSIDIAN:'saturate(.7) contrast(1.15) brightness(.68)',TITANIUM:'grayscale(.35) brightness(1.15) contrast(1.05)',ARCTIC:'grayscale(.15) brightness(1.25) saturate(.65)',GRAPHITE:'grayscale(.55) brightness(.78)',EMBER:'sepia(.35) saturate(1.5) brightness(.9)'}[config.color]),[config.color]);
  const nav=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)};
  return <main onMouseLeave={()=>setCursor(c=>({...c,label:''}))}>
    <AnimatePresence>{loading&&<motion.div className="loader" initial={{opacity:1}} exit={{opacity:0}}><div className="loader-core"><div className="eyebrow">SYSTEM INITIALIZING</div><div className="loader-brand">AURIX</div><div className="loader-tag">ENGINEERED TO MOVE.</div><div className="loader-line"><motion.span initial={{width:0}} animate={{width:'100%'}} transition={{duration:1.2,ease:'easeInOut'}}/></div><div className="boot-steps"><span>01 DESIGN</span><span>02 ENGINEERING</span><span>03 PERFORMANCE</span><span>04 EXPERIENCE</span></div></div></motion.div>}</AnimatePresence>
    <motion.div className="cursor" animate={{x:cursor.x-12,y:cursor.y-12,scale:cursor.label?2.2:1}} transition={{type:'spring',stiffness:500,damping:35}}>{cursor.label&&<span>{cursor.label}</span>}</motion.div>
    <motion.div className="progress" style={{scaleX:progress}}/>
    <header className="nav"><button className="wordmark" onClick={()=>nav('top')}>AURIX</button><nav className="navlinks"><button onClick={()=>nav('models')}>MODELS</button><button onClick={()=>nav('technology')}>TECHNOLOGY</button><button onClick={()=>nav('performance')}>PERFORMANCE</button><button onClick={()=>nav('design')}>DESIGN</button><button onClick={()=>nav('configure')}>CONFIGURE</button></nav><button className="nav-cta" onMouseEnter={()=>setCursor(c=>({...c,label:'ENTER'}))} onMouseLeave={()=>setCursor(c=>({...c,label:''}))} onClick={()=>nav('contact')}>PRIVATE EXPERIENCE <span>↗</span></button><button className="menu-btn" onClick={()=>setMenu(true)}>MENU <i/></button></header>
    <AnimatePresence>{menu&&<motion.div className="mobile-menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="close" onClick={()=>setMenu(false)}>CLOSE ×</button>{['models','technology','performance','design','configure','contact'].map((x,i)=><motion.button key={x} initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:i*.06}} onClick={()=>nav(x)}>{x.toUpperCase()} <span>↗</span></motion.button>)}<div className="mobile-footer">AURIX / ENGINEERED TO MOVE.</div></motion.div>}</AnimatePresence>

    <section id="top" className="hero" onMouseEnter={()=>setCursor(c=>({...c,label:'EXPLORE'}))}>
      <motion.div className="hero-image" style={{y:heroY,filter}} animate={{scale:1}}><img src={carImages[0]} alt="AURIX performance vehicle in a dark studio"/></motion.div><div className="hero-vignette"/><div className="hero-grid"/><div className="hero-copy"><Reveal><div className="eyebrow">AURIX / ONE / 2026</div><h1>ENGINEERED<br/><em>TO MOVE.</em></h1><p>A new expression of performance, technology and design.</p><div className="hero-actions"><button className="primary" onClick={()=>nav('models')}>EXPLORE THE MACHINE <span>↗</span></button><button className="ghost" onClick={()=>nav('configure')}>CONFIGURE YOUR AURIX</button></div></Reveal></div><div className="hero-meta"><span>CO2 / 0 G/KM*</span><span>AWD / DUAL MOTOR</span><span>01 — 08</span></div><div className="scroll-cue">SCROLL TO DISCOVER <span>↓</span></div>
    </section>

    <section id="models" className="manifesto"><Reveal><div className="eyebrow">THE NEW AURIX</div><h2>NOT BUILT<br/><span>TO BLEND IN.</span></h2><p>Every surface has a function. Every millimetre carries intent. AURIX turns engineering into an object of desire.</p></Reveal><div className="manifesto-line"/></section>

    <section id="performance" className="performance section-pad"><div className="section-head"><div><div className="eyebrow">01 / PERFORMANCE</div><h2>BUILT FOR<br/><span>VELOCITY.</span></h2></div><p>Instant response. Intelligent traction. A powertrain tuned to make acceleration feel inevitable.</p></div><div className="spec-grid">{specs.map(([n,u,l],i)=><Reveal key={n}><div className="spec" onMouseEnter={()=>setCursor(c=>({...c,label:'VIEW'}))}><strong>{n}</strong><small>{u}</small><span>{l}</span><div className="spec-line"/></div></Reveal>)}</div><div className="telemetry"><div className="telemetry-copy"><div className="eyebrow">LIVE TELEMETRY / SIMULATION</div><h3>POWER<br/><span>IN MOTION.</span></h3><p>Performance data visualised as a language of movement.</p></div><div className="graph"><div className="graph-labels"><span>TORQUE</span><span>RPM</span><span>LOAD</span></div><svg viewBox="0 0 800 300" preserveAspectRatio="none"><polyline points="0,240 90,230 160,180 230,205 300,130 380,160 450,70 520,110 600,45 690,70 800,22" fill="none" stroke="currentColor" strokeWidth="2"/><polyline points="0,270 100,250 190,245 270,210 360,215 440,150 540,165 630,90 720,110 800,60" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1"/></svg><div className="graph-axis"><span>0</span><span>2K</span><span>4K</span><span>6K</span><span>8K RPM</span></div></div></div></section>

    <section id="technology" className="machine section-pad"><div className="section-head"><div><div className="eyebrow">02 / THE MACHINE</div><h2>EVERY COMPONENT<br/><span>HAS A PURPOSE.</span></h2></div><p>Explore the systems beneath the surface. Designed to work as one intelligent machine.</p></div><div className="machine-stage"><img src={carImages[1]} alt="AURIX vehicle technical showcase"/><div className="machine-overlay"/><div className="hotspots">{hotspots.map((h,i)=><button key={h[0]} className={'hotspot '+(hot===i?'active':'')} style={{left:`${[25,68,45,75,35][i]}%`,top:`${[42,38,67,63,53][i]}%`}} onMouseEnter={()=>{setHot(i);setCursor(c=>({...c,label:'VIEW'}))}} onClick={()=>setHot(i)}><i>{h[0]}</i><span>{h[1]}</span></button>)}</div><AnimatePresence mode="wait"><motion.div key={hot} className="hot-card" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}><div className="eyebrow">{hotspots[hot][0]} / {hotspots[hot][1]}</div><h3>{hotspots[hot][2]}</h3><p>Engineered around intelligent control, material efficiency and real-time feedback.</p><b>{hotspots[hot][3]}</b></motion.div></AnimatePresence></div></section>

    <section className="explode"><div className="explode-copy"><div className="eyebrow">03 / ARCHITECTURE</div><h2>THE ART OF<br/><span>DISASSEMBLY.</span></h2><p>Scroll through the machine. See the layers that turn motion into a precise, controlled experience.</p></div><div className="explode-car"><div className="ring r1"/><div className="ring r2"/><img src={carImages[2]} alt="AURIX architecture"/><div className="layer l1">BODY</div><div className="layer l2">BATTERY</div><div className="layer l3">MOTOR</div></div></section>

    <section className="air section-pad"><div className="air-bg"><img src={carImages[3]} alt="AURIX aerodynamic form"/><div className="air-lines"><span/><span/><span/><span/></div></div><div className="air-copy"><div className="eyebrow">04 / AERODYNAMICS</div><h2>SHAPED<br/><span>BY AIR.</span></h2><p>Active surfaces respond to velocity, cooling and load. Form is no longer static — it is a moving system.</p><button className="line-btn">EXPLORE AERODYNAMICS <span>↗</span></button></div></section>

    <section id="design" className="design section-pad"><div className="section-head"><div><div className="eyebrow">05 / DESIGN</div><h2>FORM FOLLOWS<br/><span>PERFORMANCE.</span></h2></div></div><div className="design-strip">{[['LIGHT SIGNATURE',carImages[0]],['AERODYNAMIC SURFACE',carImages[1]],['CARBON STRUCTURE',carImages[2]],['NIGHT PROFILE',carImages[3]]].map(([t,img],i)=><div className="design-panel" key={t}><img src={img} alt={t}/><div><span>0{i+1}</span><strong>{t}</strong></div></div>)}</div></section>

    <section className="lights"><div className="lights-image"><img src={carImages[1]} alt="AURIX headlight design"/><div className="beam b1"/><div className="beam b2"/></div><div className="lights-copy"><div className="eyebrow">06 / LIGHTING</div><h2>LIGHT,<br/><span>REDEFINED.</span></h2><p>Four signatures. One unmistakable presence.</p><div className="light-controls">{['DAY','NIGHT','WELCOME','PERFORMANCE'].map((x,i)=><button key={x} className={i===0?'active':''}>{x}</button>)}</div></div></section>

    <section className="interior section-pad"><div className="interior-image"><img src={carImages[3]} alt="AURIX driver cockpit"/></div><div className="interior-copy"><div className="eyebrow">07 / INTERIOR</div><h2>THE DRIVER'S<br/><span>SPACE.</span></h2><p>A cockpit shaped around focus: tactile materials, low-glare displays and ambient light that responds to the drive.</p><div className="material-row">{['LEATHER','CARBON','BRUSHED METAL','GLASS'].map(x=><span key={x}>{x}</span>)}</div></div></section>

    <section className="materials section-pad"><div className="section-head"><div><div className="eyebrow">08 / MATERIALS</div><h2>CRAFTED<br/><span>FROM LIGHT.</span></h2></div></div><div className="material-stage"><div className="material-swatch"/><div className="material-info"><span>SELECTED MATERIAL</span><strong>CARBON WEAVE</strong><p>Structural carbon fibre with a satin technical finish.</p></div></div></section>

    <section id="configure" className="config section-pad"><div className="section-head"><div><div className="eyebrow">09 / CONFIGURATOR</div><h2>MAKE IT<br/><span>YOURS.</span></h2></div><p>Choose the specification that feels unmistakably you.</p></div><div className="config-layout"><div className="config-car"><div className="config-glow"/><img style={{filter}} src={carImages[0]} alt="Configurable AURIX vehicle"/><div className="config-label">AURIX ONE / {config.color}</div></div><div className="config-panel"><div className="config-group"><label>EXTERIOR</label><div>{['OBSIDIAN','TITANIUM','ARCTIC','GRAPHITE','EMBER'].map(x=><button className={config.color===x?'selected':''} key={x} onClick={()=>setConfig({...config,color:x})}><i className={'dot '+x.toLowerCase()}/>{x}</button>)}</div></div><div className="config-group"><label>WHEELS</label><div>{['AERO','FORGED','PERFORMANCE'].map(x=><button className={config.wheel===x?'selected':''} key={x} onClick={()=>setConfig({...config,wheel:x})}>{x}</button>)}</div></div><div className="config-group"><label>INTERIOR</label><div>{['ONYX','SAND','CARBON'].map(x=><button className={config.interior===x?'selected':''} key={x} onClick={()=>setConfig({...config,interior:x})}>{x}</button>)}</div></div><div className="config-summary"><span>AURIX ONE</span><b>{config.color}</b><b>{config.wheel} / 21&quot;</b><b>{config.interior}</b><small>EST. FROM ₹XX,XX,XXX</small><button className="primary" onClick={()=>nav('contact')}>REQUEST YOUR AURIX ↗</button></div></div></div></section>

    <section className="night"><div className="night-image"><img src={carImages[0]} alt="AURIX night drive"/><div className="rain"/></div><div className="night-copy"><div className="eyebrow">10 / NIGHT DRIVE</div><h2>BUILT<br/><span>FOR THE NIGHT.</span></h2><p>Silence, speed and light. A performance object in motion.</p><button className="primary">EXPERIENCE THE DRIVE ↗</button></div></section>

    <section className="gallery section-pad"><div className="section-head"><div><div className="eyebrow">11 / GALLERY</div><h2>THE AURIX<br/><span>ARCHIVE.</span></h2></div></div><div className="gallery-grid">{gallery.map(([img,cap],i)=><button className={'gallery-item gi'+i} key={cap} onClick={()=>setGalleryOpen(i)} onMouseEnter={()=>setCursor(c=>({...c,label:'VIEW'}))}><img src={img} alt={cap}/><span>{cap}</span></button>)}</div></section>

    <section className="reveal-section"><div className="reveal-orb"/><div className="reveal-car"><img src={carImages[0]} alt="AURIX reveal"/></div><div className="reveal-text"><div className="eyebrow">THE AURIX REVEAL</div><h2>ENGINEERED<br/><span>TO MOVE.</span></h2></div></section>

    <section className="final"><div className="eyebrow">AURIX / PRIVATE EXPERIENCE</div><h2>MOVE<br/><span>DIFFERENT.</span></h2><p>Engineered for those who refuse ordinary.</p><button className="primary" onClick={()=>nav('contact')}>REQUEST A PRIVATE EXPERIENCE ↗</button></section>

    <section id="contact" className="contact section-pad"><div className="contact-copy"><div className="eyebrow">12 / PRIVATE EXPERIENCE</div><h2>YOUR AURIX<br/><span>AWAITS.</span></h2><p>Begin a private conversation about the machine, the specification and the experience.</p></div><form className="contact-form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>{submitted?<div className="submitted"><div className="check">✓</div><div className="eyebrow">REQUEST RECEIVED</div><h3>WE'LL BE<br/>IN TOUCH.</h3><p>AURIX will contact you shortly.</p></div>:<><input required placeholder="FULL NAME"/><input required type="email" placeholder="EMAIL"/><input placeholder="PHONE"/><input placeholder="CITY"/><select defaultValue=""><option value="" disabled>MODEL</option><option>AURIX ONE</option><option>AURIX GT</option></select><textarea placeholder="MESSAGE" rows={4}/><button className="primary" type="submit">REQUEST PRIVATE EXPERIENCE ↗</button></>}</form></section>

    <footer><div className="footer-top"><div><div className="footer-brand">AURIX</div><div className="footer-tag">ENGINEERED TO MOVE.</div></div><div className="footer-links"><button onClick={()=>nav('models')}>MODELS</button><button onClick={()=>nav('technology')}>TECHNOLOGY</button><button onClick={()=>nav('performance')}>PERFORMANCE</button><button onClick={()=>nav('design')}>DESIGN</button><button onClick={()=>nav('configure')}>CONFIGURE</button></div><div className="footer-social">INSTAGRAM<br/>YOUTUBE<br/>LINKEDIN</div></div><div className="footer-bottom"><span>© 2026 AURIX AUTOMOTIVE</span><span>PRIVACY · TERMS</span><div className="studio-credit"><img src="/aegon-logo.png" alt="AEGON STUDIOZ"/><span>DESIGNED & DEVELOPED BY AEGON STUDIOZ</span></div></div></footer>

    {galleryOpen!==null&&<AnimatePresence><motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="lb-close" onClick={()=>setGalleryOpen(null)}>CLOSE ×</button><img src={gallery[galleryOpen][0]} alt={gallery[galleryOpen][1]}/><div className="lb-caption">{gallery[galleryOpen][1]}</div></motion.div></AnimatePresence>}
    <button className="sound" onClick={()=>setSound(!sound)} aria-label="Toggle sound">{sound?'SOUND ON':'SOUND OFF'}</button>
  </main>
}
