const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const MAX_HIGH_SCORES = 10;
let highScores = JSON.parse(localStorage.getItem('highscores')) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
    e.preventDefault();
    const score = mostRecentScore;
    const username = document.getElementById("username").value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    const newScore = {
      score,
      name: username
    };
  
    highScores.push(newScore);
  
    highScores.sort((a, b) => b.score - a.score);
  
    highScores.splice(10);
  
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    window.location.assign("/");
  }
  