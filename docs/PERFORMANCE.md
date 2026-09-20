# Carregamento e efeitos

## Assets

- Fotografias do carrossel e da seção sobre em WebP, com versões de 640, 960 e 1448 px selecionadas pelo navegador via `srcset` e `sizes`.
- As dez variantes de 640 px somam aproximadamente 402 KiB; as de 960 px somam 750 KiB. São alternativas de tamanho, não downloads obrigatórios de todas as versões.
- Hero desktop: 194 KiB; hero móvel: 92 KiB. O `picture` e os preloads condicionais selecionam a versão apropriada.
- Logotipo WebP: 39 KiB. Os recortes da abertura reutilizam a mesma URL, com aproveitamento do cache do navegador.
- Três fontes WOFF2 locais: aproximadamente 70 KiB no total, com `font-display: swap`. As duas fontes principais são pré-carregadas.
- OG PNG: 470 KiB, 1200 × 630 px. É utilizada pelos robôs de compartilhamento; não é carregada na página como imagem de conteúdo.
- O inventário completo está em `assets-manifest.json`.

## Código compilado

Valores aproximados calculados no build entregue, antes da configuração da hospedagem:

| Recurso | Arquivo | Com gzip |
| --- | ---: | ---: |
| JavaScript principal | 356 KiB | 114 KiB |
| CSS | 34,5 KiB | 8,6 KiB |
| Lenis, chunk separado | 18,3 KiB | 5,3 KiB |

A entrega contém arquivos comuns. A compressão HTTP depende da hospedagem; os números de gzip acima representam o potencial de compressão, não uma configuração de servidor incluída.

## Comportamento

As fotos abaixo do hero têm carregamento adiado e decodificação assíncrona. A galeria prepara apenas a próxima imagem quando está visível, evitando esse preparo em economia de dados ou redes identificadas como 2G. A reprodução automática é opcional e pausa durante interação, fora da área visível e com a aba oculta.

O Lenis é importado depois da abertura, somente para ponteiro preciso com hover e sem preferência por movimento reduzido. Seu ciclo de animação funciona sob demanda e para quando a rolagem termina. O toque mantém a rolagem nativa. Se o chunk opcional falhar, a navegação nativa continua disponível.

O parallax do hero usa transformações suaves. A foto da seção sobre faz uma aproximação discreta uma única vez. A abertura usa máscaras do bitmap real, com opção de pular e timeout independente da animação. Não há vídeo de fundo, dependência de fontes remotas ou cursor decorativo.

## Validação e limites

Build de produção e TypeScript concluídos. Inspeção visual em desktop e larguras móveis, com carrossel, menu e referências dos assets conferidos. O navegador confirmou o uso do hero móvel e das fotos de 640 px na largura móvel inspecionada.

Estas otimizações reduzem o trabalho e os downloads necessários. O tempo final depende da hospedagem, rede e dispositivo. Não foi atribuído um resultado Lighthouse nem prometida uma pontuação de desempenho sem medição na hospedagem final.
