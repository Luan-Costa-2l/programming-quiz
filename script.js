let currentQuestion = 0;
let correctAnswers = 0;
let pct = 0;

const optionClickEvent = (e) => {
    document.querySelector('.options').innerHTML = '';
    pct = (currentQuestion * 100) / questions.length;

    let op = e.target.getAttribute('data-op');
    if (parseInt(op) == questions[currentQuestion].answer) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

const showQuestion = () => {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        document.querySelector('.question').innerHTML = q.question;
        // a baixo eu salvei as manipulações em uma variável e só depois mandei pro html para poupar tempo e processamento.
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><div class='number'>${+i + 1}</div>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        document.querySelector('.questionArea').style.display = 'none';
        document.querySelector('.scoreArea').style.display = 'block';
        pct = 100;
        finishQuiz(correctAnswers);
    }

    document.querySelector('.progress--bar').style.width = `${pct}%`;

}

const finishQuiz = (correctAnswers) => {
    let result = '';
    let color = '';
    let points = Math.floor((correctAnswers * 100) / questions.length);
    if (points < 30) {
        result = 'Tá ruim em!';
        color = '#F00';
    } else if (points < 70) {
        result = 'Pode melhorar!';
        color = '#FF0';
    } else if (points >= 70) {
        result = 'Parabéns';
        color = '#0D630D';
    }

    document.querySelector('.scoreText1').innerHTML = result;
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scorePct').style.color = color;

    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;
}

const resetQuiz = () => {
    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'block';
    currentQuestion = 0;
    correctAnswers = 0;
    pct = 0;
    showQuestion();
}

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetQuiz);