import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { getFirestore, query, collection, getDocs, where } from 'firebase/firestore'
import { hideForms, loadHangar, inGame, click3, connectHover, connectClick, loadProg } from './gui.js'
const firebaseConfig = {
    apiKey: "AIzaSyBsoKbFb5FCspviavn03mu-02f5y0AgEeo",
    authDomain: "world-of-tanks-browser.firebaseapp.com",
    projectId: "world-of-tanks-browser",
    storageBucket: "world-of-tanks-browser.appspot.com",
    messagingSenderId: "1055250483598",
    appId: "1:1055250483598:web:1d734b02aec11562517cdf",
    measurementId: "G-M2BTJK532W"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

// Get vehicle data



// Auth status change listener

const accLogName = document.querySelector("#accountLogName")
const accName = document.querySelector("#accountName")
const accEmail = document.querySelector("#accountEmail")
const accName2 = document.querySelector("#accountName2")
const accLog = document.querySelector("#loggedUser")
const enterHang1 = document.querySelector("#enterHangar1")
const enterHang2 = document.querySelector("#enterHangar2")
const logIn = document.querySelector("#connect1")
const registerUsr = document.querySelector("#registration")
const loadPart0 = document.getElementById("loadingPart0")
//const connectClick = new Audio("audio/loading/connectButton2.wav")
//const connectHover = new Audio("audio/loading/connectButton1.wav")
let authComplete = false

enterHang1.addEventListener("click", () => {
    connectClick.play()
    hideForms()
    setTimeout(() => {
        loadHangar()
    }, 700)
})

enterHang2.addEventListener("click", () => {
    connectClick.play()
    hideForms()
    setTimeout(() => {
        loadHangar()
    }, 700)
})

enterHang1.addEventListener("mouseover", () => {
    connectHover.play()
})

enterHang2.addEventListener("mouseover", () => {
    connectHover.play()
})

onAuthStateChanged(auth, (user) => {
    if (user){
        authComplete = true
        accLogName.innerText = user.displayName
        accEmail.innerText = user.email
        playerName.innerText = user.displayName
        accName.innerText = user.displayName
        accName2.innerText = user.displayName
        accLog.classList.remove("hidden")
        disableInputs()
        loginForm.classList.add("loggedIn")
        signupForm.classList.add("loggedIn")
        enterHang1.classList.remove("totallyHidden")
        enterHang2.classList.remove("totallyHidden")
        logIn.classList.add("totallyHidden")
        registerUsr.classList.add("totallyHidden")
        loginEmail.value = user.email
        document.onkeydown = (e) => {
            if (e.key == "Enter" && authComplete == true && inGame == false && !loadProg.classList.contains("hidden")){
                connectClick.play()
                hideForms()
                setTimeout(() => {
                    loadHangar()
                }, 700)
            }
        }
    } else {
        authComplete = false
        accLogName.innerText = ""
        playerName.innerText = ""
        loginEmail.value = ""
        accName.innerText = ""
        accEmail.innerText = ""
        accName2.innerText = ""
        accLog.classList.add("hidden")
        enableInputs()
        loginForm.classList.remove("loggedIn")
        signupForm.classList.remove("loggedIn")
        enterHang1.classList.add("totallyHidden")
        enterHang2.classList.add("totallyHidden")
        logIn.classList.remove("totallyHidden")
        registerUsr.classList.remove("totallyHidden")
        signupForm.reset()
        loginForm.reset()
    }
    loadPart0.classList.add("hidden")
})

function disableInputs(){
    const emailInputS = signupForm["signupEmail"];
    const passwordInputS = signupForm["signupPassword"];
    const confirmPasswordInput = signupForm["signupPasswordConfirm"];
    const nicknameInput = signupForm["signupNickname"];
    const emailInput = loginForm["loginEmail"];
    const passwordInput = loginForm["loginPassword"];
    emailInputS.classList.add("unavailable")
    passwordInputS.classList.add("unavailable")
    confirmPasswordInput.classList.add("unavailable")
    nicknameInput.classList.add("unavailable")
    emailInput.classList.add("unavailable")
    passwordInput.classList.add("unavailable")
}

function enableInputs(){
    const emailInputS = signupForm["signupEmail"];
    const passwordInputS = signupForm["signupPassword"];
    const confirmPasswordInput = signupForm["signupPasswordConfirm"];
    const nicknameInput = signupForm["signupNickname"];
    const emailInput = loginForm["loginEmail"];
    const passwordInput = loginForm["loginPassword"];
    emailInputS.classList.remove("unavailable")
    passwordInputS.classList.remove("unavailable")
    confirmPasswordInput.classList.remove("unavailable")
    nicknameInput.classList.remove("unavailable")
    emailInput.classList.remove("unavailable")
    passwordInput.classList.remove("unavailable")
}

// Signup

const signupForm = document.querySelector("#signupForm")

signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = signupForm["signupEmail"].value
    let nickname = signupForm["signupNickname"].value
    let password = signupForm["signupPassword"].value
    let confirmPassword = signupForm["signupPasswordConfirm"].value
    const emailInput = signupForm["signupEmail"];
    const passwordInput = signupForm["signupPassword"];
    const confirmPasswordInput = signupForm["signupPasswordConfirm"];
    const nicknameInput = signupForm["signupNickname"];
    const errorElement = document.getElementById("registrationResult");

    resetForm();
    click3.play()

    if (!email || !password || !confirmPassword || !nickname) {
        errorElement.innerText = "Vyplňte prosím všechna pole.";
        e.preventDefault();
        return;
    }

    if (!isValidEmail(email)) {
        errorElement.innerText = "Neplatný email.";
        emailInput.classList.add("invalid")
        e.preventDefault();
        return;
    }

    if (!isValidPassword(password)) {
        errorElement.innerText = "Neplatné heslo.";
        passwordInput.classList.add("invalid")
        e.preventDefault();
        return;
    }

    if (password !== confirmPassword) {
        errorElement.innerText = "Heslo a potvrzení hesla se neshodují.";
        confirmPasswordInput.classList.add("invalid")
        e.preventDefault();
        return;
    }

    // Kontrola herního jména
    if (!isValidNickname(nickname)) {
        errorElement.innerText = "Neplatné herní jméno.";
        nicknameInput.classList.add("invalid")
        e.preventDefault();
        return;
    }

    errorElement.innerText = "";
    resetForm()

    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        enterHang1.focus()
        formSwitch = true
        toggleForms()
        updateProfile(auth.currentUser, {
            displayName: nickname
        }).then(() => {
            accLogName.innerText = nickname
            playerName.innerText = nickname
        })
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-exists') {
            emailInput.classList.add("invalid")
            errorElement.innerText = "Tento email už patří k jinému účtu.";
        }
    });


    function resetForm() {
        emailInput.classList.remove("valid")
        passwordInput.classList.remove("valid")
        confirmPasswordInput.classList.remove("valid")
        nicknameInput.classList.remove("valid")
        emailInput.classList.remove("invalid")
        passwordInput.classList.remove("invalid")
        confirmPasswordInput.classList.remove("invalid")
        nicknameInput.classList.remove("invalid")
    }
})

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    var hasLowercase = /[a-z]/.test(password);
    var hasUppercase = /[A-Z]/.test(password);
    var hasNumber = /\d/.test(password);
    return password.length >= 8 && hasLowercase && hasUppercase && hasNumber;
}

function isValidNickname(nickname) {
    var nicknameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return nicknameRegex.test(nickname);
}

// Logout

const logoffUsr = document.querySelector("#logoffUser")

logoffUsr.addEventListener("click", () => {
    click3.play()
    setTimeout(() => {
        signOut(auth)
    }, 700)
})

// Log in

const loginForm = document.querySelector("#loginForm")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = loginForm["loginEmail"].value
    const password = loginForm["loginPassword"].value
    const emailInput = loginForm["loginEmail"];
    const passwordInput = loginForm["loginPassword"];
    const errorElement = document.getElementById("loginResult");

    resetForm();
    click3.play()

    if (!emailInput.value || !passwordInput.value) {
        errorElement.innerText = "Vyplňte prosím všechna pole.";
        e.preventDefault();
        return;
    }

    if (!isValidEmail(emailInput.value)) {
        errorElement.innerText = "Neplatný email.";
        emailInput.classList.add("invalid")
        e.preventDefault();
        return;
    }

    if (!isValidPassword(passwordInput.value)) {
        errorElement.innerText = "Neplatné heslo.";
        passwordInput.classList.add("invalid")
        e.preventDefault();
        return;
    }

    errorElement.innerText = "";
    resetForm()

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        enterHang1.focus()
    })
    .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
            emailInput.classList.add("invalid")
            passwordInput.classList.add("invalid")
            errorElement.innerText = "Nesprávný email a/nebo heslo.";
        }
    });

    function resetForm() {
        emailInput.classList.remove("valid")
        passwordInput.classList.remove("valid")
        emailInput.classList.remove("invalid")
        passwordInput.classList.remove("invalid")
    }
})