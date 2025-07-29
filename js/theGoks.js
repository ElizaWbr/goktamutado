let validateButton = "<button class='validate-buttons button'><img src='../img/icons/check-bold.svg' alt='Check' class='icon'/></button>";
let goks = await getAllGoks();

if (goks.length > 0) {
    goks.forEach((gok) => {
        let content = "";

        content = "<p class='no-margin goks-list-item'>";
        content += gok;
        content += validateButton;
        content += "</p>";

        document.getElementById('goks-container').innerHTML += content;
    });

    const validateButtons = document.getElementsByClassName('validate-buttons');

    for (let i = 0; i < validateButtons.length; i++) {
        const botao = validateButtons[i];

        botao.addEventListener('click', function() {
            let message = "Você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação mas você só pode aprovar validações de Gok depois de provar ser o Gok e para provar ser o Gok você precisa submeter a sua requisição e depois aprovar a validação";
            alert(message);
        });
    }
} else {
    let content = "";

    content = "<p class='no-margin goks-list-item'>";
    content += "<span>";
    content += "Não temos nenhum possível Gok adicionado no momento, se você for o Gok por favor adicione a sua prova ";
    content += "<a href='prove.html'>aqui</a>.</span>";
    content += "</span>";
    content += "</p>";

    document.getElementById('goks-container').innerHTML += content;
}
