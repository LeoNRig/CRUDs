var nomeSalvo = "James";
var senhaSalva = "123";

function abrirModal(loginModal){

    let modal=document.getElementById(loginModal);
    modal.style.display ='block';

}

function fecharModal(fecharModal){

    let modal = document.getElementById(fecharModal);
    modal.style.display ='none';
}
function entrar() {
    var nome = document.querySelector("#nome").value;
    var senha = document.querySelector("#senha").value;

    // Verifica as credenciais do usuário
    if (nome === nomeSalvo && senha === senhaSalva) {
      // Redireciona o usuário para a página do calendário
      window.location.href = "calendario.html";
    } else {
      // Exibe uma mensagem de erro para o usuário
      alert("Nome de usuário ou senha incorretos.");
    }
}
