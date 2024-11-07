let button = document.getElementById("enviar");

button.onclick = async function(event) {
    event.preventDefault();

    let form = document.getElementById("form-comparacao");
    let dadosForm = new FormData(form);

    const response = await fetch('http://localhost:3005/api/store/comparacao', {
        method: 'POST',
        body: dadosForm
    });

    let content = await response.json();

    if (content.success) {
        alert("Sucesso");
        form.reset();
    } else {
        alert("Não foi dessa vez");
        console.error(content);
    }
}
