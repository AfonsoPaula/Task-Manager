let id_user = null;

window.onload = () => {
    // get id_user
    const url = new URL(window.location.href);
    id_user = url.searchParams.get('id_user');
}

document.querySelector("#btn_guardar").addEventListener('click', () => {

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

    // stores new task in database
    fetch(`http://localhost:3000/user/tasks/new_task`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({id_user, task_text})
    })
    .then(response => {
        if(response.status === 200) {
            return response.json();
        }
    })

    // redirect to homepage
    window.location.href = window.location.origin + "/To-Do-List/frontend/index.html"
})