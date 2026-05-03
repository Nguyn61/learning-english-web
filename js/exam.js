// ============================================
// EXAM PAGE — Mock Data + Logic
// ============================================

// ── Mock Questions Data (TOEIC Part 5 style) ──
const EXAM_DATA = {
  title: "New Economy TOEIC Test 1",
  timeLimit: 40 * 60, // 40 minutes in seconds
  part: "Part 5",
  questions: [
    {
      id: 101,
      text: "When filling out the order form, please _____ your address clearly to prevent delays.",
      options: ["fix", "write", "send", "direct"],
      answer: 1, // B. write
      explanation:
        '"Write your address" là cụm từ đúng ngữ cảnh. "Write" (viết) phù hợp với hành động điền form.',
    },
    {
      id: 102,
      text: "All employees are _____ to attend the annual safety training workshop next Friday.",
      options: ["require", "required", "requiring", "requirement"],
      answer: 1, // B. required
      explanation:
        'Cấu trúc bị động "are required to + V" — được yêu cầu phải làm gì.',
    },
    {
      id: 103,
      text: "The annual report _____ that profits increased by twenty percent last quarter.",
      options: ["indicate", "indicates", "indicating", "indicated"],
      answer: 1, // B. indicates
      explanation:
        'Chủ ngữ "The annual report" là số ít, thì hiện tại → "indicates" (chia ngôi ba số ít).',
    },
    {
      id: 104,
      text: "The safety inspector found that the factory _____ all the required regulations.",
      options: ["met", "meet", "meeting", "meets"],
      answer: 0, // A. met
      explanation:
        'Mệnh đề chính dùng "found" (quá khứ) → mệnh đề phụ cũng dùng quá khứ → "met".',
    },
    {
      id: 105,
      text: "Visitors to the research facility must _____ a security badge at the front desk.",
      options: ["obtain", "obtains", "obtained", "obtaining"],
      answer: 0, // A. obtain
      explanation:
        'Sau "must" (modal verb) cần động từ nguyên thể → "obtain" (lấy/nhận).',
    },
    {
      id: 106,
      text: "She is a very _____ worker, always arriving on time and finishing her tasks early.",
      options: ["hard", "hardly", "hardworking", "hardest"],
      answer: 2, // C. hardworking
      explanation:
        'Cần một tính từ mang nghĩa chăm chỉ. "Hardworking" (chăm chỉ) là phù hợp nhất.',
    },
    {
      id: 107,
      text: "Please remember to turn off the lights _____ leaving the room.",
      options: ["before", "after", "during", "while"],
      answer: 0, // A. before
      explanation:
        '"before leaving" (trước khi rời đi). Tắt đèn trước khi ra ngoài là hợp lý.',
    },
    {
      id: 108,
      text: "We will _____ a new manager to oversee the project next week.",
      options: ["hired", "hires", "hiring", "hire"],
      answer: 3, // D. hire
      explanation: 'Sau "will" cần một động từ nguyên thể → "hire".',
    },
    {
      id: 109,
      text: "The marketing department is located _____ the second floor of the building.",
      options: ["in", "on", "at", "to"],
      answer: 1, // B. on
      explanation:
        'Giới từ dùng với tầng của tòa nhà là "on" (on the second floor).',
    },
    {
      id: 110,
      text: "The customer was very satisfied _____ the service she received at the restaurant.",
      options: ["with", "of", "about", "for"],
      answer: 0, // A. with
      explanation:
        'Cấu trúc "satisfied with" có nghĩa là hài lòng với cái gì/ai đó.',
    },
  ],
};

// ── State ──
let userAnswers = {};
let timerSeconds = EXAM_DATA.timeLimit;
let timerInterval = null;
let isGraded = false;

// ── Initialize ──
document.addEventListener("DOMContentLoaded", function () {
  renderQuestions();
  renderNavGrid();
  startTimer();
  updateProgress();

  // Submit button
  document
    .getElementById("examSubmitBtn")
    .addEventListener("click", handleSubmit);

  // Exit button
  document.getElementById("examExitBtn").addEventListener("click", function () {
    if (
      isGraded ||
      confirm("Bạn có chắc muốn thoát? Bài làm sẽ không được lưu.")
    ) {
      window.location.href = "index.html";
    }
  });
});

// ── Render Questions ──
function renderQuestions() {
  const container = document.getElementById("examQuestions");
  container.innerHTML = "";

  EXAM_DATA.questions.forEach(function (q, index) {
    const letters = ["A", "B", "C", "D"];
    const questionEl = document.createElement("div");
    questionEl.className = "exam-question";
    questionEl.id = "question-" + q.id;

    let optionsHTML = "";
    q.options.forEach(function (opt, optIdx) {
      optionsHTML += `
        <label class="exam-option" data-question="${q.id}" data-option="${optIdx}">
          <input type="radio" name="q${q.id}" value="${optIdx}" />
          <span class="exam-option__radio"></span>
          <span class="exam-option__letter">${letters[optIdx]}.</span>
          <span class="exam-option__text">${opt}</span>
        </label>`;
    });

    // Replace _____ with styled blank
    var displayText = q.text.replace(
      /_____/g,
      '<span class="exam-question__blank"></span>',
    );

    questionEl.innerHTML = `
      <div class="exam-question__header">
        <span class="exam-question__number">${q.id}</span>
        <p class="exam-question__text">${displayText}</p>
      </div>
      <span class="exam-question__result"></span>
      <div class="exam-options">${optionsHTML}</div>
      <div class="exam-question__explanation"></div>
    `;

    container.appendChild(questionEl);
  });

  // Bind option click events
  document.querySelectorAll(".exam-option").forEach(function (option) {
    option.addEventListener("click", function () {
      if (isGraded) return;

      var qId = parseInt(this.getAttribute("data-question"));
      var optIdx = parseInt(this.getAttribute("data-option"));

      // Select this option
      var siblings = document.querySelectorAll(
        '.exam-option[data-question="' + qId + '"]',
      );
      siblings.forEach(function (s) {
        s.classList.remove("selected");
      });
      this.classList.add("selected");
      this.querySelector('input[type="radio"]').checked = true;

      // Save answer
      userAnswers[qId] = optIdx;

      // Update nav grid
      updateNavItem(qId);
      updateProgress();
    });
  });
}

// ── Render Navigation Grid ──
function renderNavGrid() {
  var container = document.getElementById("examNavGrid");
  container.innerHTML = "";

  EXAM_DATA.questions.forEach(function (q) {
    var item = document.createElement("button");
    item.className = "exam-nav__item";
    item.id = "nav-" + q.id;
    item.textContent = q.id;
    item.addEventListener("click", function () {
      var target = document.getElementById("question-" + q.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlight briefly
        target.style.boxShadow = "0 0 0 3px rgba(76, 175, 132, 0.3)";
        setTimeout(function () {
          target.style.boxShadow = "";
        }, 1500);
      }
    });
    container.appendChild(item);
  });
}

// ── Update Nav Item ──
function updateNavItem(qId) {
  var navItem = document.getElementById("nav-" + qId);
  if (navItem && userAnswers[qId] !== undefined) {
    navItem.classList.add("answered");
  }
}

// ── Update Progress ──
function updateProgress() {
  var answered = Object.keys(userAnswers).length;
  var total = EXAM_DATA.questions.length;
  var btn = document.getElementById("examSubmitBtn");
  btn.textContent = "NỘP BÀI (" + answered + "/" + total + ")";
}

// ── Timer ──
function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(function () {
    timerSeconds--;
    updateTimerDisplay();

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      handleSubmit();
    }
  }, 1000);
}

function updateTimerDisplay() {
  var minutes = Math.floor(timerSeconds / 60);
  var seconds = timerSeconds % 60;
  var display =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  var timerEl = document.getElementById("examTimer");
  timerEl.textContent = display;

  // Warning states
  timerEl.classList.remove("warning", "danger");
  if (timerSeconds <= 120 && timerSeconds > 60) {
    timerEl.classList.add("warning");
  } else if (timerSeconds <= 60) {
    timerEl.classList.add("danger");
  }
}

// ── Submit & Grade ──
function handleSubmit() {
  if (isGraded) return;

  // Pause timer trước khi show popup
  clearInterval(timerInterval);

  var answeredCount = Object.keys(userAnswers).length;
  var totalCount = EXAM_DATA.questions.length;

  console.log("userAnswers:", userAnswers);
  console.log("EXAM_DATA.questions:", EXAM_DATA.questions);

  if (answeredCount < totalCount) {
    // Còn câu chưa trả lời → show custom confirm popup
    var unanswered = totalCount - answeredCount;
    showConfirmPopup(unanswered);
  } else {
    // Đã trả lời hết → chấm bài ngay
    executeGrading();
  }
}

// ── Custom Confirm Popup ──
function showConfirmPopup(unanswered) {
  var overlay = document.getElementById("examConfirmOverlay");
  var message = document.getElementById("examConfirmMessage");
  var btnCancel = document.getElementById("examConfirmCancel");
  var btnSubmit = document.getElementById("examConfirmSubmit");

  message.textContent =
    "Bạn còn " + unanswered + " câu chưa trả lời. Bạn có muốn nộp bài?";

  overlay.classList.add("active");

  // Clone & replace để xóa sạch event listeners cũ (tránh duplicate)
  var newBtnCancel = btnCancel.cloneNode(true);
  var newBtnSubmit = btnSubmit.cloneNode(true);
  btnCancel.parentNode.replaceChild(newBtnCancel, btnCancel);
  btnSubmit.parentNode.replaceChild(newBtnSubmit, btnSubmit);

  // "Tiếp tục làm bài" → đóng popup, resume timer
  newBtnCancel.addEventListener("click", function () {
    overlay.classList.remove("active");
    resumeTimer();
  });

  // "Nộp bài" → đóng popup, chấm bài
  newBtnSubmit.addEventListener("click", function () {
    overlay.classList.remove("active");
    executeGrading();
  });
}

// ── Resume Timer (sau khi user chọn "Tiếp tục làm bài") ──
function resumeTimer() {
  timerInterval = setInterval(function () {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      executeGrading(); // Hết giờ → chấm bài luôn
    }
  }, 1000);
}

// ── Execute Grading (tách riêng để dùng chung) ──
function executeGrading() {
  isGraded = true;

  // Stop timer animation immediately
  var timerEl = document.getElementById("examTimer");
  timerEl.classList.remove("warning", "danger");
  timerEl.style.animation = "none";

  // Lock body scroll to prevent jitter
  document.body.style.overflow = "hidden";

  var correctCount = 0;
  var incorrectCount = 0;
  var skippedCount = 0;

  // Grade all questions
  EXAM_DATA.questions.forEach(function (q) {
    var questionEl = document.getElementById("question-" + q.id);
    var navItem = document.getElementById("nav-" + q.id);
    var resultBadge = questionEl.querySelector(".exam-question__result");
    var explanationEl = questionEl.querySelector(".exam-question__explanation");

    if (userAnswers[q.id] === undefined) {
      // Skipped
      skippedCount++;
      questionEl.classList.add("incorrect");
      resultBadge.innerHTML = '<i class="fa-solid fa-minus"></i> Bỏ qua';
      navItem.classList.add("nav-incorrect");
    } else if (userAnswers[q.id] === q.answer) {
      // Correct
      correctCount++;
      questionEl.classList.add("correct");
      resultBadge.innerHTML = '<i class="fa-solid fa-check"></i> Đúng';
      navItem.classList.remove("answered");
      navItem.classList.add("nav-correct");
    } else {
      // Incorrect
      incorrectCount++;
      questionEl.classList.add("incorrect");
      resultBadge.innerHTML = '<i class="fa-solid fa-xmark"></i> Sai';
      navItem.classList.remove("answered");
      navItem.classList.add("nav-incorrect");

      // Mark wrong answer
      var wrongOption = questionEl.querySelector(
        '.exam-option[data-option="' + userAnswers[q.id] + '"]',
      );
      if (wrongOption) wrongOption.classList.add("wrong-answer");
    }

    // Highlight correct answer
    var correctOption = questionEl.querySelector(
      '.exam-option[data-option="' + q.answer + '"]',
    );
    if (correctOption) correctOption.classList.add("correct-answer");

    // Show explanation
    explanationEl.innerHTML = "<strong>Giải thích:</strong> " + q.explanation;
  });

  // Add graded class AFTER all DOM updates are done
  document.querySelector(".exam-page").classList.add("graded");

  // Show result modal after a short delay to let DOM settle
  setTimeout(function () {
    showResultModal(correctCount, incorrectCount, skippedCount);
  }, 100);
}

// ── Result Modal ──
function showResultModal(correct, incorrect, skipped) {
  var total = EXAM_DATA.questions.length;
  var percentage = Math.round((correct / total) * 100);
  var icon, title;

  if (percentage >= 80) {
    icon = '<i class="fa-solid fa-award" style="color: #fbbf24;"></i>';
    title = "Xuất sắc!";
  } else if (percentage >= 60) {
    icon = '<i class="fa-solid fa-thumbs-up" style="color: #3b82f6;"></i>';
    title = "Khá tốt!";
  } else if (percentage >= 40) {
    icon = '<i class="fa-solid fa-dumbbell" style="color: #f59e0b;"></i>';
    title = "Cần cố gắng thêm!";
  } else {
    icon = '<i class="fa-solid fa-book" style="color: #8b5cf6;"></i>';
    title = "Hãy ôn lại bài nhé!";
  }

  var overlay = document.getElementById("examResultOverlay");
  overlay.querySelector(".exam-result__icon").innerHTML = icon;
  overlay.querySelector(".exam-result__title").textContent = title;
  overlay.querySelector(".exam-result__score").textContent =
    correct + "/" + total;
  overlay.querySelector(".exam-result__detail").textContent =
    "Bạn đã trả lời đúng " +
    correct +
    " trên " +
    total +
    " câu (" +
    percentage +
    "%)";
  overlay.querySelector(".exam-result__stat-value.correct").textContent =
    correct;
  overlay.querySelector(".exam-result__stat-value.incorrect").textContent =
    incorrect;
  overlay.querySelector(".exam-result__stat-value.skipped").textContent =
    skipped;

  overlay.classList.add("active");

  // Review button — use { once: true } to prevent duplicate listeners
  overlay.querySelector(".exam-result__btn--review").addEventListener(
    "click",
    function () {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      // Scroll to top after closing modal
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    { once: true },
  );

  // Home button
  overlay.querySelector(".exam-result__btn--home").addEventListener(
    "click",
    function () {
      window.location.href = "index.html";
    },
    { once: true },
  );
}
