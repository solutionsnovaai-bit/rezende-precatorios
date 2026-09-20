# Carregamento e efeitos

## Assets

- Fotografias do carrossel e da seção sobre em WebP, com versões de 640, 960 e 1448 px selecionadas pelo navegador via `srcset` e `sizes`.
- As dez variantes de 640 px somam aproximadamente 402 KiB; as de 960 px somam 750 KiB. São alternativas de tamanho, não downloads obrigatórios de todas as versões.
- Hero desktop: 194 KiB; hero móvel: 92 KiB. O `picture` e os preloads condicionais selecionam a versão apropriada.
- Logotipo WebP: 39 KiB. As camadas da abertura reutilizam o bitmap inteiro na mesma URL, com aproveitamento do cache do navegador; não há nova imagem para cada quadro da animação.
- As duas fontes utilizadas na página (Manrope e Cormorant itálica) somam aproximadamente 48 KiB, com `font-display: swap` e preload local. O arquivo Cormorant regular permanece disponível no pacote, sem uso na nova hierarquia.
- OG PNG: 470 KiB, 1200 × 630 px. É utilizada pelos robôs de compartilhamento; não é carregada na página como imagem de conteúdo.
- O inventário completo está em `assets-manifest.json`.

## Código compilado

Valores aproximados calculados no build entregue, antes da configuração da hospedagem:

| Recurso | Arquivo | Com gzip |
| --- | ---: | ---: |
| JavaScript principal | 363,5 KiB | 116,6 KiB |
| CSS | 44,6 KiB | 10,4 KiB |
| Lenis, chunk separado | 18,3 KiB | 5,3 KiB |

A entrega contém arquivos comuns. A compressão HTTP depende da hospedagem; os números de gzip acima representam o potencial de compressão, não uma configuração de servidor incluída.

## Comportamento

As fotos abaixo do hero têm carregamento adiado e decodificação assíncrona. A galeria prepara apenas a próxima imagem quando está visível, evitando esse preparo em economia de dados ou redes identificadas como 2G. A reprodução automática é o padrão, a cada 3,4 segundos, e pausa durante arraste ou foco de teclado, fora da área visível e com a aba oculta. As faixas de palavras e fotografias também param fora da tela. O rodapé permite pausar o movimento automático da experiência inteira.

O Lenis é importado depois da abertura, somente para ponteiro preciso com hover e sem preferência por movimento reduzido. Seu ciclo de animação funciona sob demanda e para quando a rolagem termina. O toque mantém a rolagem nativa. Se o chunk opcional falhar, a navegação nativa continua disponível.

O parallax do hero usa transformações suaves. A foto da seção sobre faz uma aproximação discreta uma única vez. A abertura usa revelação contínua do bitmap real, com opção de pular e timeout independente da animação. A transparência do fundo do logo é aplicada por filtro na renderização, sem alterar o arquivo fornecido. Não há vídeo de fundo, dependência de fontes remotas ou cursor decorativo.

## Validação e limites

Build de produção e TypeScript concluídos. Inspeção visual em desktop e larguras móveis, com carrossel, menu e referências dos assets conferidos. O navegador confirmou o uso do hero móvel e das fotos de 640 px na largura móvel inspecionada.

Estas otimizações reduzem o trabalho e os downloads necessários. O tempo final depende da hospedagem, rede e dispositivo. Não foi atribuído um resultado Lighthouse nem prometida uma pontuação de desempenho sem medição na hospedagem final.

## Segunda edição

A faixa de imagens e a composição fotográfica reutilizam os WebP já presentes. Nenhuma biblioteca adicional foi instalada nesta revisão. As imagens são carregadas conforme se aproximam da área visível, incluindo as miniaturas em 640 px. Motion e Lenis foram reaproveitados. A OG não foi modificada.

## Ícones sociais e abertura

Os dois glifos são caminhos SVG locais e não geram requisições a CDN nem exigem nova biblioteca. O contador da abertura foi removido, eliminando o ciclo de atualização de porcentagem. As imagens do logo só ficam visíveis depois de carregadas, evitando artefatos do filtro durante o carregamento. Permanecem o botão de pular, o limite de espera e a preferência por movimento reduzido.
