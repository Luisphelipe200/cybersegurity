  
  // Função para mostrar o formulário de cadastro
  function showSignup() {
      document.getElementById('signupContainer').style.display = 'block';
      document.getElementById('loginForm').reset();
      document.getElementById('signupForm').reset();
      document.querySelector('.container:nth-child(1)').style.display = 'none';
  }
  
  // Função para mostrar o formulário de login
  function showLogin() {
      document.getElementById('signupContainer').style.display = 'none';
      document.getElementById('loginForm').reset();
      document.querySelector('.container:nth-child(1)').style.display = 'block';
  }
  
  // Cadastro de usuários com Firebase Authentication e Firestore
 

  function login(){
    firebase.auth().signInWithEmailAndPassword(form.email().value, 
        form.password().value
    ).then(response =>{
        window.location.href = "inicio.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    })
}


  function cadastrar() {
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('newPassword').value;
      const username = document.getElementById('newUsername').value;
      const gender = document.getElementById('gender') ? document.getElementById("gender").value : '';
      
      // Cria um usuário com Firebase Authentication
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuário criado: ", user.email);
  
          // Adiciona um delay de 2 segundos antes de salvar no Firestore
          setTimeout(() => {
              firebase.firestore().collection('users').doc(user.uid).set({
                  email: email,
                  username: username,
                  gender: gender
              })
              .then(() => {
                  console.log("Dados salvos no Firestore.");
                  alert('Usuário criado com sucesso!');
                  showLogin(); // Volta para o formulário de login
              })
              .catch(error => {
                  alert("Erro ao salvar dados no Firestore: " + error.message);
              });
          }, 2000); // Delay de 2 segundos
      })
      .catch(error => {
          alert('Erro ao criar usuário: ' + error.message);
      });
  }
