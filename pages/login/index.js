import { login } from "../../scripts/api.js";

const leftAside = document.querySelector(".left-aside");
const rightAside = document.querySelector(".right-aside");

function renderLeftAside() {
  leftAside.insertAdjacentHTML(
    "beforeend",
    `<h1>Petinfo</h1>
    <h2><em>Amor</em> e <em>Carinho</em> por meio do conhecimento</h2>
    <span>
      <p>Todas as informações para melhorar a vida do seu pet em um só lugar</p>
      <figure>
        <img src="/assets/img/loginBanner.svg" alt="banner">
      </figure>
    </span>
   `
  );
}

renderLeftAside();

function renderRightAside() {
  rightAside.insertAdjacentHTML(
    "beforeend",
    `<form>
    <h3>Login</h3>
    <label for='email'>Email</label>
    <input type='text' id='email' class='login-input'name='email' placeholder='Digite seu email aqui'>
    <label for='password'>Senha</label>
    <input type='password' id='password' class='login-input' name='password' placeholder='Digite sua senha aqui'>
    <p class='hidden' id='form-alert'></p>
    <button type='submit' class='form-login-btn disable'>Acessar</button>
    <p class='form-question'>Ainda não possui conta?</p>
    <p class='form-info'>Clicando no botão abaixo, você pode se cadastrar rapidamente</p>
    <button type='button' class='register-btn'>Cadastrar</button>
  </form>
  `
  );
}

renderRightAside();

const alert = document.querySelector("#form-alert");

const eventsLogin = () => {
  const form = document.querySelector("form");
  const elements = [...form];
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const button = document.querySelector(".form-login-btn");

  elements.forEach((element) => {
    if (element.tagName == "INPUT") {
      element.addEventListener("keydown", () => {
        password.classList.remove('alert-input-border')
        email.classList.remove('alert-input-border')
        alert.classList.add("hidden");
      });

      element.addEventListener("keyup", () => {
        if (email.value !== "" && password.value !== "" && button.innerText == 'Acessar') {
          button.classList.remove("disable");
        } else {
          button.classList.add("disable");
        }
      });
    }

    if (
      element.tagName == "BUTTON" &&
      element.className.includes("register-btn")
    ) {
      element.addEventListener("click", () => {
        window.location.replace("/pages/register/");
      });
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.innerHTML = "";
    button.insertAdjacentHTML(
      "beforeend",
      `
      <img src='/assets/img/spinner.svg' alt='spinner' class='loading' id='loading'>
    `
    );

    button.classList.add("disable");

    const body = {};

    elements.forEach((elem) => {
      if (elem.tagName == "INPUT" && elem.value !== "") {
        body[elem.id] = elem.value;
      }
    });
    await loginUser(body);
  })

  async function loginUser(data) {

    const response = await login(data);

    if (response.message !== undefined) {
      button.innerHTML = "";
      button.innerHTML = "Acessar";
      button.classList.remove("disable");
      alert.classList.remove("hidden");
      alert.innerText = response.message;
      if(response.message == 'A senha está incorreta') {
        password.classList.add('alert-input-border')
      }
      if(response.message == 'O email está incorreto') {
        email.classList.add('alert-input-border')
      }
      console.log(response.message);
    } else {
      console.log("login efetuado com sucesso");
      window.location.replace("/pages/home");
      };
    }
};

eventsLogin();

