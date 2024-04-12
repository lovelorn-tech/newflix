// IMPORTS
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const inputEmailLogin = document.getElementById("input-email-login");
const inputPasswordLogin = document.getElementById("input-password-login");
const inputEmailSignup = document.getElementById("input-email-signup");
const inputPasswordSignup = document.getElementById("input-password-signup");
const inputPassword2Signup = document.getElementById("input-password2-signup");
const inputNicknameSignup = document.getElementById("input-nickname-signup");
const submitBtns = document.querySelectorAll(".btn-submit");

// LOCAL VARIABLES
let register = false;
let loginFormValid = false;
let signupFormValid = false;

const inputLoginEmailProps = {
  ignoreEmpty: false,
  regex: new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  ),
  valid: null,
  value: null,
  small: document.getElementById("small-email-login"),
  usedFor: "login",
};
const inputLoginPasswordProps = {
  ignoreEmpty: false,
  regex: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){12,30}$/
  ),
  valid: null,
  value: null,
  small: document.getElementById("small-password-login"),
  usedFor: "login",
};
const inputSignupEmailProps = {
  ignoreEmpty: false,
  regex: new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  ),
  valid: null,
  value: null,
  small: document.getElementById("small-email-signup"),
  usedFor: "signup",
};
const inputSignupPasswordProps = {
  ignoreEmpty: false,
  regex: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){12,30}$/
  ),
  valid: null,
  value: null,
  small: document.getElementById("small-password-signup"),
  usedFor: "signup",
};
const inputSignupPassword2Props = {
  ignoreEmpty: false,
  regex: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){12,30}$/
  ),
  valid: null,
  value: null,
  small: document.getElementById("small-password2-signup"),
  usedFor: "signup",
};
const inputSignupNicknameProps = {
  ignoreEmpty: false,
  regex: new RegExp(/^[A-Za-z\s]{4,20}$/),
  valid: null,
  value: null,
  small: document.getElementById("small-nickname-signup"),
  usedFor: "signup",
};

// FUNCTIONS
const onLoginSubmit = async (e) => {
  e.preventDefault();
  if (loginFormValid) {
    const login = {
      email: inputEmailLogin.value,
      password: inputPasswordLogin.value,
    };
    const loginSuccess = await (
      await import("../services/auth.js")
    ).authService.login(login);
    if (loginSuccess[0]) window.open("/", "_self");
    else alert(loginSuccess[1]);
  } else
    alert(
      "Algunos campos del formulario no tienen el formato correcto o están vacíos."
    );
};

const onSignupSubmit = async (e) => {
  e.preventDefault();
  if (signupFormValid) {
    if (inputPasswordSignup.value === inputPassword2Signup.value) {
      const signup = {
        email: inputEmailSignup.value,
        password: inputPasswordSignup.value,
        nickname: inputNicknameSignup.value,
      };
      const signupSuccess = (
        await import("../services/auth.js")
      ).authService.signup(signup);
      if (signupSuccess[0]) {
        alert(signupSuccess[1]);
        swapForms();
      } else alert(signupSuccess[1]);
    } else {
      alert("Las contraseñas no coinciden.");
    }
  } else
    alert(
      "Algunos campos del formulario no tienen el formato correcto o están vacíos."
    );
};

const swapForms = () => {
  const authLeft = document.getElementById("auth-left");
  authLeft.style.animation = "none";
  authLeft.offsetHeight; /* trigger reflow */
  authLeft.style.animation = null;
  const authRight = document.getElementById("auth-right");
  authRight.style.animation = "none";
  authRight.offsetHeight; /* trigger reflow */
  authRight.style.animation = null;

  register = !register;

  const articleLogin = document.getElementById("article-login");
  const articleSignup = document.getElementById("article-signup");
  loginForm.style.display = register ? "none" : "flex";
  signupForm.style.display = register ? "flex" : "none";
  articleLogin.style.display = register ? "none" : "flex";
  articleSignup.style.display = register ? "flex" : "none";
};

const validateLoginForm = () => {
  loginFormValid = inputLoginEmailProps.valid && inputLoginPasswordProps.valid;
  submitBtns[1].disabled = !loginFormValid;
};

const validateSignupForm = () => {
  signupFormValid =
    inputSignupEmailProps.valid &&
    inputSignupPasswordProps.valid &&
    inputSignupPassword2Props.valid &&
    inputSignupNicknameProps.valid;
  submitBtns[0].disabled = !signupFormValid;
};

const validateInput = async (props, e) => {
  const inputService = (await import("../components/input.js")).inputService;
  props.value = e.target.value;
  props.valid = inputService.validate(e, props);
  props.usedFor === "login" ? validateLoginForm() : validateSignupForm();
};

// EVENTS
loginForm.addEventListener("submit", onLoginSubmit, true);
signupForm.addEventListener("submit", onSignupSubmit, true);

inputEmailLogin.addEventListener(
  "keyup",
  validateInput.bind(null, inputLoginEmailProps),
  true
);
inputEmailLogin.addEventListener(
  "blur",
  validateInput.bind(null, inputLoginEmailProps),
  true
);
inputPasswordLogin.addEventListener(
  "keyup",
  validateInput.bind(null, inputLoginPasswordProps),
  true
);
inputPasswordLogin.addEventListener(
  "blur",
  validateInput.bind(null, inputLoginPasswordProps),
  true
);
inputEmailSignup.addEventListener(
  "keyup",
  validateInput.bind(null, inputSignupEmailProps),
  true
);
inputEmailSignup.addEventListener(
  "blur",
  validateInput.bind(null, inputSignupEmailProps),
  true
);
inputPasswordSignup.addEventListener(
  "keyup",
  validateInput.bind(null, inputSignupPasswordProps),
  true
);
inputPasswordSignup.addEventListener(
  "blur",
  validateInput.bind(null, inputSignupPasswordProps),
  true
);
inputPassword2Signup.addEventListener(
  "keyup",
  validateInput.bind(null, inputSignupPassword2Props),
  true
);
inputPassword2Signup.addEventListener(
  "blur",
  validateInput.bind(null, inputSignupPassword2Props),
  true
);
inputNicknameSignup.addEventListener(
  "keyup",
  validateInput.bind(null, inputSignupNicknameProps),
  true
);
inputNicknameSignup.addEventListener(
  "blur",
  validateInput.bind(null, inputSignupNicknameProps),
  true
);
