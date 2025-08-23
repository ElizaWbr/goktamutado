/* My account page */

const myAccountHeader = document.getElementById('my-account-page-title');
const myAccountContainer = document.getElementById('my-account-page-container');
myAccountHeader.innerHTML = "";
myAccountContainer.innerHTML = "";

function displayGokMutedAccountPage() {
    if (!myAccountHeader || !myAccountContainer) {
        return;
    }

    addMyAccountLoggedHeader();

    let myAccountContent = '<p>Seja bem vindo Gok, é muito bom te ter por aqui.</p>';
    myAccountContent += '<div>';
    myAccountContent += '<form id="statusUpdateForm" method="post">';
    myAccountContent += '<div class="flex-stretch flex-column">';
    myAccountContent += '<label for="mensagem-gok" style="margin-bottom: 10px;">Se você não estiver mutado, deixe uma mensagem secreta e atualize o status.</label>';
    myAccountContent += '<textarea name="mensagem_gok" id="mensagem-gok" placeholder="Uma mensagem secreta"></textarea>';
    myAccountContent += '<button id="statusUpdateSubmitButton" class="button" type="submit">Atualizar status</button>';
    myAccountContent += '</div>';
    myAccountContent += '<p class="error-message" id="gok-status-update-error-message"></p>';
    myAccountContent += '<p class="success-message color-success" id="gok-status-update-success-message"></p>';
    myAccountContent += '</form>';
    myAccountContent += '</div>';

    myAccountContainer.innerHTML += myAccountContent;

    document.getElementById('statusUpdateForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        let mensagemGok = formData.get('mensagem_gok');
        if (mensagemGok == ""){
            document.getElementById('gok-status-update-error-message').innerHTML = "Ué, cade a mensagem secreta?";
        } else if(mensagemGok.length < 10) {
            document.getElementById('gok-status-update-error-message').innerHTML = "Nah, adiciona mais coisa ai";
        } else {
            let currentRole = await getCurrentUserRole();
            let response = await updateStatusGok(mensagemGok, currentRole, false);
                
            window.location.replace("my-account.html");
        }
    });

    disableLoader();
}

function displayGokNotMutedAccountPage(){
    if (!myAccountHeader || !myAccountContainer) {
        return;
    }

    addMyAccountLoggedHeader();

    let myAccountContent = '<p class="no-margin">Seja bem vindo Gok, é muito bom te ter por aqui.</p>';
    myAccountContent += '<p class="no-margin">Por incrível que pareça você está desmutado.</p>';
    myAccountContent += '<p class="no-margin">Está tudo bem (por enquanto).</p>';

    myAccountContainer.innerHTML += myAccountContent;

    disableLoader();
}

function adminMyAccountPage() {
    let adminContent = "<p>Bem vindo admin, não tem nada de especial pra você aqui, só cheque a forma que as informações são exibidas para o Gok.</p>";
    myAccountContainer.innerHTML += adminContent;
}

function addMyAccountLoggedHeader(){
    myAccountHeader.innerHTML = "";
    let title = '<span>MINHA CONTA</span>';
    title += '<button id="my-account-logout" type="click" class="button no-shadow">';
    title += '<img src="../img/icons/logout-variant.svg" alt="Logout" class="icon big-icon"/>';
    title += '</button>';
    myAccountHeader.innerHTML = title;

    document.getElementById('my-account-logout').addEventListener('click', async function(event) {
        doLogout();
    });
}

window.displayGokMutedAccountPage = displayGokMutedAccountPage;
window.displayGokNotMutedAccountPage = displayGokNotMutedAccountPage;
window.adminMyAccountPage = adminMyAccountPage;

/* Login page */

function displayLoginPage(){
    if (!myAccountHeader || !myAccountContainer) {
        return;
    }

    myAccountHeader.innerHTML = "";
    myAccountHeader.innerHTML = '<span>LOGIN</span>';

    let notLoggedInContent = '<div>';
    notLoggedInContent += '<form id="loginForm" method="post">';
    notLoggedInContent += '<div class="flex-stretch flex-column">';
    notLoggedInContent += '<label for="login-email" style="margin-top: 10px; font-size: 12px;">E-mail</label>';
    notLoggedInContent += '<input type="text" name="login_email" id="login-email" placeholder="E-mail" autocomplete="username"/>';
    notLoggedInContent += '<label for="login-password" style="margin-top: 10px; font-size: 12px;">Senha</label>';
    notLoggedInContent += '<input type="password" name="login_password" id="login-password" placeholder="*********" autocomplete="current-password"/>';
    notLoggedInContent += '<button id="login-submit" class="button" type="submit">Login</button>';
    notLoggedInContent += '<a href="new-password.html" class="link-button">Recuperar ou criar nova senha.</a>';
    notLoggedInContent += '</div>';
    notLoggedInContent += '</form>';
    notLoggedInContent += '</div>';

    myAccountContainer.innerHTML = notLoggedInContent;

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        ableLoader();
        const formData = new FormData(this);
        let email = formData.get('login_email');
        let password = formData.get('login_password');

        if (email != "" && password != ""){
            await validateUserAndLogin(email, password);
        }
    });

    disableLoader();
}

window.displayLoginPage = displayLoginPage;
