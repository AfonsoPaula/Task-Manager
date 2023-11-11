// index javascript
window.onload = () => {
    get_username(1);
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
            console.log('');
        } else {
            document.querySelector("#username").textContent = data[0].username;
        }
    })
}