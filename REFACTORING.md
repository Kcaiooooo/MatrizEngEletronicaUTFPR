# Análise e refatoração em develop

Base analisada: commit `d9f78da`. Não há publicação nem alteração de `main` nesta etapa.

## Funcionamento identificado

A página inicial aponta para 13 matrizes. Cada matriz define catálogos de
disciplinas e grupos, cria nós no DOM e desenha conexões SVG entre pré-requisitos.
O estado da disciplina pode ser bloqueado, disponível, em andamento, concluído ou
satisfeito por um grupo. A alteração de uma disciplina ou do período recalcula
dependências e indicadores; listas de atividades complementam as cargas horárias.

O histórico PDF é lido no navegador pelo PDF.js. O código procura seções,
aprovações e equivalências e atualiza os estados. O analisador percorre dependências
para estimar impacto de disciplinas. O compartilhamento lê indicadores da interface
e gera um cartão em canvas. Temas, preferências e progresso são persistidos localmente.
Analytics e o formulário de solicitação de cursos são integrações externas distintas.

## Problemas tratados

| Evidência no código original | Alteração |
| --- | --- |
| HTMLs de até 6.741 linhas misturavam conteúdo, estilos, dados e lógica | Extração para CSS, módulos de dados e controladores por curso |
| Doação, análise de prioridade e compartilhamento repetidos | Implementações compartilhadas; Radiologia mantém sua variação de compartilhamento |
| Temas repetidos com acesso direto ao armazenamento | Um controlador de temas e adaptador que trata falhas de armazenamento |
| Civil e duas matrizes de Automação compartilhavam uma chave; Mecânica, Mecatrônica e Administração compartilhavam outra | Chaves por matriz com fallback legado, backup e preservação do registro original |
| `JSON.parse` sem tratamento e nós sem estado quando faltavam registros no save | Validação de estrutura e inicialização completa antes de restaurar estados |
| Descrição digitada de atividade interpolada em `innerHTML` | Criação de elementos com `textContent`, sem interpretar a descrição como HTML |
| Cada reset registrava outro listener no seletor de período | Um único manipulador `oninput` e reinicialização do período |
| Engenharia de Produção declarava duas vezes a mesma constante e não declarava referências ao DOM | Remoção da duplicata e restauração das referências aos elementos existentes |
| Tailwind processado no navegador via Play CDN | CSS estático gerado por CLI, com versão e dependências fixadas no lockfile |
| Ausência de comandos padronizados e testes versionados | Servidor local, build, testes unitários e testes Playwright |
| Formulário anunciava entrega por timeout e apagava dados mesmo em falhas | Mensagens baseadas na resposta/timeout, sem prometer entrega e preservando os campos |
| Grupo satisfeito apagava a marcação de disciplinas em andamento | Preservação de `-inprogress` nas 13 matrizes |

Os dados curriculares foram comparados por SHA-256 dos objetos serializados
extraídos da versão original. Os 13 catálogos, grupos e dependências permanecem
iguais; esta etapa não é uma auditoria da correção acadêmica das matrizes.

## Compatibilidade de armazenamento

O formato dos registros continua incluindo `nodesState`, `humanitiesNodesState`,
`optionalNodesState`, `currentPeriod`, `completedAcActivities` e
`completedCceActivities`, quando aplicáveis. Campos adicionais e IDs desconhecidos
são mantidos na gravação; registros inválidos são preservados no backup antes de
ser substituídos por um estado válido. A leitura, isoladamente, não migra nem apaga dados.

| Matriz | Chave de progresso após esta etapa | Fallback legado |
| --- | --- | --- |
| Administração | `skillTreeProgress_Mecatronica_administracao` | `skillTreeProgress_Mecatronica` |
| Mecânica | `skillTreeProgress_Mecatronica_mecanica` | `skillTreeProgress_Mecatronica` |
| Mecatrônica | `skillTreeProgress_Mecatronica_mecatronica` | `skillTreeProgress_Mecatronica` |
| Automação | `skillTreeProgress_Automacao_automacao` | `skillTreeProgress_Automacao` |
| Automação Matriz 2 | `skillTreeProgress_Automacao_automacao-matriz-2` | `skillTreeProgress_Automacao` |
| Engenharia Civil | `skillTreeProgress_Automacao_engenharia-civil` | `skillTreeProgress_Automacao` |

As demais chaves não foram renomeadas. Preferências de brilho das seis matrizes
seguem o mesmo isolamento. Tema e data de exibição da doação continuam globais.

O fallback copia o registro disponível; ele não consegue recuperar dados que
tenham sido sobrescritos antes desta refatoração. Quando o registro legado contém
IDs de outro curso, somente IDs presentes na matriz são aplicados à interface.
Atividades e período do legado não carregam identificação de curso, portanto são
preservados na primeira leitura em vez de tentar adivinhar a origem.

O reset salva um objeto vazio na chave atual para impedir que o fallback restaure
o progresso apagado. O backup original e os outros cursos permanecem intactos.
Se não houver espaço/permissão para o backup, a gravação persistente é interrompida;
as mudanças ficam em memória e o site exibe um aviso. O backup não deve ser removido
em uma limpeza de armazenamento futura sem um procedimento de recuperação.

## Validação e limites

Resultado final de `npm run check` em 06/09/2026: build concluído, **23 testes
unitários e 25 testes de navegador aprovados**. `git diff --check` também passou.

Os testes cobrem as 13 matrizes com históricos fictícios no formato legado,
disciplinas concluídas/em andamento, período, atividades existentes, recarga,
abas e analisador. Há testes específicos para isolamento entre cursos, reset,
JSON inválido, armazenamento bloqueado, descrição contendo HTML, temas em tela
móvel, geração do cartão e importação de PDF sintético.

Isso não prova compatibilidade com todo PDF histórico real ou combinação de
equivalências. Antes de publicar, é recomendável testar também uma amostra de
históricos reais fornecidos com consentimento, em uma prévia na `develop`.

## Próximas etapas propostas

1. Extrair o cálculo de pré-requisitos, progresso e parsing de histórico para
   funções puras compartilhadas, com casos de equivalência específicos de cada matriz.
   Hoje os controladores ainda têm duplicação; unificá-los sem essa cobertura
   aumentaria o risco de mudar regras acadêmicas.
2. Oferecer exportação/importação explícita de progresso em JSON e recuperação do
   backup para que o usuário tenha uma cópia fora do navegador.
3. Substituir handlers HTML restantes por eventos e melhorar navegação por teclado,
   foco e fechamento dos modais. O tema já usa listeners registrados em JavaScript.
4. Revisar a dependência PDF.js atualmente fixada em 3.11.174 no CDN e testar uma
   atualização separadamente. Considerar carregamento sob demanda e distribuição local.
5. Obter confirmação verificável de entrega do backend do formulário. A interface
   agora informa essa limitação e mantém os campos, inclusive quando o iframe responde.
6. Usar dados de estado diretamente no cartão de compartilhamento, evitando
   extrair números de textos formatados no DOM.

Referências: [Tailwind CLI](https://v3.tailwindcss.com/docs/installation),
[localStorage e suas exceções](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage),
[textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

## Revisão CodeRabbit

O CodeRabbit revisou as alterações locais, incluindo arquivos novos, e levantou
**23 issues: 8 major e 15 minor**. Triagem: 11 tratados, 3 não reproduzidos/não
aplicáveis, 1 ajuste visual adiado por risco de sobreposição e 8 itens de dados
curriculares reservados para conferência com fontes oficiais. Não houve uma segunda
revisão remota; os ajustes foram validados pelos testes locais.

### ⚠️ Major

| Arquivo | Apontamento | Decisão |
| --- | --- | --- |
| `assets/js/courses/engenharia-de-producao.js` | Prefixo de período inconsistente | Tratado com parser compartilhado para `Periodo:` e `Período:` |
| `assets/js/shared/course-request.js` | Sucesso fictício de envio e perda dos campos | Tratado; resposta do iframe não é confundida com confirmação de entrega |
| `assets/js/courses/radiologia.js` | Celebração diverge da soma mostrada na barra | Tratado alinhando a soma; atualmente humanidades é um catálogo vazio |
| `assets/js/courses/administracao.js` | Fallback poderia ler progresso de Mecatrônica | Não aplicada a remoção sugerida: o HTML original de Administração efetivamente usava essa chave. Removê-la descartaria seu histórico. Ambiguidade do legado está documentada acima |
| `assets/js/courses/m3.js` | Suposta duplicação de cabeçalhos no resize | Não reproduzido: `renderTree` limpa todo o conteúdo antes de `renderOptionalTrackHeaders`; teste de redimensionamento cobre isso |
| `assets/css/curriculum.css` e layouts | `min-height` prevalece sobre `height` móvel | Constatação válida, mas não aplicado `min-height: 0`: a 844px de altura, nós ELP62/ELF52 da M2 ficariam separados por 57px, menores que seus 75px de altura. Revisar dimensões responsivas por matriz antes de reduzir a área |
| `assets/js/data/automacao-matriz-2.js` | Trilhas/grupos referenciam IDs ausentes | Pendente de auditoria acadêmica: conferir matriz oficial antes de incluir/remover disciplinas ou alterar grupos |
| `assets/js/data/eletrica.js` | IDs aparentemente incorretos e trilhas incompletas | Pendente de auditoria acadêmica: conferir códigos e catálogos oficiais; não remover requisitos só para tornar uma trilha concluível |

### ℹ️ Minor

| Arquivo | Apontamento | Decisão |
| --- | --- | --- |
| `tests/unit/site.test.mjs` | Teste não detectava script inline com atributos | Tratado |
| `assets/js/shared/sharing.js` e variante | Botão preso se `toBlob` retornar null | Tratado e testado |
| `assets/js/shared/storage.js` | Entrada nula na gravação lançava exceção | Tratado e testado |
| `assets/js/courses/engenharia-de-producao.js` | Cálculo/log de trilha não usados na conclusão | Removidos mantendo a condição de conclusão original |
| `assets/js/courses/m2.js` | Mensagem de pré-requisito não aceitava acento | Tratado |
| `assets/js/courses/mecanica.js` e demais | Grupo completo apagava estado em andamento | Tratado e testado, inclusive após recarga |
| `assets/js/shared/course-request.js` | Acessos a elementos ausentes e variável sem uso | Tratado |
| `assets/js/shared/donation.js` | Dia calculado em UTC | Tratado: usa data local, mantendo a chave existente |
| `assets/js/data/mecanica.js` | Coordenadas brutas maiores que 100 | Não aplicável: `normalizeOptionalLayout` converte para o intervalo configurado; teste verifica máximo de 92% no DOM |
| `assets/js/data/engenharia-ambiental.js` | Grafia de três disciplinas | Conferir nomes oficiais em auditoria separada |
| `assets/js/data/mecatronica.js` | Nomes truncados/concatenados e grafia | Conferir nomes oficiais em auditoria separada |
| `assets/js/data/automacao.js` | Grupo [1146] com 134h | Conferir valor oficial; não inferir carga por comparação com outros grupos |
| `assets/js/data/automacao.js` | ELT7EB sem requisito de período | Conferir requisito oficial antes de restringir disponibilidade |
| `assets/js/data/m2.js` | Período de ELE91 e ausência de `chs` | Conferir matriz oficial; dados mantidos |
| `assets/js/data/m2.js` | Período de ELP32 diverge da posição visual | Conferir matriz oficial; dados mantidos |
