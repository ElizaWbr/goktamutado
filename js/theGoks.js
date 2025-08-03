let validateButton = "<button class='validate-buttons button'><img src='../img/icons/check-bold.svg' alt='Check' class='icon'/></button>";

let goks = await getAllGoks();

if (goks.length > 0) {

    let currentRole = await getCurrentUserRole();
    let addPinButtons = currentRole == "admin" || currentRole == "gok";

    goks.forEach((gok) => {
        let content = "";
        content = "<p class='no-margin goks-list-item'>";
        content += "<span class='gok-list-item-title'>";
        if (gok.fixado == true) {
            content += "<img src='../img/icons/wizard-hat.svg' alt='Check' class='icon' />";
        }

        content += "<span style='height: 12px;'>" + gok.argumento + "</span>";
        content += "</span>";

        if (addPinButtons) {
            content += "<span style='min-width: 120px;'>";
            if (gok.fixado == false) {
                content += "<button class='pin-buttons button back-orange' value='" + gok.id + "'><img src='../img/icons/pin.svg' alt='Check' class='icon'/></button>";
            } else {
                content += "<button class='pin-off-buttons button back-orange' value='" + gok.id + "'><img src='../img/icons/pin-off.svg' alt='Check' class='icon'/></button>";
            }
        } else {
            content += "<span>";
        }
        content += validateButton;
        content += "</span>";
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

    const pinButtons = document.getElementsByClassName('pin-buttons');
    for (let i = 0; i < pinButtons.length; i++) {
        const botao = pinButtons[i];
        botao.addEventListener('click', async function() {
            ableLoader();
            let id = botao.value;
            await updateFixedGok(id, true);
            window.location.replace("goks.html");
            disableLoader();
        });
    }

    const pinOffButtons = document.getElementsByClassName('pin-off-buttons');
    for (let i = 0; i < pinOffButtons.length; i++) {
        const botao = pinOffButtons[i];
        botao.addEventListener('click', async function() {
            ableLoader();
            let id = botao.value;
            await updateFixedGok(id, false);
            window.location.replace("goks.html");
            disableLoader();
        });
    }

    disableLoader();
} else {
    let content = "";

    content = "<p class='no-margin goks-list-item'>";
    content += "<span>";
    content += "Não temos nenhum possível Gok adicionado no momento, se você for o Gok por favor adicione a sua prova ";
    content += "<a href='prove.html'>aqui</a>.</span>";
    content += "</span>";
    content += "</p>";

    document.getElementById('goks-container').innerHTML += content;
    disableLoader();
}
