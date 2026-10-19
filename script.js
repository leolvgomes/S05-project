// Menu e temas do dashboard original
const menu = document.getElementById('menu_aba');
document.getElementById('abrirMenu').addEventListener('click', () => menu.hidden = false);
document.getElementById('fecharMenu').addEventListener('click', () => menu.hidden = true);
document.querySelectorAll('[data-tema]').forEach(botao => {
  botao.addEventListener('click', () => {
    document.documentElement.dataset.tema = botao.dataset.tema;
    menu.hidden = true;
  });
});

// Carrossel de eventos, conforme a referência da aula.
const eventos = [
  { title:'Semana do Software 2025', date:'12/05', time:'10:00', location:'Salão de Eventos', description:'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.', image:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400' },
  { title:'Workshop de IoT', date:'12/01', time:'08:00', location:'Laboratório CS&I', description:'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.', image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400' },
  { title:'Festa dos Alunos 2025', date:'18/05', time:'19:00', location:'Área Esportiva', description:'Venha comemorar a melhor Festa dos Alunos de todos os tempos!', image:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400' },
  { title:'Feira de Oportunidades', date:'04/05', time:'10:00', location:'Salão de Eventos', description:'Venha conhecer empresas e projetos com destaque na área da engenharia.', image:'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400' }
];
const carousel = document.querySelector('.carousel');
carousel.innerHTML = eventos.map(e => `<article class="card"><img src="${e.image}" alt="${e.title}"><div class="info"><h3>${e.title}</h3><p>${e.description}</p><p>${e.date} às ${e.time} • ${e.location}</p></div></article>`).join('');
let index = 0;
function updateCarousel() { carousel.style.transform = `translateX(-${index * 100}%)`; }
function nextCard() { index = (index + 1) % eventos.length; updateCarousel(); }
function prevCard() { index = (index - 1 + eventos.length) % eventos.length; updateCarousel(); }
document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);
setInterval(nextCard, 5000);
let startX = 0;
carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive:true});
carousel.addEventListener('touchend', e => { const delta = startX - e.changedTouches[0].clientX; if(delta > 50) nextCard(); if(delta < -50) prevCard(); }, {passive:true});

// Demonstração de reserva de armários (dados simulados, sem backend).
const usuario = {nome:'Raphael', matricula:'123456', pendencia:false, acessibilidade:true};
const armarios = [
  {id:1,formato:'padrao',status:true,acessivel:false},
  {id:2,formato:'padrao',status:true,acessivel:false},
  {id:3,formato:'padrao',status:true,acessivel:false},
  {id:4,formato:'padrao',status:false,acessivel:true},
  {id:5,formato:'padrao',status:false,acessivel:true},
  {id:6,formato:'duplo',status:true,acessivel:true},
  {id:7,formato:'duplo',status:false,acessivel:true},
  {id:8,formato:'duplo',status:false,acessivel:true}
];
let tipoSelecionado = null;
document.querySelectorAll('.tipo').forEach(botao => botao.addEventListener('click', () => {
  document.querySelectorAll('.tipo').forEach(b => b.classList.remove('selected'));
  botao.classList.add('selected');
  tipoSelecionado = botao.dataset.value;
}));
document.getElementById('reservarBtn').addEventListener('click', () => {
  const resultado = document.getElementById('resultado');
  const numero = document.getElementById('armarioNumero');
  numero.style.display = 'none';
  if(!tipoSelecionado) { resultado.textContent = 'Por favor, selecione um tipo de armário antes de reservar.'; return; }
  const disponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status && a.acessivel === usuario.acessibilidade);
  if(!disponiveis.length) { resultado.textContent = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`; return; }
  const armario = disponiveis[Math.floor(Math.random() * disponiveis.length)];
  armario.status = false;
  const agora = new Date();
  const entrega = new Date(agora.getTime() + 86400000);
  usuario.pendencia = true;
  numero.textContent = `Armário Nº ${armario.id}`;
  numero.style.display = 'block';
  resultado.textContent = `Data da reserva: ${agora.toLocaleString('pt-BR')}\nData de entrega: ${entrega.toLocaleString('pt-BR')}`;
});
