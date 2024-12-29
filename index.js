const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");
const screen5 = document.getElementById("screen5");
const screen6 = document.getElementById("screen6");
const screen7 = document.getElementById("screen7");
const screen8 = document.getElementById("screen8");
const screen9 = document.getElementById("screen9");

screen2.style.display = "none";
screen3.style.display = "none";
screen4.style.display = "none";
screen5.style.display = "none";
screen6.style.display = "none";
screen7.style.display = "none";
screen8.style.display = "none";
screen9.style.display = "none";

const Firstname = document.getElementById("Firstname");
const errorfirstname = document.getElementById("errorfirstname");
const Lastname = document.getElementById("Lastname");
const errorlastname = document.getElementById("errorlastname");
errorfirstname.style.display = "none";
errorlastname.style.display = "none";

const nextemailbutton = document.getElementById("nextemailbutton");
const email = document.getElementById("email");
const emailerror = document.getElementById("emailerror");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const imginput = document.getElementById("imginput");
const imgerror = document.getElementById("imgerror");
const Previousbutton = document.getElementById("Previousbutton");
emailerror.style.display = "none";
imgerror.style.display = "none";
let userImageURL = "";
const pass = document.getElementById("pass");
const prepass = document.getElementById("prepass");
const register = document.getElementById("register");
const prepassbtn = document.getElementById("prepassbtn");
const passerror = document.getElementById("passerror");
const repasserror = document.getElementById("repasserror");
repasserror.style.display = "none";

const passRejex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*()_+{}|:;'<>,.?~`"-])[A-Za-z\d@!$%^&*()_+{}|:;'<>,.?~`"-]{8,}$/;
const loginbutton = document.getElementById("loginbutton");
const finalemail = document.getElementById("finalemail");
const finalpassword = document.getElementById("finalpassword");
const finalemailerror = document.getElementById("finalemailerror");
const finalpassworderror = document.getElementById("finalpassworderror");
finalemailerror.style.display = "none";
finalpassworderror.style.display = "none";

const userimg = document.getElementById("userimg");
const startexam = document.getElementById("startexam");

const questionstitles = document.getElementById("questionstitles");
const answers = document.getElementById("answers");
const submitButton = document.getElementById("submit-button");
const perviousquestionbtn = document.getElementById("perviousquestionbtn");

const timerElement = document.getElementById("timer");
let currentquestion = 0;
let rightAnswers = 0;
let chosen;

const getdata = async function () {
  const req = await fetch("jsquestion.json");
  const data = await req.json();
  console.log(data);

  function getRandomQuestions(arr, num) {
    const output = arr.sort(() => 0.5 - Math.random());
    console.log(output);
    return output.slice(0, num);
  }

  const questions = getRandomQuestions(data, 10);
  console.log(questions);

  let questionscount = questions.length;
  console.log(questionscount);

  getquestions(questions[currentquestion], questionscount);

  submitButton.addEventListener("click", function () {
    let right_answer = questions[currentquestion].right_answer;
    checkAnswer(right_answer, chosen);
    questionstitles.innerHTML = "";
    answers.innerHTML = "";
    currentquestion++;

    getquestions(questions[currentquestion], questionscount);
    if (currentquestion === questionscount - 1) {
      submitButton.textContent = "Submit All Answers";
      submitButton.style.color = "red";
    }
    if (currentquestion === 10) {
      screen6.style.display = "none";
    }
    if (currentquestion === 10) {
      screen6.style.display = "none";
      if (rightAnswers < 5) {
        screen9.style.display = "flex";
      } else if (rightAnswers > 5 && rightAnswers < 9) {
        screen8.style.display = "flex";
      } else {
        screen7.style.display = "flex";
      }
    }
  });

  perviousquestionbtn.addEventListener("click", function () {
    if (currentquestion > 0) {
      questionstitles.innerHTML = "";
      answers.innerHTML = "";
      currentquestion--;
      getquestions(questions[currentquestion], questionscount);
    }
  });
};

getdata();

function getquestions(questions, questionscount) {
  if (currentquestion < questionscount) {
    const title = document.createElement("h3");
    const titlecontant = document.createTextNode(questions["title"]);
    const questionstitle = document.getElementById("questionstitles");
    title.appendChild(titlecontant);
    questionstitle.appendChild(title);

    for (let i = 1; i <= 4; i++) {
      const answers = document.getElementById("answers");
      const answer = document.createElement("div");
      answer.id = "answer";
      const answerbutton = document.createElement("input");
      answerbutton.type = "button";
      answerbutton.name = "questionanswer";
      answerbutton.id = `answer_${i}`;
      answerbutton.value = questions[`answer_${i}`];

      answerbutton.dataset.answer = questions[`answer_${i}`];
      let buttontext = document.createTextNode(questions[`answer_${i}`]);
      answerbutton.addEventListener("click", function () {
        chosen = answerbutton.dataset.answer;
      });
      answerbutton.appendChild(buttontext);
      answer.appendChild(answerbutton);
      answers.appendChild(answer);
    }
  }
}
function checkAnswer(right_answer, chosen) {
  if (chosen === right_answer) {
    rightAnswers++;
  }
  console.log(rightAnswers);
}
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function startCountdown(duration) {
  let time = duration;
  const timerElement = document.getElementById("timer");

  const interval = setInterval(() => {
    timerElement.textContent = formatTime(time);

    if (time <= 0) {
      clearInterval(interval);
      alert("Time is up!");
    } else {
      time -= 1;
    }
  }, 1000);
}
const namebutton = document.getElementById("namebutton");
namebutton.addEventListener("click", function () {
  const firstnameValue = Firstname.value.trim();
  const lastnameValue = Lastname.value.trim();
  if (firstnameValue === "" && lastnameValue === "") {
    errorfirstname.style.display = "flex";
    errorfirstname.textContent = "Please enter your first name";
    errorlastname.style.display = "flex";
    errorlastname.textContent = "Please enter your last name";
  } else if (firstnameValue === "") {
    errorfirstname.style.display = "flex";
    errorfirstname.textContent = "Please enter your first name";
    errorlastname.style.display = "none";
  } else if (lastnameValue === "") {
    errorlastname.style.display = "flex";
    errorlastname.textContent = "Please enter your last name";
    errorfirstname.style.display = "none";
  } else {
    screen1.style.display = "none";
    screen2.style.display = "flex";
    errorfirstname.style.display = "none";
    errorlastname.style.display = "none";
  }

  imginput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        userImageURL = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  nextemailbutton.addEventListener("click", function () {
    if (!emailRegex.test(email.value) && imginput.files.length === 0) {
      emailerror.style.display = "flex";
      emailerror.textContent = "Please enter your email";
      imgerror.style.display = "flex";
      imgerror.textContent = "Please upload a photo";
    } else if (!emailRegex.test(email.value)) {
      emailerror.style.display = "flex";
      emailerror.textContent = "Please enter valid email";
      imgerror.style.display = "none";
      imgerror;
    } else if (imginput.files.length === 0) {
      imgerror.style.display = "flex";
      imgerror.textContent = "Please upload a photo";
      emailerror.style.display = "none";
    } else {
      screen2.style.display = "none";
      screen3.style.display = "flex";
      emailerror.style.display = "none";
      imgerror.style.display = "none";
      userimg.src = userImageURL;
    }
  });

  Previousbutton.addEventListener("click", function () {
    screen1.style.display = "flex";
    screen2.style.display = "none";
  });

  register.addEventListener("click", function () {
    if (pass.value === "" && prepass.value === "") {
      passerror.style.display = "flex";
      passerror.textContent = "Please Enter  Password";
      repasserror.style.display = "flex";
      repasserror.textContent = "Renter the password";
    } else if (pass.value === "") {
      passerror.style.display = "flex";
      repasserror.style.display = "none";
      passerror.textContent = "Please Enter  Password";
    } else if (!passRejex.test(pass.value)) {
      passerror.style.display = "flex";
      passerror.textContent =
        "Please Enter Valid Password(it must be more than 8 char contain numbers, capital char and special char like(@/$/#/....)";
      repasserror.style.display = "none";
    } else if (prepass.value === "") {
      repasserror.style.display = "flex";
      repasserror.textContent = "Renter the password";
      passerror.style.display = "none";
    } else if (pass.value !== prepass.value) {
      repasserror.style.display = "flex";
      passerror.style.display = "none";
      repasserror.textContent =
        "Passwords do not match. Please re-enter your password.";
    } else {
      screen4.style.display = "flex";
      screen3.style.display = "none";
    }
  });
  prepassbtn.addEventListener("click", function () {
    screen3.style.display = "none";
    screen2.style.display = "flex";
  });

  loginbutton.addEventListener("click", function () {
    if (finalemail.value === "" && finalpassword.value === "") {
      finalemailerror.style.display = "flex";
      finalemailerror.textContent = "Please Enter Your Email";
      finalpassworderror.style.display = "flex";
      finalpassworderror.textContent = "please Enter Your Password";
    } else if (finalemail.value === "") {
      finalemailerror.style.display = "flex";
      finalemailerror.textContent = "Please enter email";
      finalpassworderror.style.display = "none";
    } else if (finalemail.value !== email.value) {
      finalemailerror.style.display = "flex";
      finalemailerror.textContent =
        "Please Re-enter emailagain because it doesn't match ";
      finalpassworderror.style.display = "none";
    } else if (finalpassword.value === "") {
      finalpassworderror.style.display = "flex";
      finalpassworderror.textContent = "Please Enter password";
    } else if (pass.value !== finalpassword.value) {
      finalemailerror.style.display = "none";
      finalpassworderror.style.display = "flex";
      finalpassworderror.textContent = "This password doesn't match.";
    } else {
      finalemailerror.style.display = "none";
      screen4.style.display = "none";
      screen5.style.display = "flex";
    }
  });
  startexam.addEventListener("click", function () {
    startCountdown(600);
    screen5.style.display = "none";
    screen6.style.display = "flex";
  });
});
