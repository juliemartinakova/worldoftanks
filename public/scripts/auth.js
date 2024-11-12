//import { initializeApp } from 'firebase/app'
///*import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, //updateProfile } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js'*/
//import { getFirestore, query, collection, getDocs, getDoc, where , doc} from 'firebase/firestore'
//import { debugPrompt, debugCommand, game } from './gui.js';
//
////* firebase
//
//const firebaseConfig = {
//    apiKey: "AIzaSyBsoKbFb5FCspviavn03mu-02f5y0AgEeo",
//    authDomain: "world-of-tanks-browser.firebaseapp.com",
//    projectId: "world-of-tanks-browser",
//    storageBucket: "world-of-tanks-browser.appspot.com",
//    messagingSenderId: "1055250483598",
//    appId: "1:1055250483598:web:1d734b02aec11562517cdf",
//    measurementId: "G-M2BTJK532W"
//};
//const app = initializeApp(firebaseConfig);
////const auth = getAuth(app)
//const db = getFirestore(app)
//
////* vars
//
//const debugConsoleAPIref = doc(db, "keys", "APIkeys");
//const debugConsoleAPI = await getDoc(debugConsoleAPIref)
//const debugConsoleAPIkey = debugConsoleAPI.data().debugConsoleAPIkey
//let activeDebug = false
//
////* classes
//
//Element.prototype.hide = function(){
//    if(this.classList.contains("show-nospace")){
//        this.classList.add("hidden-nospace")
//    }
//    this.classList.add("hidden")
//}
//
//HTMLElement.prototype.show = function(){
//    if(this.classList.contains("hidden-nospace")){
//        this.classList.add("show-nospace")
//        this.classList.remove("hidden-nospace")
//    }
//    this.classList.remove("hidden")
//}

//* functions

//onAuthStateChanged(auth, (user) => {
//    if (user){
//
//    } else {
//
//    }
//    loader.hide()
//})

//* event listeners

//debugPrompt.addEventListener("submit", (e)=>{
//    e.preventDefault()
//    let command = debugCommand.value
//    if(activeDebug == false){
//        if(command == debugConsoleAPIkey){
//            debugCommand.setAttribute("value","")
//            debugCommand.placeholder = "Enter commands here..."
//            game.evaluate("welcome")
//            setTimeout(()=>{
//                activeDebug = true
//            },10)
//        } else {
//            debugCommand.placeholder = "Invalid key..."
//        }
//    }
//    if(activeDebug == true){
//        game.evaluate(command)
//    }
//    debugPrompt.reset()
//})