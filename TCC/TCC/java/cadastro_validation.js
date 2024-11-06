

function signup() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;


    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuário criado: ", user.email);

            // Adiciona um delay de 2 segundos (2000 milissegundos) antes de salvar no Firestore
            setTimeout(() => {
                firebase.firestore().collection('users').doc(user.email).set({
                    name: name,
                    email: email

                })
                .then(() => {
                    console.log("Dados salvos no Firestore.");
                    alert('user created successfully');
                })
                .catch(error => {
                    alert("Erro ao salvar dados no Firestore: " + error.message);
                });
            }, 2000); // Delay de 2 segundos
            
        })
        .catch(error => {
            alert(getErrorMessage(error));
        });
}



function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "The email address you entered is already in use. Please use a different email address or recover your account if necessary.";
    }
    return error.message;
}



function login(){
    window.location.href = "../Pages/login_page.html";
}



function onChangeName() {
    toggleButtonsDisable();
    toggleNameErrors();
}

function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}



function isNameValid() {
    const name = document.getElementById("name").value;
    return name.length > 0;
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    return email.length > 0 && validateEmail(email);
}



function isPasswordValid() {
    const password = document.getElementById("password").value;
    return password.length >= 6; 
}



function toggleNameErrors() {
    const name = document.getElementById('name').value;
    if (!name) {
        document.getElementById('name-required-error').style.display = "block";
    } else {
        document.getElementById('name-required-error').style.display = "none";
    }
}

function toggleEmailErrors() {
    const email = document.getElementById('email').value;
    if (!email) {
        document.getElementById('email-required-error').style.display = "block";
    } else {
        document.getElementById('email-required-error').style.display = "none";
    }

    if (validateEmail(email)) {
        document.getElementById('email-invalid-error').style.display = "none";
    } else {
        document.getElementById('email-invalid-error').style.display = "block";
    }
}


function togglePasswordErrors() {
    const password = document.getElementById('password').value;
    if (!password) {
        document.getElementById('password-required-error').style.display = "block";
    } else {
        document.getElementById('password-required-error').style.display = "none";
    }

    if (password.length < 6) {
        document.getElementById('password-min-length-error').style.display = "block";
    } else {
        document.getElementById('password-min-length-error').style.display = "none";
    }
}



function toggleButtonsDisable() {
    const nameValid = isNameValid();
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    document.getElementById('sign-button').disabled = !nameValid || !emailValid || !passwordValid;
}