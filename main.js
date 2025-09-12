const firebaseConfig = {
    apiKey: "AIzaSyCWCDFJQj_D8woyxW8vPEBKQlhKmm9eI14",
    authDomain: "goktamutado-dd6ed.firebaseapp.com",
    projectId: "goktamutado-dd6ed",
    storageBucket: "goktamutado-dd6ed.firebasestorage.app",
    messagingSenderId: "896181821859",
    appId: "1:896181821859:web:357c4f30998d18c795fa16",
    measurementId: "G-K0XT8GMK6P"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* Add data */
async function addProvaGok(data) {
    try {
        const newDocRef = await db.collection("possiveisGoks").add({
            argumento: data,
            fixado: false,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Eliza: " + JSON.stringify(e));
    }
}
window.addProvaGok = addProvaGok;

async function addGoksRealStatists() {
    try {
        const newDocRef = await db.collection("goksStatistics").add({
            desmutadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Eliza: " + JSON.stringify(e));
    }
}
/* End add data */

/* Update data */
async function updateFixedGok(id, newVal) {
    await db.collection("possiveisGoks").doc(id).set({
        fixado: newVal
    }, { merge: true });
}
window.updateFixedGok = updateFixedGok;

async function updateStatus(id, novaData, novaMensagem) {
    await db.collection("gokStatus").doc(id).set({
        data: novaData,
        mensagem: novaMensagem
    }, { merge: true });
}
window.updateStatus = updateStatus;
/* /Update data */

/* Get data */
async function getAllGoks() {
    try {
        const snapshot = await firebase.firestore().collection("possiveisGoks").get();
        const allGoks = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            allGoks.push({
                argumento: data.argumento,
                criadoEm: data.criadoEm || null,
                fixado: data.fixado || false,
                id: doc.id,
            });
        });

        allGoks.sort((a, b) => {
            if (a.fixado && !b.fixado) return -1;
            if (!a.fixado && b.fixado) return 1;

            const dataA = a.criadoEm ? a.criadoEm.toDate() : new Date(0);
            const dataB = b.criadoEm ? b.criadoEm.toDate() : new Date(0);
            
            return dataB - dataA;
        });
        return allGoks;
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Elisa: " + JSON.stringify(e));
        return [];
    }
}
window.getAllGoks = getAllGoks;

async function getGoksRealStatists() {
    try {
        const snapshot = await firebase.firestore().collection("gokStatus").get();
        const goksRealStatistics = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.deixadaPor != "admin") {
                data.id = doc.id;
                goksRealStatistics.push(data);
            }
        });

        goksRealStatistics.sort((a, b) => {
            const dataA = a.data ? a.data.toDate() : new Date(0);
            const dataB = b.data ? b.data.toDate() : new Date(0);
            
            return dataA - dataB;
        });

        let currentRole = await getCurrentUserRole();
        if (currentRole == "admin") {
            console.log(goksRealStatistics);
        }
            
        return goksRealStatistics;
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Elisa: " + JSON.stringify(e));
        return [];
    }
}
window.getGoksRealStatists = getGoksRealStatists;

async function getJacometroStatists(){
    try {
        const snapshot = await firebase.firestore().collection("jackometro").get();
        const jacometroStatistics = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            jacometroStatistics.push(data);
        });

        jacometroStatistics.sort((a, b) => {
            const dataA = a.data ? a.data.toDate() : new Date(0);
            const dataB = b.data ? b.data.toDate() : new Date(0);
            
            return dataA - dataB;
        });

        return jacometroStatistics;
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Elisa: " + JSON.stringify(e));
        return [];
    }
}
window.getJacometroStatists = getJacometroStatists;

async function getValidUsersEmails() {
    try{
        let validUsers = await getValidUsers();
        let validUsersEmails = [];

        validUsers.forEach((data) => {
            validUsersEmails.push(data.email);
        });

        return validUsersEmails;
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Elisa: " + JSON.stringify(e));
        return [];
    }
}

async function getValidUsers() {
    try {
        const snapshot = await firebase.firestore().collection("usuariosValidos").get();
        let validUsers = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            validUsers.push({
                email: data.email,
                role: data.role
            });
        });

        return validUsers;
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Eliza: " + JSON.stringify(e));
        return [];
    }
}

async function getCurrentMutedStatus() {
    const snapshot = await firebase.firestore().collection("gokStatus").orderBy("data", "desc").limit(1).get();
    if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        let data = doc.data();
        return data.mutado;
    } else {
        return true;
    }
}
window.getCurrentMutedStatus = getCurrentMutedStatus;

async function getCurrentUserRole() {
    let user = await getUserWhenReady();
    if (!user) {
        return "empty";
    }

    let validUsers = await getValidUsers();
    let userRole = "empty";

    validUsers.forEach((data) => {
        if (data.email == user.email) {
            userRole = data.role;
        }
    });
    return userRole;
}
window.getCurrentUserRole = getCurrentUserRole;

/* End get data */

async function checkIfUserIsValid(email){
    let validUsers = await getValidUsersEmails();
    return validUsers.includes(email);
}
window.checkIfUserIsValid = checkIfUserIsValid;

async function validateUserAndLogin(email, password){
    let isValid = await checkIfUserIsValid(email);
    if (isValid) {
        await signIn(email, password);
    } else {
        alert("Esse e-mail não pertence ao Gok");
    }
}
window.validateUserAndLogin = validateUserAndLogin;

/* Auth process */
async function signIn(email, password) {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
        window.location.replace("my-account.html");
        return;
    }
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        currentUser = userCredential.user;
    } catch (error) {
        currentUser = false;
        if (error.code === 'auth/invalid-login-credentials') {
            alert("Erro no login: Você não é o Gok.");
        } else {
            alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Eliza: " + JSON.stringify(error));
        }
    }
    if (currentUser) {
        window.location.replace("my-account.html");
    }
}

async function sendPasswordReset(email) {
    if (!email) {
        return "Por favor, informe um e-mail.";
    }

    try {
        await firebase.auth().sendPasswordResetEmail(email);
        return true;
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            return "Esse e-mail não pertence ao Gok, acho que você não é ele heim (suspeito)";
        } else {
            return "Erro ao enviar email de recuperação. Tente novamente.";
        }
    }
}
window.sendPasswordReset = sendPasswordReset;

firebase.auth().onAuthStateChanged(function(user) {
    displayNavBarLoginOrMyAccount();
    displayAndHideHtml();
});

/* Navbar Login or My account */
async function displayNavBarLoginOrMyAccount(){
    const user = await firebase.auth().currentUser;
    let content = "";
    if (user) {
        content = '<a href="my-account.html" class="nav-button color-white" id="my-account-nav-button">minha conta</a>';
    } else {
        content = '<a href="my-account.html" class="nav-button color-white" id="login-nav-button">login</a>';
    }
    document.getElementById('navbar-auth-items').innerHTML = "";
    document.getElementById('navbar-auth-items').innerHTML = content;
}

/* Display logged content */
async function displayAndHideHtml(){
    const user = await firebase.auth().currentUser;
    if (document.getElementById('my-account-page-container')) {
        document.getElementById('my-account-page-container').innerHTML = "";
        if (user) {
            organizeMyAccountContent(user);
        } else {
            displayLoginPage();
        }
    } else {
        return;
    }
}

/* My account content */
async function organizeMyAccountContent(user){
    if (!user) {
        let content = '<div id="my-account-not-in" class="not-error-message">Você não deveria estar aqui.</div>';
        document.getElementById('my-account-page-container').innerHTML += content;
        return;
    }
    let validUsers = await getValidUsers();
    let validUserRole = "";

    validUsers.forEach((data) => {
        if (data.email == user.email) {
            validUserRole = data.role;
        }
    });

    let isMuted = await getCurrentMutedStatus();

    if (validUserRole == "admin") {
        adminMyAccountPage();
    }
    if (validUserRole == "gok" || validUserRole == "admin") {
        if (isMuted) {
            displayGokMutedAccountPage();
        } else {
            displayGokNotMutedAccountPage();
        }
    } else {
        let content = '<div id="my-account-not-in" class="not-error-message">Você não deveria estar aqui.</div>';
        document.getElementById('my-account-page-container').innerHTML += content;
    }
}

/* Login */
function displayAuthContent(containerId, notLoggedInContent, loggedInContent){
    const user = firebase.auth().currentUser;
    const container = document.getElementById(containerId);
    if (user) {
        container.innerHTML = loggedInContent;
    } else {
        container.innerHTML = notLoggedInContent;
    }
}
window.displayAuthContent = displayAuthContent;

/* Logout */
function doLogout(){
    firebase.auth().signOut().then(() => {
        window.location.replace("my-account.html");
    })
    .catch((error) => {
        alert("Erro ao sair:", error);
    });
}
window.doLogout = doLogout;

/* Update status */
async function updateStatusGok(mensagemVal, fromVal, mutadoVal) {
    try {
        const newDocRef = await db.collection("gokStatus").add({
            mutado: mutadoVal,
            mensagem: mensagemVal,
            deixadaPor: fromVal,
            data: firebase.firestore.FieldValue.serverTimestamp()
        });
        return newDocRef;
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Elisa: " + JSON.stringify(e));
    }
}
window.updateStatusGok = updateStatusGok;

async function updateJackometro() {
    try {
        const newDocRef = await db.collection("jackometro").add({
            data: firebase.firestore.FieldValue.serverTimestamp()
        });
        return newDocRef;
    } catch (e) {
        alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Elisa: " + JSON.stringify(e));
    }
}
window.updateJackometro = updateJackometro;

function getUserWhenReady() {
    return new Promise(resolve => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        });
    });
}
