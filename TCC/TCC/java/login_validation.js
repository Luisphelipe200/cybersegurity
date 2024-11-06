
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
}


function login(){
    firebase.auth().signInWithEmailAndPassword(form.email().value, 
        form.password().value
    ).then(response =>{
        window.location.href = "../html/inicio.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Email or password invalid, try again please";
    } return error.message;
}




function signup(){
    showLoading();
    //window.location.href = "../Pages/select_account_page.html";
}









function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    return password.length > 0; 
}





function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}



function toggleButtonsDisable() { 
    const emailValid = isEmailValid();   
    const passwordValid = isPasswordValid();
    
    form.loginButton().disabled = !emailValid || !passwordValid;

}




const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    recoverPassword: () => document.getElementById('recover-password-button'),
}

