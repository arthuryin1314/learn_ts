// Shared quiz component. Usage:
//
// <div class="quiz" data-answer="1">
//   <div class="quiz-question">问题文字</div>
//   <div class="quiz-options">
//     <button class="quiz-option" data-index="0">选项 A</button>
//     <button class="quiz-option" data-index="1">选项 B</button>
//   </div>
//   <div class="quiz-feedback"></div>
// </div>
//
// data-answer is the 0-based index of the correct option.
// Optional: data-correct-msg / data-incorrect-msg on .quiz for custom feedback text.

(function () {
  function initQuiz(quiz) {
    var answer = parseInt(quiz.getAttribute("data-answer"), 10);
    var options = quiz.querySelectorAll(".quiz-option");
    var feedback = quiz.querySelector(".quiz-feedback");
    var correctMsg = quiz.getAttribute("data-correct-msg") || "对了。";
    var incorrectMsg = quiz.getAttribute("data-incorrect-msg") || "再想想——正确答案已高亮。";

    options.forEach(function (opt, idx) {
      opt.addEventListener("click", function () {
        var alreadyAnswered = quiz.classList.contains("answered");
        if (alreadyAnswered) return;
        quiz.classList.add("answered");

        options.forEach(function (o) {
          o.setAttribute("disabled", "true");
        });

        if (idx === answer) {
          opt.classList.add("correct");
          if (feedback) {
            feedback.textContent = correctMsg;
            feedback.classList.add("correct");
          }
        } else {
          opt.classList.add("incorrect");
          options[answer].classList.add("correct");
          if (feedback) {
            feedback.textContent = incorrectMsg;
            feedback.classList.add("incorrect");
          }
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quiz").forEach(initQuiz);
  });
})();
