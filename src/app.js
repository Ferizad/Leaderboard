export const userReg = /^[a-zA-Z0-9]{0,30}$/;
export const scoreReg = /^[1-9][0-9]{0,2}$/;

const loadOn = (btn, load) => {
  load.classList.add('spinner-border');
  btn.disabled = true;
};

const loadOff = (btn, load) => {
  load.classList.remove('spinner-border');
  btn.disabled = false;
};

const valid = (inputFild) => {
  inputFild.classList.remove('not-valid');
  inputFild.classList.add('valid');
};

const notvalid = (inputFild) => {
  inputFild.classList.remove('valid');
  inputFild.classList.add('not-valid');
};

const validator = (inputFild, regex, response = false) => {
  let answer;
  if (regex.test(inputFild.value)) {
    valid(inputFild);
    answer = true;
  } else {
    notvalid(inputFild);
    answer = false;
  }
  if (response) {
    return answer;
  }
  return response;
};

export const inputCheck = (inputFild, regex) => {
  inputFild.addEventListener('change', () => {
    validator(inputFild, regex);
  });
};

export const getScore = async (btn, load, callbck) => {
  btn.addEventListener('click', async () => {
    loadOn(btn, load);
    await callbck().catch((error) => error);
    loadOff(btn, load);
  });
};

export const postScore = async (btn, userInfo, scoreInfo, load, callbck) => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (validator(userInfo, userReg, true) && validator(scoreInfo, scoreReg, true)) {
      loadOn(btn, load);
      await callbck(userInfo.value, scoreInfo.value).then(() => {
        userInfo.value = '';
        scoreInfo.value = '';
      }).catch((error) => error);
      loadOff(btn, load);
    }
  });
};