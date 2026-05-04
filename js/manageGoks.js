let currentRole = await getCurrentUserRole();
if (currentRole != "admin") {
    window.location.replace("control.html");
}

let limitPerPage = 10;
let currentPage = 1;
let history = [];
let cursors = [];
let lastDoc = null;
let hasMore = false;

let realData = [];

const btnPrev = document.getElementById("goks-real-statists-prev-page");
const btnNext = document.getElementById("goks-real-statists-next-page");

await loadPage();

btnPrev.addEventListener("click", async function () {
    if (currentPage === 1){
        return;
    }
    currentPage--;
    await loadPage("prev");
});

btnNext.addEventListener("click", async function () {
    if (!hasMore) {
        return;
    }
    currentPage++;
    await loadPage("next");
});

async function loadPage(direction = "next") {
    ableLoader();

    let cursor = null;

    if (direction === "next") {
        cursor = cursors[currentPage - 1] || null;
    }

    if (direction === "prev") {
        cursor = cursors[currentPage - 2] || null;
    }

    const response = await getGoksRealStatistsLimit(limitPerPage, cursor);

    realData = response.data;
    hasMore = response.hasMore;

    cursors[currentPage] = response.lastDoc;
    buildItems();
}

function buildItems() {
    document.getElementById('manage-goks-container').innerHTML = "";
    document.getElementById("goks-real-statists-current-page").textContent = `Página ${currentPage}`;

    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = !hasMore;

    if (realData.length <= 0) {
        let content = "<p style='justify-content: center;align-items: normal;flex-direction: column'>";
        content += "Sem registros";
        content += "</p>";
        document.getElementById('manage-goks-container').innerHTML = content;
        disableLoader();
        return;
    }

    let validateButton = "<button type='submit' class='validate-buttons button'><img src='../img/icons/check-bold.svg' alt='Check' class='icon'/></button>";

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
        form_.addEventListener("submit", async function (event) {
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
