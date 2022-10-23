import { create } from "../../scripts/api.js";

const toastSucess = [
  "Sua conta foi criada com sucesso!",
  "Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: Acessar a página de login",
];

const leftAside = document.querySelector(".left-aside");
const rightAside = document.querySelector(".right-aside");

function renderLeftAside() {
  leftAside.insertAdjacentHTML(
    "beforeend",
    `<form>
        <h3>Cadastro</h3>
        <button type='button' class='back-to-login-btn btn-top'>Voltar para o login</button>
        <label for='username'>Usuário</label>
        <input type='text' id='username' name='username' placeholder='Digite seu usuário aqui'>
        <label for='email'>Email</label>
        <input type='email' id='email' name='email' placeholder='Digite seu email aqui' required>
        <label for='avatar'>Link da foto do perfil</label>
        <input type='url' id='avatar' name='profile-picture' placeholder='Insira o link aqui'>
        <label for='password'>Senha</label>
        <input type='password' id='password' name='password' placeholder='Digite sua senha aqui'>
        <p class='hidden' id='form-alert'></p>
        <button type='submit' class='form-register-btn disable'>Cadastrar</button>
        <button type='button' class='back-to-login-btn'>Voltar para o login</button>
    </form>
  `
  );
}

renderLeftAside();

function renderRightAside() {
  rightAside.insertAdjacentHTML(
    "beforeend",
    `<h1>Petinfo</h1>
    <h2><em>Ooooooba!</em></h2>
    <span>
      <p>Agora vamos poder contribuir para o bem estar do seu pet por meio do conhecimento</p>
      <figure>
        <img src="/assets/img/registerBanner.svg" alt="banner" class='banner'>
      </figure>
    </span>
   `
  );
}

renderRightAside();

const alert = document.querySelector("#form-alert");

const eventsRegister = () => {
  const form = document.querySelector("form");
  const elements = [...form];
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const avatar = document.querySelector("#avatar");
  const password = document.querySelector("#password");
  const buttom = document.querySelector(".form-register-btn");

  elements.forEach((element) => {
    const fadeBtn = () => {
      if (element.tagName == "INPUT") {
        element.addEventListener("keyup", () => {
          alert.classList.add("hidden");
          if (
            email.value !== "" &&
            password.value !== "" &&
            username.value !== "" &&
            avatar.value !== ""
          ) {
            buttom.classList.remove("disable");
          } else {
            buttom.classList.add("disable");
          }
        });
      }
    };

    fadeBtn();

    const redirect = () => {
      if (
        element.tagName == "BUTTON" &&
        element.className.includes("back-to-login-btn")
      ) {
        element.addEventListener("click", () => {
          window.location.replace("/");
        });
      }
    };

    redirect();
  });

  const submit = () => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      buttom.innerHTML = "";
      buttom.insertAdjacentHTML(
        "beforeend",
        `
      <img src='/assets/img/spinner.svg' alt='spinner' class='loading' id='loading'>
    `
      );
      buttom.classList.add("disable");

      const body = {};

      elements.forEach((elem) => {
        if (elem.tagName == "INPUT" && elem.value !== "") {
          body[elem.id] = elem.value;
        }
      });

      registerUser(body);
    });
  };
  submit();

  async function registerUser(data) {
    const response = await create(data);

    if (response.message) {
      buttom.innerHTML = "";
      buttom.innerHTML = "Cadastrar";
      buttom.classList.remove("disable");
      alert.classList.remove("hidden");
      alert.innerText = response.message;
      console.log(response.message);
    } else {
      toast(toastSucess[0], toastSucess[1]);
      setTimeout(() => {
        window.location.replace("/");
      }, 4000);
    }
  }
};

eventsRegister();
