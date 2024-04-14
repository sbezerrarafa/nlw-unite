let participantes = [
  {
    nome: 'Diego Fernandes',
    email: 'diego@gmail.com',
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20),
  },
  {
    nome: 'Mayk Brito',
    email: 'mayk@gmail.com',
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20),
  },
  {
    nome: 'Ana Souza',
    email: 'ana@gmail.com',
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 0, 4, 20, 20),
  },
  {
    nome: 'João Silva',
    email: 'joao@gmail.com',
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: null,
  },
  {
    nome: 'Maria Oliveira',
    email: 'maria@gmail.com',
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 6, 20, 20),
  },
  {
    nome: 'Pedro Santos',
    email: 'pedro@gmail.com',
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 7, 20, 20),
  },
  {
    nome: 'Carla Lima',
    email: 'carla@gmail.com',
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20),
  },
  {
    nome: 'Lucas Sousa',
    email: 'lucas@gmail.com',
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 9, 20, 20),
  },
  {
    nome: 'Paula Costa',
    email: 'paula@gmail.com',
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: new Date(2023, 6, 10, 20, 20),
  },
  {
    nome: 'Gabriel Almeida',
    email: 'gabriel@gmail.com',
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: new Date(2023, 5, 11, 20, 20),
  },
];

let tableParticipante = document.querySelector('#table-participante tbody');

const criarNovoParticipante = (participante) => {
  let dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `<button 
    class="btn-checkin"
    data-email="${participante.email}" 
    onclick="fazerCheckin(event)">
    confirmar check-in 
    </button>`;
  }

  let linhaParticipantes = `
  <tr>
  <td> 
    <div class="info-participante">
      <p>${participante.nome}</p>
      <small>${participante.email}</small>
    </div>
  </td>
  <td>${dataInscricao} </td>
  <td>${dataCheckIn} </td>
  </tr>
  `;
  return linhaParticipantes;
};

const atualizarLista = (participantes) => {
  let output = '';
  participantes.forEach((participante) => {
    output = output + criarNovoParticipante(participante);
  });

  tableParticipante.innerHTML = output;
};

atualizarLista(participantes);

// adicionar um partipante uhuu
const formInscricao = document.getElementById('form-inscricao');

formInscricao.addEventListener('submit', (e) => {
  e.preventDefault();

  const dadosForm = new FormData(formInscricao);

  const novoParticipante = {
    nome: dadosForm.get('nome'),
    email: dadosForm.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  //verifica se particpante existe

  const participanteExiste = participantes.find((p) => {
    return p.email == novoParticipante.email;
  });

  if (participanteExiste) {
    alert('email já cadastrado');
    return;
  }
  participantes = [novoParticipante, ...participantes];
  atualizarLista(participantes);

  // participantes.push(novoParticipante);
  // atualizarLista(participantes);

  formInscricao.reset();
});

function fazerCheckin(event) {
  const msgConfirmacao = 'Tem certeza que deseja fazer check-in?';
  if (confirm(msgConfirmacao) == false) {
    return;
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });

  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
}
