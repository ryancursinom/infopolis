/* Editorial question bank. Explanations and credits are rendered only after answering. */
const GAME_QUESTIONS = [
  {
    id:'imagem-1',kind:'image',image:'assets/jogo/imagem-01.jpg',correct:true,
    context:'Uma publicação apresenta Lula e Geraldo Alckmin juntos após a indicação de Alckmin para vice na chapa presidencial de 2022. Esta fotografia é real ou foi criada com IA?',
    hints:['Faça uma busca reversa no Google Lens.','Pesquise: “Lula Alckmin indicação vice 8 abril 2022”.','Confira a legenda e o crédito do fotógrafo na reportagem.'],
    researchUrl:'https://www.poder360.com.br/eleicoes/diretorio-nacional-do-pt-aprova-alckmin-como-vice-de-lula/',researchLabel:'Consultar a reportagem',
    explanation:'Fotografia real, feita em 8 de abril de 2022, com crédito de Ricardo Stuckert/Instituto Lula. Foi publicada pelo Poder360 em uma reportagem de 13 de abril de 2022. A data da notícia é diferente da data da fotografia.',
    credit:'Ricardo Stuckert/Instituto Lula · 8 de abril de 2022.',
    sourceLabel:'Poder360 — Diretório Nacional do PT aprova Alckmin como vice de Lula.'
  },
  {
    id:'imagem-2',kind:'image',image:'assets/jogo/imagem-02.jpg',correct:true,
    context:'Uma publicação afirma que esta fotografia mostra o público da convenção que oficializou a candidatura de Jair Bolsonaro à reeleição, no Maracanãzinho, em 2022. A imagem é real ou foi criada com IA?',
    hints:['Use o Google Lens para encontrar a fotografia na cobertura original.','Pesquise: “convenção PL Maracanãzinho 24 julho 2022”.','Compare a arquitetura, o palco e as faixas com outros registros do evento.'],
    researchUrl:'https://www.poder360.com.br/eleicoes/veja-fotos-e-videos-da-convencao-do-pl-de-bolsonaro-no-rio/',researchLabel:'Consultar a cobertura',
    explanation:'Fotografia real, registrada por Murilo Fagundes/Poder360 em 24 de julho de 2022, no Rio de Janeiro. A imagem aparece na cobertura publicada pelo próprio veículo.',
    credit:'Murilo Fagundes/Poder360 · 24 de julho de 2022.',sourceLabel:'Poder360 — Fotos e vídeos da convenção do PL.'
  },
  {
    id:'imagem-3',kind:'image',image:'assets/jogo/imagem-03.jpg',correct:false,
    context:'Uma publicação afirma que um candidato participou da entrega de cobertores para famílias atingidas por uma enchente. A fotografia é real ou foi criada com IA?',
    hints:['Procure a imagem no Google Lens.','Confira se existem registros da ação na imprensa local ou nos canais da organização responsável.','Verifique nome, local, data e autoria.'],
    researchUrl:'https://www.google.com/search?q=candidato+entrega+cobertores+familias+enchente',researchLabel:'Pesquisar registros da ação',
    explanation:'Criada com IA no ChatGPT para este jogo. As pessoas e a situação são fictícias.',
    credit:'Imagem sintética fornecida para este jogo. Não documenta um acontecimento real.'
  },
  {
    id:'imagem-4',kind:'image',image:'assets/jogo/imagem-04.jpg',correct:false,
    context:'Uma publicação apresenta esta imagem como um encontro entre candidatos adversários nos bastidores de um debate. A fotografia é real ou foi criada com IA?',
    hints:['Faça uma busca reversa no Google Lens.','Procure a cobertura do debate e os registros da emissora organizadora.','Confira se a publicação identifica os candidatos, a data e o fotógrafo.'],
    researchUrl:'https://www.google.com/search?q=candidatos+adversarios+encontro+bastidores+debate',researchLabel:'Pesquisar registros do debate',
    explanation:'Criada com IA no ChatGPT para este jogo. As pessoas e o encontro são fictícios.',
    lesson:'Mesmo uma fotografia verdadeira de um cumprimento não comprovaria uma aliança política. É preciso verificar também a história contada pela legenda.',
    credit:'Imagem sintética fornecida para este jogo. Não documenta um encontro real.'
  },
  {
    id:'imagem-5',kind:'image',image:'assets/jogo/imagem-05.jpg',correct:false,
    context:'A imagem aparenta registrar uma manifestação na Avenida Paulista. Ela poderia circular nas redes como suposta prova de grande apoio popular a um candidato.',
    hints:['Use o Google Lens para procurar a origem da imagem.','Compare os resultados com fotografias de veículos jornalísticos, verificando fotógrafo, local e data.'],
    researchUrl:'https://www.google.com/search?q=manifestacao+Avenida+Paulista+fotografias+data+fotografo',researchLabel:'Pesquisar registros da manifestação',
    explanation:'Imagem criada com IA, no ChatGPT, para este jogo. A cena é fictícia e não documenta uma manifestação real.',
    lesson:'Bandeiras e lugares conhecidos podem tornar uma imagem convincente. A ausência de resultados na busca reversa, sozinha, também não comprova que ela foi gerada por IA.',
    credit:'Imagem sintética fornecida para este jogo. Não documenta uma manifestação real.'
  },
  {
    id:'texto-1',kind:'text',correct:false,
    context:'Uma mensagem sobre as eleições circula nas redes. Investigue se a afirmação abaixo é verdadeira ou falsa.',
    claim:'Um vídeo provou que hackers russos invadiram o sistema eleitoral brasileiro e alteraram os votos.',
    hints:['Pesquise a origem do vídeo e procure informações sobre o caso em fontes independentes.'],
    researchUrl:'https://www.aosfatos.org/noticias/falso-hackers-russos-tse/',researchLabel:'Consultar uma checagem',
    explanation:'A afirmação é falsa. O vídeo dissemina uma teoria conspiratória e não comprova que hackers russos tenham alterado votos no sistema eleitoral brasileiro.',
    sourceLabel:'Aos Fatos — Checagem do vídeo sobre hackers russos e o TSE.'
  },
  {
    id:'texto-2',kind:'text',correct:true,
    context:'Uma publicação menciona uma conclusão do Comitê de Direitos Humanos da ONU. Confira o que foi efetivamente decidido.',
    claim:'O Comitê de Direitos Humanos da ONU concluiu que os direitos de Lula foram violados durante a Operação Lava Jato.',
    hints:['Consulte o documento original e confira exatamente quais foram as conclusões do comitê.'],
    researchUrl:'https://www.aosfatos.org/noticias/o-que-e-falso-e-o-que-e-fato-em-declaracoes-de-lula-sobre-absolvicoes-na-onu-e-na-justica/',researchLabel:'Consultar uma checagem',
    explanation:'A afirmação é verdadeira: o comitê concluiu que houve violação de direitos de Lula. Essa conclusão não deve ser confundida com uma absolvição criminal pela ONU.',
    sourceLabel:'Aos Fatos — O que é falso e o que é fato em declarações de Lula sobre absolvições na ONU e na Justiça.'
  },
  {
    id:'texto-3',kind:'text',correct:false,
    context:'Uma mensagem questiona a fiscalização das urnas usadas nas eleições de 2022. Avalie a afirmação e os procedimentos de auditoria.',
    claim:'As urnas eletrônicas mais antigas usadas em 2022 não passaram por auditoria e poderiam ter sido manipuladas.',
    hints:['Procure informações sobre os procedimentos de auditoria e fiscalização das urnas eletrônicas.'],
    researchUrl:'https://www.agencialupa.org/jornalismo/2022/11/07/modelos-urnas-auditados/',researchLabel:'Consultar uma checagem',
    explanation:'A afirmação é falsa. A checagem mostra que os diferentes modelos de urnas usados na eleição foram submetidos a procedimentos de auditoria e fiscalização.',
    sourceLabel:'Lupa — É falso que modelos de urnas usados na eleição não foram auditados.'
  },
  {
    id:'texto-4',kind:'text',correct:true,
    context:'Uma publicação apresenta um número sobre a distribuição dos votos em 2022. Verifique o dado e o contexto em que ele aparece.',
    claim:'Em 2022, houve 147 seções eleitorais em que todos os votos válidos do segundo turno foram destinados a apenas um dos dois candidatos.',
    hints:['Confira os dados eleitorais e pesquise o contexto em que esse número foi divulgado.'],
    researchUrl:'https://www.agencialupa.org/jornalismo/2022/11/21/sao-falsas-alegacoes-de-fraude-no-processo-eleitoral-que-circulam-em-mensagem-viral-no-whatsapp/',researchLabel:'Consultar uma checagem',
    explanation:'O dado é verdadeiro. A checagem registra 147 seções nessa situação. Esse número, por si só, não é indício de fraude; é necessário considerar o contexto e o tamanho das seções.',
    sourceLabel:'Lupa — Checagem de alegações de fraude em mensagem viral no WhatsApp.'
  },
  {
    id:'texto-5',kind:'text',correct:false,
    context:'Uma mensagem atribui propostas ao plano de governo apresentado na campanha de 2022. Compare a afirmação com o documento e as checagens.',
    claim:'O plano de governo de Lula em 2022 previa a legalização das drogas e a perseguição a religiosos.',
    hints:['Compare a afirmação com o plano de governo oficial apresentado durante a campanha.'],
    researchUrl:'https://www.aosfatos.org/noticias/todas-as-mentiras-espalhadas-durante-as-eleicoes-2022-checadas/',researchLabel:'Consultar uma checagem',
    explanation:'A afirmação é falsa. As medidas alegadas não estavam previstas no plano de governo; a fonte reúne checagens desses boatos eleitorais.',
    sourceLabel:'Aos Fatos — Mentiras espalhadas durante o primeiro turno das eleições de 2022, checadas.'
  }
];
