const newQuestionBtn = document.getElementById("new-question");
const questionContainer = document.querySelector(".question-container");
const leftPanelBottom = document.querySelector(".left-panel-bottom");
const responseContainer = document.querySelector(".response-container");
const questionSubmitHandler = document.querySelector(".question-form");
const responseForm = document.querySelector(".right-panel-response-form");
const searchQuestion = document.getElementById("search-question");
const resolveBtn = document.getElementById("resolveBtn");
const starIcon = document.querySelector(".star-icon");


var storageData = JSON.parse(localStorage.getItem("data")) || [];
previousQuestions(storageData);

let currentQuestionData = null;
let isStarClciked = false;

starIcon.addEventListener("click", () => {
  isStarClciked = !isStarClciked;
  starIcon.src = isStarClciked ? "https://img.icons8.com/color/32/star--v1.png" : "https://img.icons8.com/windows/32/star--v1.png";
  let count = 0;
  storageData.forEach((data) => {
    const li = document.querySelector(`.left-panel-bottom li[data-id="${data.id}"]`);
    if (isStarClciked) {
      if (!data.isStar) {
        li.style.display = "none";
      }
      else {
        count++;
      }
    }
    else {
      li.style.display = "flex";
    }
  })

  if (!count) {
    const zeroStars = document.querySelector(".zeroStars");
    if (isStarClciked) {
      zeroStars.style.display = "block"
    } else {
      zeroStars.style.display = "none"
      
    }
  }
});

questionSubmitHandler.addEventListener("submit", (e) => {
  e.preventDefault();

  const subjectElement = document.getElementById("newSubject");
  const questionElement = document.getElementById("newQuestion");

  const data = {
    id: Date.now(),
    subject: subjectElement.value,
    question: questionElement.value,
    responses: {},
    isStar: false,
    timestamp: Date.now()
  };

  if (data.subject === "" || data.question === "") {
    alert("Please enter subject and question");
    return;
  }

  storageData.push(data);
  localStorage.setItem("data", JSON.stringify(storageData));

  AddQuestion(data);
  subjectElement.value = "";
  questionElement.value = "";
});

responseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currentQuestionData) return;

  const nameElement = document.getElementById("name");
  const commentElement = document.getElementById("comment");

  const response = {
    name: nameElement.value,
    comment: commentElement.value,
    upvotes: 0,
    downvotes: 0
  };

  if (response.name !== "" && response.comment !== "") {
    if (currentQuestionData.responses[response.name]) {
      currentQuestionData.responses[response.name].push(response);
    } else {
      currentQuestionData.responses[response.name] = [response];
    }

    localStorage.setItem("data", JSON.stringify(storageData));

    nameElement.value = "";
    commentElement.value = "";
    previousResponses(currentQuestionData);
  } else {
    alert("Please enter name and comment");
  }
});

let debounceTimer;
searchQuestion.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  if (searchQuestion.value.trim() === "") {
    leftPanelBottom.innerHTML = "";
    previousQuestions(storageData);
    return;
  }

  debounceTimer = setTimeout(() => {
    const allList = document.querySelectorAll(".leftPanellist");
    const query = searchQuestion.value.toLowerCase();

    allList.forEach((list) => {
      const h1 = list.querySelector(".subject");
      const p = list.querySelector(".question");

      const subjectText = h1.textContent.toLowerCase();
      const questionText = p.textContent.toLowerCase();
      const isMatch = subjectText.includes(query) || questionText.includes(query);

      if (isMatch) {
        h1.innerHTML = highlightText(subjectText, query);
        p.innerHTML = highlightText(questionText, query);
      }
      list.style.display = isMatch ? "block" : "none";
    });
  }, 300);
});


resolveBtn.addEventListener("click", () => {
  if (!currentQuestionData) return;

  const questionId = currentQuestionData.id;
  const questionToRemove = document.querySelector(`.left-panel-bottom li[data-id="${questionId}"]`);

  const updatedData = storageData.filter((data) => data.id !== questionId);
  localStorage.setItem("data", JSON.stringify(updatedData));
  storageData = updatedData;

  questionToRemove.remove();
  currentQuestionData = null;
  responseContainer.style.display = "none";
  questionContainer.style.display = "block";
});

newQuestionBtn.addEventListener("click", togglequestionContainer);

function togglequestionContainer() {
  responseContainer.style.display = "none";
  questionContainer.style.display = "block";
}

function AddQuestion(data) {
  const li = document.createElement("li");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");

  const img = document.createElement("img");
  img.src = data.isStar ? "https://img.icons8.com/fluency/32/star--v1.png" : "https://img.icons8.com/windows/32/star--v1.png";

  img.alt = "star--v1";

  const time = document.createElement("p");

  li.classList.add("leftPanellist")
  div2.classList.add("star-time");
  h1.classList.add("subject");
  p.classList.add("question");
  time.classList.add("left-panel-postedAgo")
  h1.textContent = data.subject;
  p.textContent = data.question;

  div1.appendChild(h1);
  div1.appendChild(p);
  div2.appendChild(img);
  div2.appendChild(time);

  li.appendChild(div1);
  li.appendChild(div2);
  li.dataset.id = data.id;
  time.dataset.timestamp = data.timestamp;

  img.addEventListener("click", (e) => {
    e.stopPropagation();
    data.isStar = !data.isStar;
    localStorage.setItem("data", JSON.stringify(storageData));
    img.src = data.isStar ? "https://img.icons8.com/fluency/32/star--v1.png" : "https://img.icons8.com/windows/32/star--v1.png";
  })

  li.addEventListener("click", () => {
    if (currentQuestionData && data.id === currentQuestionData.id) {
      return;
    }

    questionContainer.style.display = "none";
    responseContainer.style.display = "block";

    const current_subject = document.querySelector(".view-subject");
    const current_question = document.querySelector(".view-curr-question");

    current_subject.textContent = data.subject;
    current_question.textContent = data.question;

    currentQuestionData = data;
    previousResponses(data);
  });

  leftPanelBottom.appendChild(li);
}

function previousQuestions(data) {
  leftPanelBottom.innerHTML = "";
  data.forEach((data) => {
    AddQuestion(data);
  });
}

function previousResponses(data) {
  const responses = document.querySelector(".view-responses");
  responses.innerHTML = "";
  const commentElements = new Map();

  const rearrangeComments = () => {
    const sortedComments = Array.from(commentElements.entries())
      .sort((a, b) =>
        (b[0].upvotes - b[0].downvotes) - (a[0].upvotes - a[0].downvotes)
      );
    console.log(sortedComments)
    sortedComments.forEach(([_, commentData]) => {
      responses.appendChild(commentData.element);
    });
  };

  Object.keys(data.responses).forEach((name) => {
    const comments = data.responses[name];

    comments.forEach((comment, index) => {
      if (typeof comment === "string") {
        comments[index] = { comment, upvotes: 0, downvotes: 0 };
      }

      const commentObj = comments[index];

      const li = document.createElement("li");
      const h1 = document.createElement("h1");
      const p = document.createElement("p");

      const voteContainer = document.createElement("div");
      const upvoteBtn = document.createElement("button");
      const downvoteBtn = document.createElement("button");
      const upvoteCount = document.createElement("span");
      const downvoteCount = document.createElement("span");

      voteContainer.classList.add("vote-container");
      upvoteBtn.classList.add("upvote-btn");
      downvoteBtn.classList.add("downvote-btn");
      upvoteCount.classList.add("vote-count");
      downvoteCount.classList.add("vote-count");

      h1.textContent = name;
      p.textContent = commentObj.comment;
      upvoteBtn.textContent = `↑ ${commentObj.upvotes}`;

      downvoteBtn.textContent = `↓ ${commentObj.downvotes}`;

      upvoteBtn.addEventListener("click", () => {
        commentObj.upvotes++;
        upvoteBtn.textContent = `↑ ${commentObj.upvotes}`;
        localStorage.setItem("data", JSON.stringify(storageData));
        rearrangeComments();
      });

      downvoteBtn.addEventListener("click", () => {
        commentObj.downvotes++;
        downvoteBtn.textContent = `↓ ${commentObj.downvotes}`;
        localStorage.setItem("data", JSON.stringify(storageData));
        rearrangeComments();
      });

      voteContainer.appendChild(upvoteBtn);
      voteContainer.appendChild(upvoteCount);
      voteContainer.appendChild(downvoteBtn);
      voteContainer.appendChild(downvoteCount);

      li.appendChild(h1);
      li.appendChild(p);
      li.appendChild(voteContainer);
      responses.appendChild(li);

      commentElements.set(comment, {
        element: li,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
      });

      rearrangeComments();
    });
  });
}

function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function getDifference(timestamp, now) {
  const diff = (now - timestamp) / 1000;

  let value = 0;
  let unit = "seconds";

  if (diff < 60) {
    value = Math.floor(diff / 1);
  } else if (diff < 3600) {
    value = Math.floor(diff / 60);
    unit = "minutes";
  } else if (diff < 86400) {
    value = Math.floor(diff / 3600);
    unit = "hours";
  }
  return `${value} ${unit} ago`;
}

setInterval(() => {
  const timestampElements = document.querySelectorAll(".left-panel-postedAgo");
  const now = Date.now();

  timestampElements.forEach((element) => {
    const timestamp = Number(element.dataset.timestamp);
    element.textContent = getDifference(timestamp, now);
  });
}, 1000);
