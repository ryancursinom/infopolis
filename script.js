const SECTIONS=[['p3','Integrantes'],['p4','Editorial'],['p5','O uso dual da IA'],['p6','Os pilares da análise'],['p7-incorporacao','Quando a IA entra na rotina'],['p8-beneficios','Benefícios e desigualdades de apropriação'],['p9-transicao','IA e desinformação eleitoral'],['p10-introducao','Introdução'],['p11-falso-verdadeiro','A linha tênue entre o falso e o verdadeiro'],['p12-lupa','O crescimento dos conteúdos falsos produzidos com IA'],['p13-resposta','A resposta convincente também pode estar errada'],['p14-confianca','A confiança também circula pelas relações'],['p15-condicoes','As condições sociais da verificação'],['p16-imagem-politica','A fabricação da imagem política'],['p17-transparencia','Transparência e resposta institucional'],['p18-polarizacao-transicao','Polarização'],['p19-polarizacao-intro','Introdução à polarização'],['p20-torcidas','A situação atual: torcidas calcificadas'],['p21-vaia','Menos torcida a favor, mais vaia'],['p22-pouco','Por que se briga sobre tão pouco'],['p23-ia-polarizacao','A entrada da IA'],['p24-consequencias','Consequências: do debate ao placar'],['p25-regulacao-transicao','Regulamentação e anomia informacional'],['p26-regulacao-intro','Introdução'],['p27-deepfakes-eleicoes','Deepfakes e eleições'],['p28-pos-verdade','Pós-verdade e inteligência artificial'],['p29-regulamentacao-responsabilidade','Regulamentação e responsabilidade']];

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];

/* ---------- Bibliographic references dialog ---------- */
const referencesDialog=$('#references-dialog');
const referencesOpen=$('#references-open');
let referencesScrollStyle='';
referencesOpen?.addEventListener('click',()=>{
  if(!referencesDialog||referencesDialog.open)return;
  referencesScrollStyle=document.body.style.overflow;
  referencesDialog.showModal();
  document.body.style.overflow='hidden';
  $('#references-close')?.focus();
});
$('#references-close')?.addEventListener('click',()=>referencesDialog?.close());
referencesDialog?.addEventListener('click',event=>{
  if(event.target!==referencesDialog)return;
  const bounds=referencesDialog.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)referencesDialog.close();
});
referencesDialog?.addEventListener('close',()=>{
  document.body.style.overflow=referencesScrollStyle;
  referencesOpen?.focus({preventScroll:true});
});

/* ---------- Sumário ---------- */
const pages=$$('.frame');
const pageNumberFor=id=>String(pages.indexOf(document.getElementById(id)?.closest('.frame'))+1).padStart(2,'0');
const linkHTML=SECTIONS.map(([id,t])=>`<li><a href="#${id}" data-testid="toc-link-${id}"><i>${pageNumberFor(id)}</i><span>${t}</span></a></li>`).join('');
$('#contents')?.insertAdjacentHTML('beforeend',`<ol class="toc">${linkHTML}</ol>`);
$('#contents .toc')?.insertAdjacentHTML('beforeend','<li><a href="jogo.html" target="_blank" rel="noopener noreferrer"><i aria-hidden="true">↗</i><span>Jogo: Real ou Fake</span></a></li>');

/* ---------- Active section tracking ---------- */
const frameEls=$$('.frame, .polarizacao-spread>article[id], .editorial-spread>article[id]');
const setCurrent=id=>{
  $$('#contents a').forEach(a=>{
    const on=a.getAttribute('href')==='#'+id;
    if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');
  });
};
const secIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setCurrent(e.target.id)}),{rootMargin:'-45% 0px -45%',threshold:0});
frameEls.forEach(el=>secIO.observe(el));

/* ---------- Count-up ---------- */
const fmt=(v,d)=>v.toFixed(d).replace('.',',');
function countUp(el){
  const target=parseFloat(el.dataset.count),dec=parseInt(el.dataset.dec||'0',10),suf=el.dataset.suf??'';
  if(reduced||isNaN(target)){el.textContent=fmt(target||0,dec)+suf;return}
  const t0=performance.now(),dur=1300;
  const step=n=>{const k=Math.min(1,(n-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fmt(target*e,dec)+suf;if(k<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}

/* ---------- Reveal on scroll ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('in-view');
  io.unobserve(e.target);
  $$('[data-count]',e.target).forEach(countUp);
  if(e.target.hasAttribute('data-count'))countUp(e.target);
}),{threshold:.18,rootMargin:'0px 0px -6%'});
$$('[data-reveal]').forEach(el=>io.observe(el));

/* ---------- Expandable panels (RevealPanel) ---------- */
$$('.expand__trigger').forEach(btn=>btn.addEventListener('click',()=>{
  const panel=document.getElementById(btn.getAttribute('aria-controls'));
  if(!panel)return;
  const open=btn.getAttribute('aria-expanded')==='true';
  btn.setAttribute('aria-expanded',String(!open));
  if(!open){panel.hidden=false;requestAnimationFrame(()=>panel.classList.add('is-open'))}
  else{panel.classList.remove('is-open');setTimeout(()=>{panel.hidden=true},620)}
}));

/* ---------- Cover parallax ---------- */
const cover=$('#p1'),coverImg=$('.cover__media img');
if(cover&&coverImg&&!reduced){
  cover.addEventListener('mousemove',e=>{
    const r=cover.getBoundingClientRect();
    coverImg.style.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(3));
    coverImg.style.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(3));
  });
  cover.addEventListener('mouseleave',()=>{coverImg.style.setProperty('--px',0);coverImg.style.setProperty('--py',0)});
}

/* ---------- Macro background drift ---------- */
const macroImgs=$$('.macro__bg img');
if(macroImgs.length&&!reduced){
  let ticking=false;
  const drift=()=>{
    macroImgs.forEach(img=>{
      const r=img.parentElement.parentElement.getBoundingClientRect();
      if(r.bottom<0||r.top>innerHeight)return;
      const p=(r.top+r.height/2-innerHeight/2)/innerHeight;
      img.style.transform=`translateY(${(p*-46).toFixed(1)}px) scale(1.12)`;
    });
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(drift)}},{passive:true});
  drift();
}
