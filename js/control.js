let mutado = await getCurrentMutedStatus();
if (mutado) {
    document.getElementById('now-real-gok-state').innerHTML = '<span>Mutado</span><div class="red-circle"></div>';
    document.getElementById('now-real-gok-state-message').innerHTML = 'Você é o Gok? Nos deixe saber que está online.';
    document.getElementById('now-real-gok-update=state-button').innerHTML = 'Prove ser o Gok';

    disableLoader();
} else {
    document.getElementById('now-real-gok-state').innerHTML = '<span>Desmutado</span><div class="success-circle"></div>';
    document.getElementById('now-real-gok-state-message').innerHTML = 'Nos mantenha informados.';
    document.getElementById('now-real-gok-update=state-button').innerHTML = 'Atualize o status';

    disableLoader();
}
