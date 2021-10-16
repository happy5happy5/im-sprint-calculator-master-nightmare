const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

// calculate함수에 들어가는 input은 '3'7'display=['3714','/','433'] 이렇게 저장되어있음


function operatorNum(display, opr) {
  //
  counting = new Array()
  for (var i = 0; i < display.length; i++) {
    if (display[i] === opr) counting.push(i + 1);
  }
  return counting.length
}

function operatorAtEnd(display) { //1또는 0 반환
  judgment = new Array()
  judgment[0] = display.lastIndexOf('+');
  judgment[1] = display.lastIndexOf('-');
  judgment[2] = display.lastIndexOf('*');
  judgment[3] = display.lastIndexOf('/');
  //judgment.indexOf(display.length - 1)
  //기호 계속 추가하면된다 .push보다 보기좋음
  //for문쓸꺼면 isNaN을 쓰면 더 깔끔하게 된다. 
  //근데 싫다 이게 더 예쁨
  //indexOf의 반환하는값이 -1은 없는거임
  if (judgment.indexOf(display.length - 1) < 0) {
    // console.log('operator가 마지막 아니다')
    return false;
  } else if (judgment.indexOf(display.length - 1) >= 0) {
    // console.log('operator가 마지막 이다')
    return true;
  } else console.log('error');
}

function Number_split_Operator(display) {
  display_new = new Array();
  var NumContainer = '';
  for (i = 0, j = 0; i < display.length; i++) { //조건문을 display[i]!==undefined로 해도됨. 근데 위험함 비추.
    if (isNaN(display[i]) === false || display[i] === '.'||i===0) {
      //i번째 문자가 숫자 and for문 돌아가면서 10단위 넘어가는 모든 숫자를 같이 저장, i===0은 첫문자는 연산자가 아니라 부호라서 숫자로 침
      NumContainer = NumContainer + display[i];
      display_new[j] = NumContainer;
    } else if (isNaN(display[i]) === true && display[i] !== '.') {
      //i번째 문자가 연산자
      ++j;
      display_new[j] = display[i];
      NumContainer = '';
      ++j;
    } else console.log('error');
      
  }

  return display_new;
}

function calculate(display) {
  //0. 먼저 곱하기 나누기 더하기 빼기가 있는지 어딧는지부터.
  //1. 나누기>곱하기>더하기>빼기 순으로 계산
  //2. 결과값을 display에 다시 저장
  //3. 다시 저장한 display를 for문으로 돌려도 같은 계산이 순차적으로 되도록 index구분해서 빈칸없이 저장하기
  limit = //총 연산자 갯수
    operatorNum(display, '*') +
    operatorNum(display, '/') +
    operatorNum(display, '+') +
    operatorNum(display, '-');

  for (i = 0; i < limit; i++) {
    //if문을 하나만 써서 사칙연산 규칙 넣음
    if (display.indexOf('/') !== -1) {
      opr = '/';
      sta = display.indexOf(opr) - 1;
      end = display.indexOf(opr) + 1;
      ans = Number(display[sta]) / Number(display[end])
      del = display.splice(sta, end+1, ans);
      display[sta] = display[sta].toString()
    } else if (display.indexOf('*') !== -1) {
      opr = '*';
      sta = display.indexOf(opr) - 1;
      end = display.indexOf(opr) + 1;
      ans = Number(display[sta]) * Number(display[end])
      del = display.splice(sta, end+1, ans);
      display[sta] = display[sta].toString()
    } else if (display.indexOf('+') !== -1) {
      opr = '+';
      sta = display.indexOf(opr) - 1;
      end = display.indexOf(opr) + 1;
      ans = Number(display[sta]) + Number(display[end])
      del = display.splice(sta, end+1, ans);
      display[sta] = display[sta].toString()
    } else if (display.indexOf('-') !== -1) {
      opr = '-';
      sta = display.indexOf(opr) - 1;
      end = display.indexOf(opr) + 1;
      ans = Number(display[sta]) - Number(display[end])
      del = display.splice(sta, end+1, ans);
      display[sta] = display[sta].toString()
    } else console.log('nothing to calculate');

  }
  return display;
}


// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.
  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.
  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
  if (target.matches('button')) {
    //document.querySelector('.calculator__display--for-advanced').textContent
    //operatorAtEnd(display)
    //operatorNum(display)
    //display.textContent = buttonContent;
    if (action === 'number') {
      if (display.textContent === '0') {
        display.textContent = buttonContent;
      } else if (display.textContent !== '0') {
        display.textContent = display.textContent + buttonContent;
      } else concole.log('error');
    }

    if (action === 'operator') { //연속 연산자 입력시 마지막꺼만
      if (operatorAtEnd(display.textContent) === true) {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1) + buttonContent;

      } else if (operatorAtEnd(display.textContent) === false) {
        if (display.textContent === '0' && buttonContent === '+') {
          display.textContent = buttonContent;
        } else if (display.textContent === '0' && buttonContent === '-') {
          display.textContent = buttonContent;
        } else if (display.textContent === '0' && buttonContent === '*') {
          display.textContent = display.textContent;
        } else if (display.textContent === '0' && buttonContent === '/') {
          display.textContent = display.textContent;
        } else {
          display.textContent = display.textContent + buttonContent;
        }

      } else console.log('error');
    }
    if (action === 'decimal') {
      if (display.textContent.lastIndexOf('.') !== display.textContent.length - 1) {
        display.textContent = display.textContent + buttonContent;

      } else if ((display.textContent.lastIndexOf('.') === display.textContent.length - 1)) {
        display.textContent = display.textContent;

      }
    }
    if (action === 'clear') {
      display.textContent = '0';
    }
    if (action === 'backspace') {
      display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    }
    if (action === 'calculate') {
      ///display.textContent='13+3*6' 계산하면 36이 아니라 21이 나와야함.
      if (operatorAtEnd(display.textContent) === true) {
        //마지막수가 연산자면 계산 실행 안함


      } else if (operatorAtEnd(display.textContent) === false) {
        result = Number_split_Operator(display.textContent); //['13+3*6']을 ['13','+','3','*','6']으로 변경
        display.textContent = Number(calculate(result));
      }

    }
  }


});


