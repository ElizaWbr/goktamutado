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

