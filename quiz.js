// обьявляем переменные для вариантов ответа
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
// Создаем переменную, содержащую в себе все опции
const allOption = document.querySelectorAll(".option");

// переменные с НОМЕРОМ ВОПРОСА
const questionsNumber = document.querySelector(".questions-number");
// текущий по счету вопрос
const numberOfQuestion = document.getElementById("number-of-question");
// общее кол-во вопросов
const totalQuestionNumber = document.getElementById("total-question-number");

// переменная текущего вопроса
const question = document.getElementById("question");

// индексы текущего вопроса и страницы
let indexOfQuestion;
let indexOfPage = 0;

// Переменная для отслеживания ответов
const answerTracker = document.getElementById("answer-tracker");

// Переменная кнопки перехода к следующему вопросу
const btnNext = document.getElementById("move-foward");

// Переменная с итоговым результатом
let score = 0;
// Переменная с количестовом правидьных ответов
let correctAnswer = document.getElementById("correct-answer");
// Переменная с общим числом вопросов
let totalNumber = document.getElementById("total-number");
// Переменная для кнопки повтора
let tryAagain = document.querySelector(".try-again");

//Создаем массив обьектов в которых будут хранится вопросы,
// варианты ответа на них и правильный вариант ответа
// один массив - один вопрос
const questions = [
  {
    question: "Текст вопроса1",
    options: [
      "Вариант ответа2",
      "Вариант ответа22",
      "Вариант ответа222",
      "Вариант ответа2222",
    ],
    rightAnswer: 1,
  },
  {
    question: "Текст вопроса2",
    options: [
      "Вариант ответа1",
      "Вариант ответа1",
      "Вариант ответа3",
      "Вариант ответа1",
    ],
    rightAnswer: 1,
  },
  {
    question: "Текст вопроса3",
    options: [
      "Вариант ответа5",
      "Вариант ответа4",
      "Вариант ответа3",
      "Вариант ответа2",
    ],
    rightAnswer: 1,
  },
  {
    question: "Текст вопроса4",
    options: [
      "Вариант ответа1",
      "Вариант ответа2",
      "Вариант ответа3",
      "Вариант ответа4",
    ],
    rightAnswer: 1,
  },
];

//------------------------------------------------------------------------ЛОГИКА-------------------------------------------------------------
// Выводим общее количество вопросов
totalQuestionNumber.innerHTML = questions.length; //общее количество вопросов равно длине массива с вопросами
// Зполнение области с вопросами
// проходим по массиву и обращаясь к определенному свойству, вставляем значение этого свойства
// в подготовленную область в html

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // отображаем в переменной question
  // значение свойства question обьекта под индексом indexOfQuestion из массива обьектов questions
  option1.innerHTML = questions[indexOfQuestion].options[0]; // отображаем в переменной option1
  //значение свойства options[0], объкта обьекта под индексом indexOfQuestion из массива обектов questions
  option2.innerHTML = questions[indexOfQuestion].options[1]; // отображаем в переменной option2
  //значение свойства options[1], объкта обьекта под индексом indexOfQuestion из массива обектов questions
  option3.innerHTML = questions[indexOfQuestion].options[2]; // отображаем в переменной option3
  //значение свойства options[2], объкта обьекта под индексом indexOfQuestion из массива обектов questions
  option4.innerHTML = questions[indexOfQuestion].options[3]; // отображаем в переменной option4
  //значение свойства options[3], объкта обьекта под индексом indexOfQuestion из массива обектов questions
  numberOfQuestion.innerHTML = indexOfPage + 1; // номер текущей страницы
  indexOfPage++; // Увеличиваем значение на 1 при переходе кследующему вопросу
};

// функция для определения значения в переменной indexOfQuestion
// В переменную completedAnswers поместим indexOfQuestion тех вопросов, которые уже отображались в этой попытке
let completedAnswers = [];
// в функции randomQuestion с помощь. методов Math генерируем рандомный indexOfQuestion,
// чтобы последовательность вопросов неповторялась в разных попытках
const randomQuestion = () => {
  let number = Math.floor(Math.random() * questions.length);
  //Убираем вероятность повтора вопроса в  попытке ( по умолчанию считаем, что такой вероятности нет)
  let Dublicate = false;
  // Если мы находимся напоследней странице с вопросом, то запускаем overQuiz()
  if (indexOfPage == questions.length) {
    overQuiz();
  }
  //   иначе если значение completedAnswers более нуля, то нужно проверить чтобы сгенерированный
  //   рандомно indexOfQuestion не был похож на те, что уже есть в completedAnswers
  else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == number) {
          Dublicate = true;
        }
      });
      //   если сгенерированный рандомно d переменной numberindexOfQuestion похож на те,
      //  что уже есть в completedAnswers  то гененрируем по новой
      if (Dublicate) {
        randomQuestion();
      }
      // Иначе добавляем сгененрированное значение в переменную indexOfQuestion и запускаем load()
      else {
        indexOfQuestion = number;
        load();
      }
    }
    // Если completedAnswers пуст, то просто передаем indexOfQuestion = number и запускаем load
    if (completedAnswers == 0) {
      indexOfQuestion = number;
      load();
    }
  }
  //   по заверщению randomQuestion значение присвоенное indexOfQuestion попадет в массив completedAnswers
  completedAnswers.push[indexOfQuestion];
};

// задаем переменную в которую будем передавать слушатель клика по одному из вариантов ответа
const check = (el) => {
  // если ответ верный
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    // добавляем класс со стилем для правильного ответа
    el.target.classList.add("correct");
    // увеличиваем значение общего счета
    score++;
  } else {
    // иначе вешаем стиль для неправильного ответа
    el.target.classList.add("wrong");
  }
  // вызываем опцию, которая вешает стиль на весь блок, в котором находится список, чтобы
  // не было возморжности кликнуть на варианты иные, кроме того,
  //  на который кликнули в первый раз
  disable();
};
const disable = () => {
  allOption.forEach((item) => {
    item.classList.add("disable");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};
// при клике на кнопку для перехода к следующему вопросу
// нам нужно убрать стили с правильного ответа, а то они остануться и смысла в вопросе не будет
const removeOptionStyles = () => {
  allOption.forEach((item) => {
    item.classList.remove("wrong", "correct", "disable");
  });
};
// заполнение трекающих элементов в зависимости от ответа
const Tracker = () => {
  questions.forEach(() => {
    // создаем количество областей равное кол-ву вопросов в тесте
    const div = document.createElement("div");

    // передаем эти области в заготовленный в верстке блок
    answerTracker.appendChild(div);
  });
};
// импользуя for() пройдёмся по массиву allOption
// и узнаем на какой из его элементов кликнул пользователь
for (option of allOption) {
  option.addEventListener("click", (e) => check(e));
  // используя data-id определяем на правельный ли вариант ответа кликнул пользователь
}

// по окончаню попытки попадаем на окно с результатом
function overQuiz() {
  console.log("выводим окно с результатом ");
}

// Вешаем на глоб.обьект соушатель, чтобы запускать функции когда страница загружена
window.addEventListener("load", () => {
  randomQuestion();
  Tracker();
});
