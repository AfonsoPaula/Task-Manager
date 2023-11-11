// index javascript

let id = 1

window.onload = () => {
    get_username(id);
    get_user_tasks(id);
}

function get_username(id){
    fetch(`http://localhost:3000/user/${id}`)
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

function get_user_tasks(id){

    fetch(`http://localhost:3000/user/${id}/tasks`)

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
                            <select id="task_status" class="form-select p-2">
                                <option value="new">New</option>
                                <option value="in progress">In progress</option>
                                <option value="cancel">Cancel</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div class="col-1 text-end"><i class="fa-solid fa-pen-to-square me-2"></i>Edit</div>
                        <div class="col-1 text-end text-danger"><i class="fa-solid fa-trash-can me-2"></i>Delete</div>
                    </div>
                </div>`

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