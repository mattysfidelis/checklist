const inputTarefa = document.querySelector(".new-task-input");
const addTarefaButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector('.tasks-container');

const validaTarefa = () => {
    return inputTarefa.value.trim().length > 0;
}

const addTarefa = () => {
    const inputIsValid = validaTarefa();

    if(!inputIsValid){
        return inputTarefa.classList.add("error");
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p');
    taskContent.innerText = inputTarefa.value;

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    deleteItem.addEventListener('click', () =>
        deletaTarefa(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputTarefa.value = "";

    updateLocalStorage();
}

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(let task of tasks){
        let tarefaAtual = task.firstChild.isSameNode(taskContent)
        
        if(tarefaAtual){
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
}

const deletaTarefa = (taskItemContainer, taskContent) => {
    const tarefas = tasksContainer.childNodes;

    for(let tarefa of tarefas){
        let tarefaAtual = tarefa.firstChild.isSameNode(taskContent)
        
        if(tarefaAtual){
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
}

const handleInputChange = () => {
    const inputIsValid = validaTarefa();

    if(inputIsValid){
        return inputTarefa.classList.remove("error");
    }
}

const updateLocalStorage = () => {
    const tarefas = tasksContainer.childNodes;

    const tarefasSalvas = [...tarefas].map(tarefa => {
        let conteudo = tarefa.firstChild;
        let isCompleted = conteudo.classList.contains('completed');

        return {description: conteudo.innerText, isCompleted}
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas))
}

const refreshTasksUsingLocalStorage = () => {
    const tarefasSalvas =  JSON.parse(localStorage.getItem('tarefas'));

    if(!tarefasSalvas) return;
    
    for(let tarefa of tarefasSalvas){
        let taskItemContainer = document.createElement('div')
        taskItemContainer.classList.add('task-item')

        let taskContent = document.createElement('p');
        taskContent.innerText = tarefa.description;

        if(tarefa.isCompleted){
            taskContent.classList.add('completed');
        }

        taskContent.addEventListener('click', () => handleClick(taskContent))

        let deleteItem = document.createElement('i');
        deleteItem.classList.add('far');
        deleteItem.classList.add('fa-trash-alt');

        deleteItem.addEventListener('click', () =>
            deletaTarefa(taskItemContainer, taskContent)
        );

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        tasksContainer.appendChild(taskItemContainer);
    }
}

refreshTasksUsingLocalStorage();

addTarefaButton.addEventListener("click", () => addTarefa());

inputTarefa.addEventListener('change', () => handleInputChange());