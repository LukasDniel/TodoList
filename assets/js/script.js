const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-add');
const listTarefa = document.querySelector('.tarefas');

// FUNÇÃO QUE CRIA UMA LI NA LISTA
const criaLi = () => {
    const li = document.createElement('li');
    return li;
}

// FUNÇÃO QUE CRIA O ELEMENTO LI N ALISTA COM VALOR DO INPUT
const criaTarefa = (valorInput) => {
    const li = criaLi();
    li.innerText = valorInput;
    listTarefa.appendChild(li)
    btnExcluir(li)
    limpaInput()
    salvaTarefa()
}

// FUNÇÃO QUE PERMITE APERTAR ENTER PARA CRIAR NOVA FUNÇÃO
inputTarefa.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }

})

//FUNÇÃO LIMPA INPUT 
const limpaInput = () => {
    inputTarefa.value = '';
    inputTarefa.focus();
}

//FUNÇÃO PARA CLICAR NO BOTÃO E CRIA TAREFA
btnTarefa.addEventListener('click', (e) => {
    e.preventDefault()

    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
})

//CRIA BOTÃO PARA EXLUIR A TAREFA
const btnExcluir = (li) => {
    li.innerText += ' '
    const btnApagar = document.createElement('button');
    btnApagar.classList.add('buttonApagar')
    li.appendChild(btnApagar);
}

//EVENTO QUE EXLUI A TAREFA, QUANDO RECEBE O CLICK NO ELEMENTO
document.addEventListener('click', (e) => {
    let el = e.target;
    if (el.classList.contains('buttonApagar')) {
        el.parentElement.remove()
        salvaTarefa()
    }
})

// FUNÇÃO QUE SALVA AS TAREFAS NO LOCALSTORAGE
const salvaTarefa = () => {
    const itemTarefas = listTarefa.querySelectorAll('li')
    const listaTarefas = [];

    for (let tarefa of itemTarefas) {
        let tarefaTexto = tarefa.innerText;
        listaTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}


//FUNÇÃO QUE PEGA AS TAREFAS E NÃO AS EXCLUI DO ARRAY QUANDO ATUALIZA A PAGINA
const addTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas');
    const listaSalva = JSON.parse(tarefas);

    for (let tarefa of listaSalva) {
        criaTarefa(tarefa)
    }
}

addTarefasSalvas()