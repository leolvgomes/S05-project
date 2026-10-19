# Dashboard App Inatel — Componentes e Formulários

Atividade de Interface Homem-Máquina (Princípios de Design), a partir do dashboard de referência da disciplina.

## Arquivos
- `index.html`: página principal
- `styles.css`: layout geral e temas
- `script.js`: menu, carrossel e reserva simulada
- `aulas.json`: dados das disciplinas
- `script_componente.js`: Web Component de aulas, carregamento por `fetch` e regra de cores
- `styles_componente.css`: estilos do componente no Shadow DOM

## Regra de cores da nota
- Menor que 6: vermelho
- De 6 a menos de 8: laranja
- A partir de 8: verde

A variável `this.hoje = 'ter'` foi mantida para demonstrar as três disciplinas do exemplo fornecido pelo professor. Para simular outros dias, altere essa variável e o campo `data` no JSON.

## Execução
Publique o projeto no GitHub Pages ou abra com Live Server (VS Code). Abrir `index.html` diretamente com `file://` pode impedir o `fetch` do JSON.

## GitHub Pages
1. Crie um repositório e envie todos os arquivos para a raiz.
2. Em **Settings > Pages**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
4. Acesse a URL disponibilizada pelo GitHub Pages e envie **somente essa URL** no Moodle.

O carrossel contém dados de eventos da referência (2025); não são eventos atuais. A reserva de armários é uma simulação em memória, sem persistência.
