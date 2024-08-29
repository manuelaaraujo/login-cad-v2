// VALIDAR ACESSO EM TELA DE LOGIN
 
function acessar() {
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;
    if(!loginEmail || !loginSenha || loginEmail){
        alert("Favor preencher todos os campos");
    }else{
        //alert("Campos preenchidos com sucesso");
        window.location.href = 'cadastro.html';
    }
}

// FUNÇÃO QUE ARMAZENA EM ARRAY NOME NA TELA DE CADASTRO
 
var dadosLista = []; 
var salvaEmail = [];
var salvaCPF = [];
   // array sem tamanho definido 

function salvarUser(){
    let nomeUser = document.getElementById('nomeUser').value;
    let email = document.getElementById('emailUser').value;
    let cpf = document.getElementById('cpfUser').value; 
   
    if(nomeUser && email && cpf){
        dadosLista.push(nomeUser);
        salvaEmail.push(email); 
        salvaCPF.push(cpf);     //adiciona nova variavel que acessa o campo email
      //console.log(dadosLista);
      criarlista();
        document.getElementById('nomeUser').value = "";
        document.getElementById('emailUser').value = "";
        document.getElementById('cpfUser').value = "";
    }else{
        alert('Favor informar o nome para cadastro');
    }
}
 
// FUNÇÃO PARA CRIAR LISTA
 
function criarlista(){
    let tabela = document.getElementById ('tabela').innerHTML = "<tr><th>Nome Usuário</th> <th>Email</th> <th>CPF</th> <th>Ações</th></tr>"
    for(let i = 0; i <= (dadosLista.length-1) ; i++){
        // i é usado para acessar a posição do array
        tabela += "<tr><td>" + dadosLista [i] + "</td><td>" + salvaEmail +  "</td><td>" + salvaCPF +  "</td><td> <button type='button' onclick='editar(this.parentNode.parentNode.rowIndex)'>Editar</button> <button type='button' onclick='excluir(this.parentNode.parentNode.rowIndex)'>Excluir</button> </td></tr>";
        // coloca array em ordem na coluna ("Nome usuário") da tabela   
        document.getElementById('tabela').innerHTML = tabela;
    }
}

// FUNÇÃO PARA EDITAR NOMES DA LISTA 
function editar(i){
    document.getElementById('nomeUser').value = dadosLista[(i - 1)];
    dadosLista.splice(dadosLista[(i - 1)], 1);
    document.getElementById('emailUser').value = salvaEmail[(i - 1)];
    salvaEmail.splice(salvaEmail[(i - 1)], 1);  //adiciona nova variavel que permite editar o email
    document.getElementById('cpf').value = salvaCPF[(i - 1)];
    salvaCPF.splice(salvaCPF[(i - 1)], 1); 
}

// FUNÇÃO PARA EXCLUIR 

function excluir(i){
    dadosLista.splice((i-1), 1);
    document.getElementById('tabela').deleteRow(i);
    salvaEmail.splice((i-1), 1);
    document.getElementById('tabela').deleteRow(i);  //adiciona nova variavel que permite excluir o email
    salvaCPF.splice((i-1), 1);
    document.getElementById('tabela').deleteRow(i);
}

document.getElementById('cpfForm').addEventListener('submit', function(event){
    event.preventDefault();
 
    const cpf = document.getElementById('cpf').value;
    const msg = document.getElementById('message');
 
    if(validarCPF(cpf)){
        msg.textContent = 'O CPF é válido!';
        msg.style.color = 'green';
    }else{
        msg.textContent = 'O CPF é inválido!';
        msg.style.color = 'red';
    }
}
);
 
function validarCPF(cpf){
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
 
    // Estrutura de decisão para verificar quantidade de dígitos e se todos os digitos são iguais
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){
        return false;
    }
   
    let soma = 0;
    let resto;
 
    // Validando 10º digito do CPF - o primeiro digito verificador
    for(let i=1;i <= 9;i++){
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
 
    resto = (soma * 10) % 11;
 
    if((resto === 10) || (resto === 11)){
        resto = 0;
    }
    if(resto !== parseInt(cpf.substring(9, 10))){
        return false;
    }
    // Validando 11º digito do CPF - o segundo digito verificador
    soma = 0;
    for(let i = 1; i <= 10; i++){
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
 
    resto = (soma * 10) % 11;
 
    if((resto === 10) || (resto === 11)){
        resto = 0;
    }
   
    if(resto !== parseInt(cpf.substring(10, 11))){
        return false;
    }
 
    return true;
}
