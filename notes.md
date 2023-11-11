# TO-DO LIST

Uma aplicação com HTML, CSS e JS puro para gerir tarefas.
No backend vamos ter uma API NodeJS + Express + MySQL para servir o frontend.

# DATABASE

    users
        id
        username
        password
        created_at
        updated_at

    tasks
        id
        id_user
        task_text
        task_status
        created_at
        updated_at

# TAREFAS A DESENVOLVER NO PROJETO

    > criar a estrutura inicial
        - base do frontend (html css | bootstrap)
        - base do backend (node + express + mysql) com uma resposta padrão

    > no fronted
        - páginas necessárias para a navegação da nossa app
        - pequenos testes de comunicação entre forntend e backend - utilização de ajax (XMLhttprequest | fetch)

    - estrutura base para cada página
        bootstrap (slate) bootswatch
        fontawesom

    - ver tarefas
        título
        filtro para escolher que tarefas queremos ver (select)
        botão para adicionar tarefas
        (mensgaem sobre o facto de não existirem tarefas)
    	caixa para tarefas
            - possibilidade de alterar o status, editar tarfa e eliminar tarefa
        parágrafo com o total de tarefas disponíveis (de acordo com o filtro)

    - adicionar tarefa
        input:text com o tecto da tarefa
        botão para cancelar
        botão para submeter tarefa

    - editar tarefa
        input:text pra editar o texto da tarefa
        botão para cancelar
        botão para submeter alteração

    (eliminar será feito com uma modal)

    Backend
        criar um serrvidor NodeJS + Express + MySQL
        criar um endpoint inicial - testar comunicações