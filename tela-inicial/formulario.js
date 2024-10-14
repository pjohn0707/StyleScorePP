let button = document.getElementById("enviar");

button.onclick = async function (e) {
    e.preventDefault();

    let form = document.getElementById("form-cadastrarproduto");
    let dadosForm = new FormData(form);

    try {
        const response = await fetch('http://localhost:3006/api/store/inicial', {
            method: 'POST',
            body: dadosForm
        });

        let content = await response.json();

        if (content.success) {
            alert("Produto cadastrado com sucesso!");
        } else {
            alert("Erro ao cadastrar o produto.");
            console.log(content.sql);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro. Tente novamente.");
    }
}
