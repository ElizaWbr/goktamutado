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

async function addProvaGok(data) {
    try {
        const newDocRef = await db.collection("possiveisGoks").add({
            argumento: data,
            fixado: false,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error("Error writing document: ", e);
    }
}

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
            });
        });

        allGoks.sort((a, b) => {
            if (a.criadoEm && b.criadoEm) {
                return b.criadoEm.toDate() - a.criadoEm.toDate();
            } else if (a.criadoEm) {
                return -1;
            } else if (b.criadoEm) {
                return 1;
            } else {
                return 0;
            }
        });
        return allGoks.map(item => item.argumento);
    } catch (e) {
        console.error("Erro ao buscar os dados: ", e);
        return [];
    }
}

window.addProvaGok = addProvaGok;
window.getAllGoks = getAllGoks;

