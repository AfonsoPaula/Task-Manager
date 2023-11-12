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
        document.querySelector("#text_task_text").value = task[0].task_text;
    })
}

document.querySelector("#btn_update").addEventListener('click', () => {
    let task_text = document.querySelector("#text_task_text").value;
    let error = document.querySelector("#error");

    // check if input is empty
    if (task_text == null | task_text == ''){
        error.textContent="Type in the text field.";
        error.classList.remove("d-none");
        return;
    }

    // check if length is lower then 100
    if (task_text.length > 100) {
        error.textContent="The text must be less than 100 characters.";
        error.classList.remove("d-none");
        return;
    }

    // update task in database
    fetch(`http://localhost:3000/user/tasks/update_task`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({id_task, task_text})
    })
    .then(response => {
        if(response.status === 200) {
            return response.json();
        }
    })

    // redirect to homepage
    window.location.href = window.location.origin + "/To-Do-List/frontend/index.html";

})