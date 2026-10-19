/* Static, dependency-free game. Nothing is sent to a server. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const screens=['cover','rules','play','results'];
  let deck=[],index=0,answers=[],locked=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function showScreen(name,focusId){
    screens.forEach(screen=>{$(`screen-${screen}`).hidden=screen!==name;});
    window.scrollTo({top:0,behavior:'instant'});
    if(focusId)$(focusId).focus({preventScroll:true});
  }
  function shuffle(items){
    const copy=items.slice();
    for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
    return copy;
  }
  const totalCorrect=()=>answers.filter(answer=>answer.isCorrect).length;
  function label(question,value){return question.kind==='image'?(value?'Fotografia real':'Criada com IA'):(value?'Verdadeiro':'Falso');}
  function hideFeedback(){
    $('answer-feedback').hidden=true;$('next-button').hidden=true;
    ['feedback-status','feedback-title','feedback-explanation','feedback-lesson','feedback-credit'].forEach(id=>{$(id).textContent='';});
    $('feedback-source').hidden=true;$('feedback-source').removeAttribute('href');
    $('game-status').textContent='';
  }
  function renderQuestion(){
    const q=deck[index],image=q.kind==='image';locked=false;hideFeedback();
    $('round-count').textContent=`QUESTÃO ${String(index+1).padStart(2,'0')} / ${deck.length}`;
    $('round-type').textContent=image?'IMAGEM':'AFIRMAÇÃO';
    $('round-score').textContent=`${totalCorrect()} ${totalCorrect()===1?'ACERTO':'ACERTOS'}`;
    $('round-progress').value=answers.length;
    $('question-layout').classList.toggle('question-layout--text',!image);
    $('question-visual').hidden=!image;
    $('question-kicker').textContent=image?'INVESTIGUE A IMAGEM':'VERIFIQUE A AFIRMAÇÃO';
    $('question-heading').textContent=image?'Real ou criada com IA?':'Verdadeiro ou falso?';
    $('question-context').textContent=q.context;
    $('question-claim').hidden=image;$('question-claim').textContent=q.claim?`“${q.claim}”`:'';
    if(image){
      $('question-image').src=q.image;$('question-image').alt='Imagem apresentada para análise. Use o contexto e as fontes para verificar sua origem.';
      $('download-image').href=q.image;
    }else{$('question-image').removeAttribute('src');$('download-image').removeAttribute('href');}
    $('research-panel').open=false;
    $('question-hints').replaceChildren(...q.hints.map(hint=>{const li=document.createElement('li');li.textContent=hint;return li;}));
    $('research-link').href=q.researchUrl;
    $('research-link').replaceChildren(document.createTextNode(`${q.researchLabel} ↗`));
    $('lens-link').hidden=!image;
    for(const value of [true,false]){
      const button=$(value?'answer-real':'answer-fake');
      button.disabled=false;button.removeAttribute('aria-pressed');
      button.textContent=image?(value?'Foto real':'Criada com IA'):(value?'Verdadeiro':'Falso');
    }
    $('next-button').innerHTML=index===deck.length-1?'Ver meu resultado <span aria-hidden="true">↗</span>':'Próxima questão <span aria-hidden="true">→</span>';
  }
  function begin(){deck=shuffle(GAME_QUESTIONS);index=0;answers=[];renderQuestion();showScreen('play','question-heading');}
  function answer(value){
    if(locked||!deck[index])return;
    locked=true;const q=deck[index],isCorrect=value===q.correct;
    answers.push({question:q,choice:value,isCorrect});
    for(const option of [true,false]){const button=$(option?'answer-real':'answer-fake');button.disabled=true;button.setAttribute('aria-pressed',String(option===value));}
    $('round-score').textContent=`${totalCorrect()} ${totalCorrect()===1?'ACERTO':'ACERTOS'}`;
    $('round-progress').value=answers.length;
    $('feedback-status').textContent=isCorrect?'VOCÊ ACERTOU · +1 PONTO':'DESTA VEZ, NÃO · +0 PONTO';
    $('feedback-title').textContent=`Gabarito: ${label(q,q.correct)}.`;
    $('feedback-explanation').textContent=q.explanation;
    $('feedback-lesson').hidden=!q.lesson;$('feedback-lesson').textContent=q.lesson?`Para refletir: ${q.lesson}`:'';
    $('feedback-credit').hidden=!q.credit;$('feedback-credit').textContent=q.credit||'';
    $('feedback-source').hidden=!q.sourceLabel;
    if(q.sourceLabel){$('feedback-source').href=q.researchUrl;$('feedback-source').textContent=`${q.sourceLabel} ↗`;}
    $('answer-feedback').hidden=false;$('next-button').hidden=false;
    $('game-status').textContent=`${isCorrect?'Você acertou.':'Resposta incorreta.'} Gabarito: ${label(q,q.correct)}. ${totalCorrect()} de ${deck.length} pontos.`;
    $('feedback-title').focus({preventScroll:true});
    $('answer-feedback').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'nearest'});
  }
  function showResults(){
    const score=totalCorrect();$('final-score').textContent=String(score);$('score-ring').style.setProperty('--score',String(score/deck.length*100));
    $('results-message').textContent=score>=8?'Você encontrou boas pistas. Continue verificando autoria, data e contexto: acertar aqui não dispensa a checagem na próxima publicação.':score>=5?'Você já encontrou algumas pistas importantes. Revise as respostas e observe como a origem e o contexto ajudam a decidir.':'Este é um ponto de partida. Reveja as explicações e experimente checar a origem das imagens e as fontes antes de compartilhar.';
    const images=answers.filter(a=>a.question.kind==='image'&&a.isCorrect).length;
    const text=answers.filter(a=>a.question.kind==='text'&&a.isCorrect).length;
    $('results-split').textContent=`Imagens: ${images}/5 · Afirmações: ${text}/5 · Pontuação: ${score}/10`;
    $('review-list').replaceChildren(...answers.map((item,i)=>{
      const li=document.createElement('li');li.className='review-item';
      const mark=document.createElement('p');mark.className='review-mark';mark.textContent=`${String(i+1).padStart(2,'0')} · ${item.isCorrect?'ACERTO':'ERRO'} · ${item.question.kind==='image'?'IMAGEM':'AFIRMAÇÃO'}`;
      const h3=document.createElement('h3');h3.textContent=item.question.claim||item.question.context;
      const response=document.createElement('p');response.textContent=`Sua resposta: ${label(item.question,item.choice)}. Gabarito: ${label(item.question,item.question.correct)}.`;
      const explanation=document.createElement('p');explanation.textContent=item.question.explanation;
      li.append(mark,h3,response,explanation);
      if(item.question.lesson){const lesson=document.createElement('p');lesson.textContent=item.question.lesson;li.append(lesson);}
      if(item.question.sourceLabel){const a=document.createElement('a');a.href=item.question.researchUrl;a.target='_blank';a.rel='noopener noreferrer';a.textContent=`${item.question.sourceLabel} ↗`;li.append(a);}
      return li;
    }));
    document.querySelector('.review').open=false;showScreen('results','results-title');
  }
  $('start-button').addEventListener('click',()=>showScreen('rules','rules-title'));
  $('play-button').addEventListener('click',begin);
  $('answer-real').addEventListener('click',()=>answer(true));
  $('answer-fake').addEventListener('click',()=>answer(false));
  $('next-button').addEventListener('click',()=>{if(!locked)return;if(index===deck.length-1){showResults();return;}index++;renderQuestion();showScreen('play','question-heading');});
  $('restart-button').addEventListener('click',begin);
  const imageDialog=$('image-dialog');
  $('enlarge-image').addEventListener('click',()=>{if(!deck[index]?.image)return;$('large-image').src=deck[index].image;imageDialog.showModal();$('close-image').focus();});
  $('close-image').addEventListener('click',()=>imageDialog.close());
  imageDialog.addEventListener('close',()=>{$('large-image').removeAttribute('src');$('enlarge-image').focus({preventScroll:true});});
  imageDialog.addEventListener('click',event=>{if(event.target!==imageDialog)return;const r=imageDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)imageDialog.close();});
})();
