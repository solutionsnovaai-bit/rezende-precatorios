# Entrega — Rezende Precatórios

## Direção visual

Uma experiência editorial com azul profundo, dourado discreto, papel claro, tipografia serifada expressiva e fotografia em grande escala. O logotipo fornecido é usado sem redesenho. Os heros têm versões para desktop e celular.

## Fluxos

1. A abertura forma a moldura, as colunas, a seta e o nome usando máscaras sobre o mesmo bitmap original. Não redesenha o logo. Pode ser pulada; tem saída automática com limite de espera de 4,5 segundos, seguido da transição. Usuários com preferência por movimento reduzido seguem diretamente ao conteúdo.
2. O CTA principal leva à seção de contato.
3. O carrossel tem nove imagens, botões anterior/próxima, seleção direta, arraste horizontal e setas do teclado. A reprodução automática só começa quando solicitada e pausa fora da área visível, com a aba oculta ou durante interação.
4. As quatro etapas podem ser exploradas por clique ou teclado.
5. O FAQ abre uma resposta por vez.
6. O formulário valida o preenchimento e prepara um e-mail. O visitante conclui o envio no aplicativo de e-mail. Há alternativa para copiar a mensagem.
7. O Lenis suaviza a rolagem no desktop e encerra o ciclo de animação quando fica ocioso. A rolagem por toque permanece nativa. Ao abrir o menu móvel, a instância é desmontada para preservar a navegação.

## Identidade e compartilhamento

- Sete seções principais: hero, possibilidades, galeria, processo, sobre, perguntas frequentes e contato; além da faixa de confiança e do rodapé.
- Galeria e contato com fundo azul profundo; áreas claras e fotografia equilibram o contraste.
- Rodapé com logo original, © 2026 e CNPJ 13.794.443/0001-43.
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
- Troca de imagem no carrossel e seleção de etapa por clique e teclado.
- Abertura de respostas do FAQ.
- Preenchimento do formulário e geração do e-mail com destinatário e conteúdo corretos, sem envio de mensagem durante os testes.
- Verificação de erros de aplicação no console da prévia.
- Conferência das dimensões e da integridade da imagem OG e dos arquivos responsivos.

A compilação entregue corresponde aos arquivos-fonte incluídos no pacote.
