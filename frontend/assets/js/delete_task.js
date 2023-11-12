let id_task = null;

window.onload = () => {
    // get id_task
    const url = new URL(window.location.href);
    id_task = url.searchParams.get('id_task');

    // get task data
    fetch(`http://localhost:3000/user/tasks/get_task/${id_task}`)
    .then(response => {
        if (response.status === 200){
            return response.json();
        } else {
            console.log('ERROR!')
        }
    })
    .then(task => {
        let status = {
            'new' : 'New task',
            'in progress':'In progress',
            'canceled': 'Canceled',
            'done': 'Done'
        };

        document.querySelector("#task_text").textContent = task[0].task_text;
        document.querySelector("#task_status").textContent = status[task[0].task_status];
    })
}

document.querySelector("#btn_delete").addEventListener('click', () => {

    fetch(`http://localhost:3000/user/tasks/delete_task/${id_task}`)
    .then(response => {
        if (response.status === 200){
            return response.json();
        } else {
            throw Error('erro');
        }
    })
    .then(() => {
        // redirect to homepage
        window.location.href = window.location.origin + "/To-Do-List/frontend/index.html";
    })
    .catch((err) => {
        console.log(err);
    })

})