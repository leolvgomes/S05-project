// Componente da atividade "Componentes e Formulários".
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.hoje = 'ter'; // Mantido como no exemplo do professor, para exibir as três aulas.
  }

  connectedCallback() { this.loadData(); }

  async loadData() {
    try {
      const response = await fetch('./aulas.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const aulas = await response.json();
      this.render(aulas);
    } catch (error) {
      console.error('Erro ao carregar os dados das aulas:', error);
      this.shadowRoot.innerHTML = '<p class="mensagem-erro">Não foi possível carregar as aulas. Abra o site pelo GitHub Pages ou por um servidor local.</p>';
    }
  }

  corDaNota(nota) {
    const valor = Number(String(nota).replace(',', '.'));
    if (valor < 6) return 'lable-nota-vermelho';
    if (valor < 8) return 'lable-nota-laranja';
    return 'lable-nota-verde';
  }

  render(aulas) {
    const aulasDia = aulas.filter(a => a.data === this.hoje);
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="styles_componente.css">
      <div>
        ${aulasDia.map(a => `
          <div class="comp-aula">
            ${a.prova_alert ? `<div class="lable-prova p_lable">PROVA: <b>${a.prova}</b></div>` : ''}
            <div class="titulo_aula">${a.disciplina}</div>
            <p>Local e Horário: <b>${a.local} - ${a.horario}</b></p>
            <div class="lables">
              <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
              <div class="lable-nota p_lable ${this.corDaNota(a.nota)}">CR: <b>${a.nota}</b></div>
            </div>
          </div>`).join('') || '<p>Nenhuma aula encontrada para o dia selecionado.</p>'}
      </div>`;
  }
}
customElements.define('aulas-component', AulasComponent);
