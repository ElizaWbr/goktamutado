const newPasswordContainer = document.getElementById('new-password-page-container');

if (newPasswordContainer) {
    let newPasswordContent = '<div>';
    newPasswordContent += 'Para recuperar a sua senha, informe o seu e-mail e um link para a alteração da senha será enviado.';
    newPasswordContent += '<form id="newPasswordForm" method="post">';
    newPasswordContent += '<div class="flex-stretch flex-column">';
    newPasswordContent += '<label for="new-password-email" style="margin-top: 10px; font-size: 12px;">E-mail</label>';
    newPasswordContent += '<input type="text" name="new_password_email" id="new-password-email" placeholder="E-mail" autocomplete="username"/>';
    newPasswordContent += '<button id="new-password-submit" class="button" type="submit">Enviar</button>';
    newPasswordContent += '<a href="my-account.html" class="link-button">Voltar</a>';
    newPasswordContent += '<br>';
    newPasswordContent += '<p class="error-message no-margin" id="reset-password-error"></p>';
    newPasswordContent += '<p class="success-message color-success no-margin" id="reset-password-success"></p>';
    newPasswordContent += '</div>';
    newPasswordContent += '</form>';
    newPasswordContent += '</div>';

    newPasswordContainer.innerHTML = newPasswordContent;

    document.getElementById('newPasswordForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        let email = formData.get('new_password_email');
        if (email != "") {
            let isValid = await checkIfUserIsValid(email);
            if (!isValid) {
                addErrorMessage("Esse e-mail não pertence ao Gok, acho que você não é ele heim (suspeito).");
            } else {
                let response = await sendPasswordReset(email);
                if(response != true){
                    addErrorMessage(response);
                } else {
                    addSuccessMessage("E-mail enviado com sucesso, verifique a sua caixa de entrada.");
                }
            }
        } else {
            addErrorMessage("Por favor, informe um e-mail.");
        }
    });

    disableLoader();
}

function addErrorMessage(message) {
    document.getElementById('reset-password-error').innerHTML = message;
    document.getElementById('reset-password-success').innerHTML = "";
}

function addSuccessMessage(message) {
    document.getElementById('reset-password-error').innerHTML = "";
    document.getElementById('reset-password-success').innerHTML = message;
}
