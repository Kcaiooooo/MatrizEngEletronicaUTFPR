import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// =========================================================================
// ATENÇÃO USUÁRIO: COLOQUE AQUI AS CREDENCIAIS DO SEU PROJETO FIREBASE!
// Vá em console.firebase.google.com -> Configurações do Projeto -> Web
// =========================================================================
const firebaseConfig = {
    apiKey: "COLOQUE_SUA_API_KEY_AQUI",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para salvar uma nova matriz
export async function saveMatrix(matrixData) {
    try {
        const docRef = await addDoc(collection(db, "custom_matrices"), {
            ...matrixData,
            createdAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: e.message };
    }
}

// Função para listar todas as matrizes na Comunidade
export async function getMatricesList() {
    try {
        const querySnapshot = await getDocs(collection(db, "custom_matrices"));
        const matrices = [];
        querySnapshot.forEach((doc) => {
            matrices.push({ id: doc.id, ...doc.data() });
        });
        return matrices;
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
}

// Função para buscar uma matriz específica pelo ID
export async function getMatrixById(id) {
    try {
        const docRef = doc(db, "custom_matrices", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        return null;
    }
}
