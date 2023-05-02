const cells = document.querySelectorAll('.cell');
const cursoInput = document.getElementById('curso');
const periodoInput = document.getElementById('periodo');
const desafioInput = document.getElementById('desafio');
const salaInput = document.getElementById('sala');
const professorInput = document.getElementById('professor');
const horarioInput = document.getElementById('horario');

// seleciona o botão "Listar aulas salvas"
const listarBtn = document.getElementById('listarBtn');

// seleciona o modal e a div onde será exibido o conteúdo
const listaModal = document.getElementById('ListarModal');
const corpoModal = document.querySelector('.corpoM');

// adiciona um listener de click ao botão "Listar aulas salvas"
listarBtn.addEventListener('click', () => {
    // exibe o modal
    listaModal.style.display = 'block';
  
    // seleciona a div onde será exibido o conteúdo do localStorage
    const corpoModal = document.querySelector(".corpoM");
  
    // limpa o conteúdo da div
    corpoModal.innerHTML = "";
  
    // cria uma tabela
    const tabela = document.createElement("table");
  
    // cria a linha do cabeçalho da tabela
    const cabecalho = tabela.createTHead().insertRow();
    cabecalho.insertCell().textContent = "Curso";
    cabecalho.insertCell().textContent = "Período";
    cabecalho.insertCell().textContent = "Desafio";
    cabecalho.insertCell().textContent = "Sala";
    cabecalho.insertCell().textContent = "Professor";
    cabecalho.insertCell().textContent = "Horário";
    //cabecalho.insertCell().textContent = "";
    // preenche a tabela com os dados do localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const dados = JSON.parse(localStorage.getItem(chave));
      
        const linha = tabela.insertRow();
        linha.insertCell().textContent = dados.curso;
        linha.insertCell().textContent = dados.periodo;
        linha.insertCell().textContent = dados.desafio;
        linha.insertCell().textContent = dados.sala;
        linha.insertCell().textContent = dados.professor;
        linha.insertCell().textContent = dados.horario;
      
        // adiciona o botão de remover
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'X';
        removerBtn.classList.add('btn-remover');
        removerBtn.addEventListener('click', () => {
          localStorage.removeItem(chave); // remove o item do localStorage
          linha.remove(); // remove a linha da tabela
        });
        const colunaRemover = linha.insertCell(); // adiciona a célula da coluna de remover
        colunaRemover.appendChild(removerBtn); // adiciona o botão na célula
      
        // adiciona o botão de editar
        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.classList.add('editar-button');
        editarBtn.addEventListener('click', () => {
          // redireciona o usuário para a página de edição, passando a chave do item como parâmetro
          window.location.href = 'editar.html?key=' + chave;
        });
        const colunaEditar = linha.insertCell(); // adiciona a célula da coluna de editar
        colunaEditar.appendChild(editarBtn); // adiciona o botão na célula
      }



    // adiciona a tabela ao corpo do modal
    corpoModal.appendChild(tabela);
  });
  
// adiciona um listener de click ao botão "Fechar"
const fecharListaBtn = document.getElementById('FecharLista');
fecharListaBtn.addEventListener('click', () => {
  // esconde o modal
  listaModal.style.display = 'none';

  // limpa o conteúdo da div
  corpoModal.innerHTML = '';
});

cells.forEach(cell => {
    let modal = document.getElementById('aulasModal');
    cell.addEventListener('click', () => {
        modal.style.display = 'block';
        const numAula = cell.dataset.aula;
        cell.setAttribute('data-aula', numAula);
    });
});

const dia = document.querySelectorAll('div.cell');
dia.forEach(celula => {
  celula.addEventListener('click', () => {
    const aula = celula.dataset.aula;
    console.log('Clicou na célula ' + aula);
  });
});

function fecharAulasModal() {
    let modal = document.getElementById('aulasModal');
    modal.style.display = 'none';
  }

  function getListaHTML() {
    // recupera os dados do localStorage e converte em array
    let dadosArray = JSON.parse(localStorage.getItem('dados')) || [];
  
    // verifica se o array está vazio
    if (dadosArray.length === 0) {
      return 'Nenhuma aula salva';
    }
    // gera o HTML com os dados salvos
    let listaHTML = '<ul>';
    for (let i = 0; i < dadosArray.length; i++) {
        let aula = dadosArray[i];
        listaHTML += '<li>' + aula.curso + ' - ' + aula.periodo + ' - ' + aula.desafio + ' - ' + aula.sala + ' - ' + aula.professor + ' - ' + aula.horario + '</li>';
      }
      listaHTML += '</ul>';
      
      return listaHTML;
} 

// função que retorna o índice da célula selecionada
function getCellIndex(cell) {
    const row = cell.parentNode;
    const cells = row.children;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === cell) {
        return i;
      }
    }
    return -1; // retorna -1 se a célula não for encontrada
  }

function salvarAula(curso, periodo, desafio, sala, professor, horario) {
    // recupera o índice da célula selecionada
    const cell = document.querySelector('.selecionada');
    if (!cell) {
      alert('Salvando... aguarde');
      return;
    }
    const aulaIndex = getCellIndex(cell);
  
    // verifica se já existe um objeto salvo com a mesma chave
    const existingData = JSON.parse(localStorage.getItem(aulaIndex));
    if (existingData) {
      // combina os dados existentes com os novos dados em um único objeto
      const newData = {
        curso: existingData.curso + ', ' + curso,
        periodo: existingData.periodo + ', ' + periodo,
        desafio: existingData.desafio + ', ' + desafio,
        sala: existingData.sala + ', ' + sala,
        professor: existingData.professor + ', ' + professor,
        horario: existingData.horario + ', ' + horario,
      };
      localStorage.setItem(aulaIndex, JSON.stringify(newData));
    } else {
      // armazena os dados da aula no LocalStorage como um novo objeto, usando o índice da célula como chave
      const data = {
        curso: curso,
        periodo: periodo,
        desafio: desafio,
        sala: sala,
        professor: professor,
        horario: horario
      };
      localStorage.setItem(aulaIndex, JSON.stringify(data));
    }
  
    // exibe mensagem de confirmação
    const mensagem = `Os dados da aula foram salvos com sucesso!`;
    alert(mensagem);
  
    // fecha o modal
    fecharModal();
  
    // limpa os inputs
    cursoInput.value = '';
    periodoInput.value = '';
    desafioInput.value = '';
    salaInput.value = '';
    professorInput.value = '';
    horarioInput.value = '';
  }


function fecharModal() {
    let modal = document.getElementById('aulasModal');
    modal.style.display = 'none';
  }
  const botaoSalvar = document.getElementById('salvar-dados');  
    botaoSalvar.addEventListener('click', () => {
        const curso = cursoInput.value;
        const periodo = periodoInput.value;
        const desafio = desafioInput.value;
        const sala = salaInput.value;
        const professor = professorInput.value;
        const horario = horarioInput.value;
        salvarAula(curso, periodo, desafio, sala, professor, horario);

        const mensagem = `Os dados da aula foram salvos com sucesso!`;
        alert(mensagem);
        // fecha o modal
        fecharModal('aulasModal');
        cursoInput.value = '';
        periodoInput.value = '';
        desafioInput.value = '';
        salaInput.value = '';
        professorInput.value = '';
        horarioInput.value = '';


       // verifica se já existe um objeto salvo com a mesma chave
const existingData = JSON.parse(localStorage.getItem(curso));
if (existingData) {
  // combina os dados existentes com os novos dados em um único objeto
  const newData = {
    curso: existingData.curso,
    periodo: existingData.periodo + ', ' + periodo,
    desafio: existingData.desafio + ', ' + desafio,
    sala: existingData.sala + ', ' + sala,
    professor: existingData.professor + ', ' + professor,
    horario: existingData.horario + ', ' + horario
  };

  // salva o objeto combinado no LocalStorage novamente
  localStorage.setItem(curso, JSON.stringify(newData));
} else {
  // armazena os dados da aula no LocalStorage como um novo objeto, usando o código do curso como chave
  localStorage.setItem(curso, JSON.stringify({
    curso: curso,
    periodo: periodo,
    desafio: desafio,
    sala: sala,
    professor: professor,
    horario: horario
  }));
}
  
    // esconde o modal
    fecharModal();
  });
  
  // limpa o localStorage
  function limparLocalStorage() {
    localStorage.clear();
  }