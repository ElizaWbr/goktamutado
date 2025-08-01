let mutado = await getCurrentMutedStatus();

if (mutado) {
    displayProveSerOGokContent();
} else {
    displayGokMutadoContent();
}

function displayProveSerOGokContent() {
    let content = "";

    content += '<div class="flex-center">';
    content += '<h1 class="no-margin">';
    content += 'Prove ser o gok';
    content += '</h1>';
    content += '</div>';
    content += '<form id="provaGokForm" method="post">';
    content += '<div class="flex-stretch flex-column">';
    content += '<label for="prova-gok" style="margin-bottom: 10px;">Diga algo que apenas o Gok saberia</label>';
    content += '<textarea name="prova_gok" id="prova-gok" placeholder="Algo que apenas o Gok saberia"></textarea>';
    content += '<button id="provaGokSubmitButton" class="button" type="submit">Enviar</button>';
    content += '</div>';
    content += '</form>';
    content += '<p id="addedProvaGok" class="hidden">';
    content += '<span>';
    content += 'Iremos verificar se a prova e boa e atualizaremos o status, mas provavelmente está mentindo. Gok. sempre. está. mutado.';
    content += '</span>';
    content += '<br>';
    content += '<span id="theProvaGok"></span>';
    content += '</p>';
    content += '<div>';
    content += 'Mentiste? <a href="control.html">Volte, babaca.</a>';
    content += '</div>';

    document.getElementById('update-status-prove-ser-o-gok').innerHTML = content;

    document.getElementById('provaGokForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const provaGok = formData.get('prova_gok');

        if(provaGok != ""){
            try {
                await addProvaGok(provaGok);
                document.getElementById('addedProvaGok').classList.remove("hidden");
                document.getElementById('theProvaGok').textContent = "Sua prova: " + provaGok;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    });
    disableLoader();
}

function displayGokMutadoContent() {
    let content = "";
    content += '<div class="flex-center">';
    content += '<h1 class="no-margin">';
    content += 'Gok está mutado de novo?';
    content += '</h1>';
    content += '</div>';
    content += '<form id="atualizarStatusDoGok" method="post">';
    content += '<button type="submit" class="hiper-button">Atualizar o status para mutado</button>';
    content += '</form>';
    content += '<p class="no-margin">Você não precisa provar nada, acreditamos em você.</p>';
    content += '<p class="no-margin">Gok. Sempre. Está. Mutado.</p>';

    document.getElementById('update-status-prove-ser-o-gok').innerHTML = content;

    document.getElementById('atualizarStatusDoGok').addEventListener('submit', async function(event) {
        event.preventDefault();
        await updateStatusGok("empty", "empty", true);
        window.location.replace("prove.html");
    });
    disableLoader();    
}
