# K-Matrizes UTFPR

Matrizes curriculares interativas: disciplinas obrigatórias, humanidades, optativas,
pré-requisitos, período atual, atividades, importação de histórico em PDF e cartão
de progresso. O site continua estático, sem backend ou framework obrigatório.

## Desenvolvimento

Requer Node.js 22 ou superior.

```sh
npm ci
npm run build
npm run dev
```

Abra <http://127.0.0.1:4173>. As alterações desta refatoração são desenvolvidas e
testadas na branch `develop`. Esses comandos não publicam o site.

## Estrutura

- `index.html` e `pages/`: conteúdo e estrutura das páginas; URLs existentes preservadas.
- `assets/js/data/`: catálogos e configurações específicas de cada matriz.
- `assets/js/courses/`: regras e renderização de cada curso, ainda com diferenças entre matrizes.
- `assets/js/shared/`: armazenamento, temas, atividades, análise de prioridade,
  compartilhamento, doação, analytics e formulários.
- `assets/css/`: estilos compartilhados e variações de layout. `utilities.css` é gerado.
- `tests/`: testes de dados curriculares, compatibilidade dos históricos e navegador.
- `scripts/serve.mjs`: servidor exclusivo para desenvolvimento local.

Ao alterar classes Tailwind em HTML ou JavaScript, execute `npm run build` e inclua
`assets/css/utilities.css` atualizado na alteração. A publicação estática existente
pode servir os arquivos diretamente, sem executar Node.js no servidor.

## Testes

```sh
npm test
npx playwright install chromium
npm run test:e2e
npm run check
```

Para usar um Chrome já instalado no Linux:

```sh
CHROMIUM_PATH=/usr/bin/google-chrome npm run test:e2e
```

Os testes de navegador usam contextos isolados e dados fictícios. O teste de PDF
utiliza a biblioteca real via CDN e exige internet. Analytics e fontes externas
são bloqueados nos testes; nenhum formulário é enviado. Um PDF sintético em
`tests/fixtures/history.pdf` não contém dados de alunos.

## Preservação dos históricos

O progresso continua no `localStorage`, vinculado à origem do site. Não altere
protocolo, domínio ou porta de produção ao publicar: uma origem diferente não
acessa o armazenamento da anterior. Uma prévia local terá seu próprio histórico.

As chaves exclusivas existentes continuam em uso. As seis matrizes que
compartilhavam chaves recebem chaves próprias, com leitura automática do legado.
O registro compartilhado antigo permanece intacto. Antes da primeira gravação ou
reset, o adaptador guarda a string original em
`<chave-de-progresso>:backup-before-refactor`. O backup é local e não substitui um
arquivo exportado pelo usuário.

Veja [REFACTORING.md](REFACTORING.md) para o diagnóstico, as chaves e as próximas etapas.
