// index javascript

let id_user = 1

let colors = [
    {
        task_status: 'new',
        select_bg_color: 'bg-white'
    },
    {
        task_status: 'in progress',
        select_bg_color: 'bg-info'
    },
    {
        task_status: 'canceled',
        select_bg_color: 'bg-danger'
    },
    {
        task_status: 'done',
        select_bg_color: 'bg-success'
    }
];

window.onload = () => {
    get_username(id_user);
    get_user_tasks(id_user);
}

//------------------------------------------------------------
function get_username(id_user){
    fetch(`http://localhost:3000/user/${id_user}`)
    .then(response => {
        if (response.status === 200){
            return response.json();
        } else {
            console.log('ERROR!')
        }
    })
    .then(data => {
        if (data.length === 0){
            console.log('Error!');
        } else {
            document.querySelector("#username").textContent = data[0].username;
        }
    })
}

//------------------------------------------------------------
function get_user_tasks(id_user){

    fetch(`http://localhost:3000/user/${id_user}/tasks`)

    .then(response => {
        if (response.status === 200){
            return response.json();
        } else {
            console.log('ERROR!')
        }
    })
    .then(tasks => {
        if (tasks.length === 0){
            document.querySelector("#no_tasks").classList.remove("d-none");
            document.querySelector("#total_tasks").classList.add("d-none");
        } else {
            document.querySelector("#tasks_container").innerHTML = null;

            tasks.forEach(task => {

                let color = colors.find(item => item.task_status == task.task_status);

                let html = `
                <div class="col-12 border border-secondary rounded p-3 shadow">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                                <h5 class="me-3 text-info"><i class="fa-solid fa-circle-chevron-right me-2"></i></h5>
                                <h5>${task.task_text}</h5>
                            </div>
                        </div>
                        <div class="col-2">
                            <select id="task_status_${task.id}" onchange="change_task_status(${task.id})" class="form-select p-2 ${color.select_bg_color}">
                                <option value="new" ${task.task_status == 'new' ? 'selected' : ''}>New</option>
                                <option value="in progress" ${task.task_status == 'in progress' ? 'selected' : ''}>In progress</option>
                                <option value="canceled" ${task.task_status == 'canceled' ? 'selected' : ''}>Canceled</option>
                                <option value="done" ${task.task_status == 'done' ? 'selected' : ''}>Done</option>
                            </select>
                        </div>
                        <div class="col-1 text-end"><span class="edit_link" onclick="edit_task(${task.id})"><i class="fa-solid fa-pen-to-square me-2"></i>Edit</span></div>
                        <div class="col-1 text-end"><span class="delete_link" onclick="delete_task(${task.id})"><i class="fa-solid fa-trash-can me-2"></i>Delete</span></div>
                    </div>
                </div>`;

                let new_task = document.createElement('div');
                new_task.classList.add('row', 'mb-3');
                new_task.innerHTML = html;

                document.querySelector("#tasks_container").appendChild(new_task);
            });

            document.querySelector("#no_tasks").classList.add("d-none");
            document.querySelector("#total_tasks").classList.remove("d-none");
            document.querySelector('#total_tasks > div > h4 > span > strong').textContent = tasks.length;
        }
    })
}

//------------------------------------------------------------
function edit_task(id_task){
    console.log(id_task);
}

//------------------------------------------------------------
function delete_task(id_task){
    console.log(id_task);
}

//------------------------------------------------------------
function change_task_status(id_task){

    let status = document.querySelector("#task_status_" + id_task).value;

    fetch(`http://localhost:3000/user/tasks/update_status`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({id_task, status})
    })
    .then(response => {
        if(response.status === 200) {
            return response.json();
        }
    })

    // update select color based on task status
    let color_obj = colors.find(e => e.task_status == status);
    let select = document.querySelector(`#task_status_${id_task}`);

    let colors_tmp = colors.map(c => { return c.select_bg_color});
    select.classList.remove(...colors_tmp);
    select.classList.add(color_obj.select_bg_color);
}

document.querySelector("#btn_new_task").addEventListener('click', () => {
    
    const url = window.location.origin + "/To-Do-List/frontend/new_task.html?id_user=" + id_user;
    window.location.href = url;
})