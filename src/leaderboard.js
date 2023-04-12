import Scores from './scores.js';

const scoreUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/S7kVdYcJIymZZTmBFEM0/scores/';

export default class Leaderboard {
  constructor(listElemnt) {
    this.scoreList = [];
    this.count = 0;
    this.listElemnt = listElemnt;
  }

  #addDom = (scoreElemnt) => {
    this.listElemnt.appendChild(scoreElemnt);
  }

  #clrDom = () => {
    this.listElemnt.innerHTML = '';
  }

  addInfo = async (user, score) => {
    try {
      const result = await fetch(scoreUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          score,
        }),
      });
      const data = result.json();
      this.refresh();
      return data.results;
    } catch (error) {
      return error;
    }
  }

  getInfo = async () => {
    try {
      const result = await fetch(scoreUrl);
      const data = await result.json();
      return data.results;
    } catch (error) {
      return error;
    }
  }

  #sort = (list) => {
    list.sort((a, b) => b.score - a.score);
  }

  refresh = async () => {
    const listData = await this.getInfo();
    this.#sort(listData);
    this.scoreList = [];
    this.count = 0;
    listData.forEach((entry) => {
      this.count += 1;
      this.scoreList.push(new Scores(entry.user, entry.score, this.count));
    });
    this.#clrDom();
    this.generate();
  }

  scoreToDOM = (entry) => {
    const li = document.createElement('li');
    li.classList = 'list-group-item d-flex justify-content-between align-items-start';
    li.id = `score-${entry.position}`;
    li.innerHTML = `
      <span class="col-2">${entry.position}</span>
      <div class="col-8">
        <h4>${entry.user}</h4>
      </div>
      <span class="col-2 badge bg-secondary">${entry.score}</span>`;
    return li;
  }

  generate = () => {
    for (let i = 0; i < this.scoreList.length && i < 10; i += 1) {
      this.#addDom(this.scoreToDOM(this.scoreList[i]));
    }
  }
}