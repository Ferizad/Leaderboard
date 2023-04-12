import './style.scss';
import {
  getScore, postScore, inputCheck, userReg, scoreReg,
} from './app.js';
import Leaderboard from './leaderboard.js';

const getScoreBtn = document.getElementById('get-scores');
const postScoreBtn = document.getElementById('post-scores');
const loadingScore = document.getElementById('get-scores-load');
const postingScore = document.getElementById('post-scores-load');
const table = document.getElementById('leaderboard-entries');
const newPlayer = document.getElementById('new-user');
const newScore = document.getElementById('new-score');

inputCheck(newPlayer, userReg);
inputCheck(newScore, scoreReg);

const data = new Leaderboard(table);

data.refresh();
getScore(getScoreBtn, loadingScore, data.refresh);
postScore(postScoreBtn, newPlayer, newScore, postingScore, data.addInfo);