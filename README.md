# K-Matrizes UTFPR

Matrizes curriculares interativas: disciplinas obrigatórias, humanidades, optativas,
pré-requisitos, período atual, atividades, importação de histórico em PDF e cartão
de progresso. O site continua estático, sem backend ou framework obrigatório.

## Licença

O código original deste projeto, na medida em que seus direitos pertencem aos
contribuidores, é licenciado sob [CC BY-SA 4.0](LICENSE). É permitido copiar,
modificar e redistribuir o material, inclusive para fins comerciais, desde que
se dê crédito aos contribuidores, sejam indicadas as alterações, esta licença
seja incluída e adaptações compartilhadas sejam distribuídas sob a mesma licença.
Consulte [CONTRIBUTORS.md](CONTRIBUTORS.md) e o histórico Git para os créditos.

O projeto pode receber doações e financiamento voluntários, e a versão oficial
manterá todas as funcionalidades acessíveis sem paywall, assinatura ou doação
obrigatória. Essa é uma política do projeto oficial: a CC BY-SA 4.0 permite uso
comercial e não impede, por si só, que terceiros cobrem pelo acesso a uma cópia
hospedada. Ela exige que os direitos sobre o material licenciado e suas
adaptações sejam mantidos nos termos da licença.

A Creative Commons recomenda não usar suas licenças para software, pois elas não
tratam especificamente da distribuição de código-fonte e de patentes. Esta
licença foi escolhida para refletir os requisitos de atribuição e
compartilhamento pela mesma licença deste projeto.

A licença cobre somente o código original cujos direitos pertencem aos
contribuidores. Ela não cobre materiais de terceiros ou conteúdo oficial da
UTFPR, nem transfere direitos sobre marcas, patentes, imagem ou privacidade. Em
particular, ficam fora do escopo `docs/`, `assets/matrizes/`, `assets/js/data/`,
`data/portal-aluno/`, `assets/audio/` e `assets/imagens/`, além de qualquer
conteúdo de terceiros incorporado em outros arquivos.

## Estrutura

- `index.html` e `pages/`: conteúdo e estrutura das páginas; URLs existentes preservadas.
- `assets/js/data/`: catálogos e configurações específicas de cada matriz.
- `assets/js/courses/`: regras e renderização de cada curso, ainda com diferenças entre matrizes.
- `assets/js/shared/`: armazenamento, temas, atividades, análise de prioridade,
  compartilhamento, doação, analytics e formulários.
- `data/portal-aluno/` e `scripts/sync-portal-aluno.mjs`: fonte oficial do
  Sistema Acadêmico UTFPR, com catálogo de câmpus/cursos e snapshots versionados.
- `assets/js/shared/grade-core.js`: normalização, contagem e comparação das
  disciplinas entre versões.
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

## Turmas abertas

A página [Turmas Abertas](pages/Turmas%20Abertas.html) usa exclusivamente o
relatório de Turmas Abertas do Sistema Acadêmico UTFPR. Ela consulta os JSONs
versionados no repositório; não acessa o Portal do Aluno e não faz matrícula.

Com `--all`, o coletor consulta todos os câmpus e cursos descobertos no sistema.
A página de seleção é pública, mas o relatório exige autenticação. O próprio
usuário faz o login na janela aberta; a sessão fica em
`.local/utfpr-portal-profile`, fora do Git, e nenhuma senha é lida ou armazenada
pelo script:

```sh
npm run sync:portal-aluno
```

Depois do primeiro login, o comando pode ser executado sem interface na mesma máquina:

```sh
npm run sync:portal-aluno -- --headless
npm run sync:portal-aluno:all -- --headless
```

Para redescobrir o catálogo sem coletar todos os cursos:

```sh
npm run sync:portal-aluno -- --discover
```

O fluxo no Git é deliberadamente estático: o coletor roda em uma máquina
autorizada, grava apenas `data/portal-aluno/source-catalog.json`, o manifesto e
os snapshots que mudaram, e esses arquivos são commitados na branch `develop`.
O site publicado apenas lê esses JSONs. Se a coleta encontrar exatamente o
mesmo conteúdo, o manifesto atualiza somente `lastCheckedAt` e nenhuma nova
versão é criada.

O perfil autenticado nunca deve ser commitado. Uma atualização diária pode ser
feita por uma máquina autorizada ou runner próprio com essa sessão mantida; o
GitHub Actions hospedado não possui a sessão do Portal do Aluno e não deve
receber a senha acadêmica.

O relatório é interpretado por coluna, preservando separadamente horário, sala
e professor. Em Curitiba, a legenda oficial indica `*` para Ecoville, `**` para
Neoville e ausência de marcador para Centro. Os relatórios verificados dos
demais câmpus não publicaram uma regra de sede equivalente; nesses casos a sala
é preservada, mas a sede fica sem preenchimento.

Na página de Turmas Abertas, cada turma pode ser marcada em “Adicionar ao
calendário”. A seleção monta uma visão semanal com turno, início, término, salas
e sedes; os códigos `2M1` a `7N5` seguem o padrão do sistema (segunda a sábado,
períodos `M`, `T` e `N`). Como a escolha é feita por turma, conflitos de horário
são mantidos visíveis na mesma célula. O calendário fica salvo no navegador e
continua disponível ao trocar de câmpus ou curso; o botão “Limpar seleção” o
remove. Turmas com horários conflitantes não podem ser selecionadas, e a
pré-visualização da turma pinta horários livres e conflitantes na minigrade
lateral. O limite padrão é de 40 aulas por semana, ajustável pelo usuário; ao
ultrapassá-lo, o site sinaliza o excesso sem apagar as escolhas.

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
