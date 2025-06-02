const $advsiceId = document.querySelector(".advice-id");
const $adviceContent = document.querySelector(".advice-content");
const $pauseBtn = document.querySelector(".pause-btn");

let intervalId;

let pause = false;

async function getAdvice() {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();

  return data;
}

async function updateAdvice() {
  let advice = await getAdvice();

  console.log(advice);

  $advsiceId.textContent = `ADVICE #${advice.slip.id}`;
  $adviceContent.textContent = `"${advice.slip.advice}"`;
}

function timer() {
  intervalId = setInterval(() => {
    updateAdvice();
  }, 10000);
}

document.addEventListener("DOMContentLoaded", () => {
  updateAdvice();
  timer();
});

$pauseBtn.addEventListener("click", function () {
  if (pause === false) {
    pause = true;
    clearInterval(intervalId);
  } else {
    pause = false;
    timer();
  }
});
