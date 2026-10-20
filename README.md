# Infopolis

Revista digital sobre inteligência artificial, desinformação e períodos eleitorais no Brasil.

## Abrir a revista

Abra `index.html` em um navegador moderno. Não é preciso instalar dependências, iniciar backend ou configurar serviços externos.

O jogo **Real ou Fake** está em `jogo.html` e também pode ser aberto pelo sumário ou pelo footer da revista. São dez questões (cinco imagens e cinco afirmações) embaralhadas a cada partida, com dicas, fontes, feedback e pontuação de 0 a 10. A partida roda no navegador e reinicia ao recarregar a página; não envia respostas para servidores.

O QR code do footer aponta para `https://ryancursinom.github.io/infopolis/jogo.html`. O resultado do jogo oferece um link local e um QR code para a revista. Para o novo endereço funcionar online, publique também `jogo.html`, `css/jogo.css`, `js/` e os novos arquivos de `assets/`. A criação local não publica o site automaticamente.

As fontes e os créditos do jogo estão em `docs/jogo-fontes.md`.

Para servir os arquivos por HTTP local, opcionalmente execute nesta pasta:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:8000`. Esse servidor é apenas uma alternativa local para visualizar arquivos estáticos.

## Arquivos

- `index.html`: conteúdo e estrutura editorial.
- `script.js`: navegação, gráficos e interações.
- `css/`: tokens, estilos base, componentes e seções.
- `assets/`: fotografias e imagens da revista.
- `favicon.svg`: ícone do site.
- `docs/design_guidelines.json`: diretrizes visuais importadas.

HTML, CSS, JavaScript, imagens e dados foram copiados sem alterações da versão recebida. Não há backend, banco de dados, dependências de renderização, plugins de plataforma, configuração de implantação ou histórico Git nesta pasta.

As fontes tipográficas continuam referenciadas no Google Fonts, conforme a versão recebida, com fontes alternativas locais. Links editoriais externos também foram preservados. Nenhum deles é necessário para executar um servidor da aplicação.
