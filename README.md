# Rezende Precatórios

Site institucional premium em React, TypeScript, Vite e Tailwind CSS, com os materiais originais da marca, animações Motion, rolagem Lenis e fontes hospedadas no próprio projeto.

## Comece aqui

Requisito: Node.js 22 LTS ou superior compatível e npm.

```bash
npm ci
npm run dev
```

Abra o endereço que o terminal exibir. O servidor usa a porta 4173.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

O ZIP também contém a pasta `dist/` já compilada. Para publicar em uma hospedagem estática, envie **o conteúdo** de `dist/` para a raiz pública do domínio. O site deve ser servido por HTTP/HTTPS; não abra o `index.html` diretamente com `file://`.

Em plataformas que compilam o código automaticamente, selecione Vite, use `npm run build` e defina `dist` como diretório de saída. O projeto funciona sem variáveis de ambiente, usando `https://rezendeprecatorios.com.br` como domínio canônico.

**Se publicar em outro domínio:** copie `.env.example` para `.env`, ajuste `VITE_SITE_URL` com a origem pública completa (por exemplo, `https://seu-dominio.com.br`) e rode o build novamente. Isso atualiza os endereços absolutos de Open Graph, Twitter e canonical. A imagem social está em `public/og.png`, com 1200 × 630 px e o logotipo original. Para a prévia social funcionar, o domínio e `/og.png` precisam estar acessíveis publicamente após a publicação.

## Estrutura

```text
rezende-precatorios/
├── index.html                 Entrada e metadados
├── src/
│   ├── App.tsx                Componentes, seções e interações
│   ├── content.ts             Textos, contato, carrossel, etapas e FAQ
│   ├── assets.ts              Tamanhos responsivos das fotografias
│   ├── components/            Abertura, logo, galeria, cenas e WhatsApp
│   ├── hooks/                 Lenis, movimento e atividade das cenas
│   ├── fonts.css              Fontes WOFF2 locais
│   ├── main.tsx               Inicialização do React e fontes locais
│   ├── styles.css             Identidade visual e responsividade
│   ├── motion.css             Efeitos e composições
│   └── typography.css         Hierarquia sem serifa e escalas responsivas
├── public/
│   ├── images/                Logo, heros e fotografias em WebP
│   ├── fonts/                 Três arquivos de fonte locais
│   └── og.png                 Imagem de compartilhamento, 1200 × 630
├── dist/                      Site compilado para publicação
├── docs/
│   ├── ENTREGA.md             Comportamento e observações da entrega
│   ├── PERFORMANCE.md         Estratégia de carregamento e pesos
│   └── assets-manifest.json   Inventário de assets e tamanhos em bytes
├── package.json
├── package-lock.json          Versões reproduzíveis das dependências
├── tsconfig.json
└── vite.config.ts
```

## Personalização

- **Textos e dados de contato:** `src/content.ts`; os títulos de algumas seções estão em `src/App.tsx`.
- **Cores, tipografia e espaçamentos:** `src/styles.css`, `src/motion.css` e `src/typography.css`.
- **Instagram:** `instagram` e `instagramHandle` em `src/content.ts`; link na navbar, fora do menu móvel, e no rodapé.
- **WhatsApp:** número oficial `5511960387793`, informado pelo responsável, em `src/content.ts`. Pode ser substituído por `VITE_WHATSAPP_NUMBER` antes do build. O balão abre uma conversa com mensagem inicial; o visitante confirma o envio no WhatsApp.
- **Velocidade do carrossel:** constante `INTERVAL` em `src/components/AutoGallery.tsx` (3400 ms).
- **Palavras do hero:** lista `words` em `src/components/MotionScenes.tsx` (troca a cada 2800 ms).
- **Fotografias:** `public/images/`. Preserve os nomes ou atualize as referências.
- **Ícone da aba:** `public/images/favicon-rezende.svg`, com enquadramento do brasão original, sem redesenho. Inclui PNG de 16/32 px, `public/favicon.ico` com 16/32/48 px e `public/apple-touch-icon.png` de 180 px.
- **Título, descrição e metadados:** `index.html`.

Depois de alterar o código, execute `npm run build` novamente antes de publicar.

## Formulário: funcionamento real

O projeto não depende de um serviço externo de formulários nem possui um servidor de e-mail. Ele valida os campos, prepara a mensagem e oferece o botão **Abrir e-mail para enviar**, com o destinatário `contato@rezendeprecatorios.com.br` e o conteúdo preenchido. O visitante confirma o envio no próprio aplicativo de e-mail.

Existe também a opção de copiar a mensagem. Nenhuma confirmação de entrega é exibida, nenhum lead é armazenado e nenhum envio acontece automaticamente. Se desejar recebimento automático no futuro, conecte um endpoint de formulário de sua escolha; mantenha credenciais apenas no servidor.

## Recursos

- Tipografia principal Manrope, sem serifa; o destaque Cormorant fica restrito à palavra animada do hero.

- Abertura com o logotipo original em destaque, revelação contínua, perspectiva sutil e passagem de luz, sem recortes por peça, linhas de fundo ou contador. Pode ser pulada; saída normal a partir de 2,8 s e limite de espera de 4 s, seguido da transição de saída.
- Hero próprio para desktop e celular; parallax acompanha o mouse no desktop e palavras se alternam automaticamente.
- Logo da navbar integrado por transparência no navegador, mantendo o arquivo original intacto.
- Instagram na navbar e no rodapé; no celular, ícone ao lado do menu, sempre visível. Glifos SVG de Instagram e WhatsApp preservados conforme o catálogo Simple Icons, sem composição de ícones genéricos.
- Balão flutuante de WhatsApp com destino configurado.
- Cursor nativo, sem cursor decorativo.
- Lenis no desktop com ponteiro preciso, importação separada e animação somente durante a rolagem; toque e preferência por movimento reduzido usam rolagem nativa.
- Carrossel com nove fotografias em reprodução automática a cada 3,4 segundos, sem botão de play nem setas visíveis. Arraste e setas do teclado continuam disponíveis.
- Faixa de palavras em movimento, faixa fotográfica contínua e composição de três fotos com parallax no scroll.
- Etapas interativas, perguntas expansíveis e menu móvel com controle de foco.
- Animações de entrada, progresso de leitura e respeito a movimento reduzido. O botão “Pausar movimento”, no rodapé, interrompe o movimento automático da experiência.
- Navegação por teclado, campos rotulados, link para pular conteúdo e textos alternativos.
- Oito seções principais, com galeria e contato em azul profundo para contrastar com as áreas claras.
- Rodapé com o logotipo original, ano 2026 e CNPJ.
- Imagens WebP em 640, 960 e 1448 px para as fotografias, `srcset`, decodificação assíncrona e carregamento adiado abaixo da primeira tela.
- Pré-carregamento de apenas uma próxima fotografia quando a galeria está visível, respeitando economia de dados e conexões identificadas como lentas.
- Fontes locais, sem dependência de Google Fonts em tempo de execução.

## Conteúdo e materiais

Os dados comerciais, o e-mail, o CNPJ e a experiência informada foram baseados no material fornecido. O site apresenta condições de antecipação sujeitas à análise e formalização, sem inventar prazos de pagamento ou percentuais de valorização.

As fotografias são ilustrativas das possibilidades de uso do crédito. Logos e imagens foram fornecidos pelo responsável pelo projeto. As bibliotecas e as fontes mantêm suas próprias licenças.
