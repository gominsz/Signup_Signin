let btn = document.querySelector(".fa-eye");

btn.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

function entrar() {
  let usuario = document.querySelector("#usuario");
  let userLabel = document.querySelector("#userLabel");

  let senha = document.querySelector("#senha");
  let senhaLabel = document.querySelector("#senhaLabel");

  let msgError = document.querySelector("#msgError");

  let validUser = {
    nome: "",
    user: "",
    senha: "",
  };

  user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Nenhum usuário encontrado, realize o cadastro");
    return;
  }

  if (
    new Date(user.registredAt).getMilliseconds() <
    new Date().getMilliseconds() - 300000
  ) {
    console.log("login timeout");
    localStorage.removeItem("user");
    alert("Nenhum usuário encontrado, realize o cadastro");
    return;
  }

  if (usuario.value == user.userCad && senha.value == user.senhaCad) {
    validUser = {
      nome: user.nomeCad,
      user: user.userCad,
      senha: user.senhaCad,
    };
  }

  if (usuario.value == validUser.user && senha.value == validUser.senha) {
    window.location.href = "../../index.html";

    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;

    localStorage.setItem("token", token);
    localStorage.setItem("userLogado", JSON.stringify(validUser));
  } else {
    userLabel.setAttribute("style", "color: red");
    usuario.setAttribute("style", "border-color: red");
    senhaLabel.setAttribute("style", "color: red");
    senha.setAttribute("style", "border-color: red");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Usuário ou senha incorretos";
    usuario.focus();
  }
}
