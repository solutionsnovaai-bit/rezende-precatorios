# Entrega — Rezende Precatórios

## Direção visual

Uma experiência editorial com azul profundo, dourado discreto, papel claro, tipografia principal sem serifa, com destaque serifado apenas na palavra animada do hero e fotografia em grande escala. O logotipo fornecido é usado sem redesenho. Os heros têm versões para desktop e celular.

## Fluxos

1. A abertura revela o bitmap original de forma contínua, com perspectiva e passagem de luz, sem dividir o logotipo em peças. Não há linhas decorativas cruzando a tela nem contador; a composição usa apenas a marca, uma frase discreta e a opção de pular. A revelação começa após a decodificação do arquivo do logo. A espera normal é de 2,8 segundos, com limite de 4 segundos seguido da transição de saída; pode ser pulada. Movimento reduzido abre diretamente o conteúdo.
2. O CTA principal leva à seção de contato.
3. O carrossel avança automaticamente a cada 3,4 segundos, sem controles visuais de play, setas ou paginação. Há nove fotografias, transições e arraste horizontal; as setas do teclado continuam funcionando quando o carrossel recebe foco. A passagem automática pausa fora da tela, com a aba oculta, durante arraste, enquanto o foco estiver dentro do carrossel ou ao pausar o movimento no rodapé.
4. As quatro etapas podem ser exploradas por clique ou teclado.
5. O FAQ abre uma resposta por vez.
6. O formulário valida o preenchimento e prepara um e-mail. O visitante conclui o envio no aplicativo de e-mail. Há alternativa para copiar a mensagem.
7. O balão de WhatsApp abre o número 5511960387793 com uma mensagem pronta; o visitante conclui o envio no WhatsApp. O número foi informado pelo responsável durante a revisão.
8. O Lenis suaviza a rolagem no desktop e encerra o ciclo de animação quando fica ocioso. A rolagem por toque permanece nativa. Ao abrir o menu móvel, a instância é desmontada para preservar a navegação.

## Identidade e compartilhamento

- Oito seções principais: hero, possibilidades, galeria, processo, sobre, composição fotográfica, perguntas frequentes e contato; além das faixas de confiança, palavras, imagens e do rodapé.
- Hero alternando palavras a cada 2,8 segundos; imagens em escalas diferentes e parallax associado ao scroll.
- Navbar com fundo integrado e transparência aplicada ao bitmap original do logo na renderização.
- Instagram no cabeçalho e rodapé; ícone fora do menu móvel, com área de toque de 44 × 44 px e destino `https://www.instagram.com/rezendeprecatorios/`.
- Galeria e contato com fundo azul profundo; áreas claras e fotografia equilibram o contraste.
- Rodapé com logo original, © 2026 e CNPJ 13.794.443/0001-43.
- Favicon com o brasão original, sem redesenho; SVG, PNG 16/32 px, ICO 16/32/48 px e Apple Touch Icon 180 px.
- OG PNG 1200 × 630 com o arquivo real do logotipo, sem recriação. Metadados também incluídos para Twitter.
- Domínio padrão: `https://rezendeprecatorios.com.br`. Para outra origem, ajuste `VITE_SITE_URL` antes do build, conforme o README.

## Publicação

O pacote contém código-fonte e a versão compilada em `dist/`. Não contém `node_modules`, senhas, tokens, contas conectadas nem configuração de um projeto externo. Nenhum envio ao GitHub é necessário para utilizar o ZIP.

## Antes de modificar

O lockfile registra as versões utilizadas. Use `npm ci` para reinstalar as mesmas dependências. O comando de build faz a checagem de TypeScript antes de compilar o site.

O projeto é estático. O formulário não armazena dados, não faz disparos automáticos e não tem integração com CRM. As condições finais de uma negociação continuam sendo definidas na proposta e no contrato.

## Conferência realizada

- Compilação de produção com checagem estrita de TypeScript.
- Inspeção visual em desktop, celular e largura de tablet.
- Layout sem transbordamento horizontal nos tamanhos conferidos.
- Navegação do menu móvel e fechamento ao selecionar uma seção.
- Passagem automática de fotografias sem clique e ausência de controles visuais no carrossel.
- Seleção de etapa por clique e teclado, preservada da primeira edição.
- Destino e mensagem do balão de WhatsApp conferidos sem enviar mensagem.
- Vetores de Instagram e WhatsApp comparados aos SVGs originais do catálogo; links externos e foco do ícone no menu móvel conferidos.
- Abertura de respostas do FAQ.
- Preenchimento do formulário e geração do e-mail com destinatário e conteúdo corretos, sem envio de mensagem durante os testes.
- Verificação de erros de aplicação no console da prévia.
- Conferência das dimensões e da integridade da imagem OG e dos arquivos responsivos.
- Revisão da tipografia sem serifa em desktop e celular, incluindo menu móvel e tela de 320 px.
- Conferência do brasão no favicon e exportações PNG, SVG, ICO e Apple Touch Icon.

A compilação entregue corresponde aos arquivos-fonte incluídos no pacote.
