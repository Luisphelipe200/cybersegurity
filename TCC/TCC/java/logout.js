function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../html/login.html";
    }).catch(() => {
        alert('An error occurred while to log out');
    })
}