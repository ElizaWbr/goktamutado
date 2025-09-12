let currentRole = await getCurrentUserRole();
if (currentRole != "admin") {
    window.location.replace("control.html");
}

let realData = await getGoksRealStatists();
let validateButton = "<button type='submit' class='validate-buttons button'><img src='../img/icons/check-bold.svg' alt='Check' class='icon'/></button>";

if (realData.length > 0) {
    realData.reverse();
    realData.forEach((data) => {

        let content = "";
        content += "<div class='no-margin goks-list-item' style='justify-content: center;align-items: normal;flex-direction: column;'>";
        content += "<div style='margin: 10px;'>" + data.id + "</div>";
        content += "<form id='" + data.id + "' class='flex-stretch update-form oi' style='align-items: center;'>";

        let date_ = data.data.toDate();
        let pad = (n) => n.toString().padStart(2, "0");
        let formatted = `${date_.getFullYear()}-${pad(date_.getMonth() + 1)}-${pad(date_.getDate())}T${pad(date_.getHours())}:${pad(date_.getMinutes())}`;

        content += "<div class='flex-stretch flex-column' style='padding: 10px;'>";
        content += "<label for='nova-data'>Nova data</label>";
        content += "<input id='nova-data' name='nova_data' type='datetime-local' value='" + formatted + "'/>";
        content += "</div>";

        content += "<div class='flex-stretch flex-column' style='padding: 10px; min-width: 50vw;'>";
        content += "<label for='nova-mensagem'>Nova mensagem</label>";
        content += "<textarea id='nova-mensagem' name='nova_mensagem' value='" + data.mensagem + "'>" + data.mensagem + "</textarea>";
        content += "</div>";
        content += validateButton;
        content += "</form>";
        content += "</div>";

        document.getElementById('manage-goks-container').innerHTML += content;
    });

    disableLoader();

    let updateForms = document.getElementsByClassName('update-form');
    for (let i = 0; i < updateForms.length; i++) {
        let form_ = updateForms[i];
        form_.addEventListener("submit", async function(event) {
            event.preventDefault();
            ableLoader();

            let formData = new FormData(this);
            let id = form_.id;
            let novaMensagem = formData.get("nova_mensagem");
            let novaDataForm = formData.get("nova_data");
            let novaData = new Date(novaDataForm);

            await updateStatus(id, novaData, novaMensagem);
            window.location.replace("manage-goks.html");
        });
    }
}
