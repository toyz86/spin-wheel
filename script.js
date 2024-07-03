document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('spinButton').addEventListener('click', spinWheel);

let currentRotation = 0;
const pieces = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5", "Text 6"];
let slowSpinInterval;
let countdownInterval;

function startGame() {
  document.getElementById('startButton').disabled = true;
  document.getElementById('spinButton').disabled = false;
  document.getElementById('countdown').textContent = 10;
  document.getElementById('countdown').classList.remove('five');
  document.getElementById('message').textContent = '';

  let countdown = 10;
  countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById('countdown').textContent = countdown;
    if (countdown === 5) {
      document.getElementById('countdown').classList.add('five');
    } else {
      document.getElementById('countdown').classList.remove('five');
    }

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      document.getElementById('startButton').disabled = false;
      clearInterval(slowSpinInterval);
    }
  }, 1000);

  // Start slow spinning
  slowSpin();
}

function slowSpin() {
  slowSpinInterval = setInterval(() => {
    currentRotation += 1;
    document.querySelector('.pieces-wrapper').style.transition = 'transform 0.05s linear';
    document.querySelector('.pieces-wrapper').style.transform = `rotate(${currentRotation}deg)`;
  }, 5);
}

function spinWheel() {
  const countdown = parseInt(document.getElementById('countdown').textContent);
  console.log(`Current count: ${countdown}`); 
  if (countdown === 5) {
    normalSpin();
  } else if (countdown < 5) {
    document.getElementById('message').textContent = 'Too slow';
  } else if (countdown > 5) {
    document.getElementById('message').textContent = 'Too fast';
  }
}

function normalSpin() {
  clearInterval(slowSpinInterval);
  document.querySelector('.pieces-wrapper').style.transition = 'none';
  const pinwheel = document.querySelector('.pieces-wrapper');
  const rotations = Math.floor(Math.random() * 5) + 3;
  const stopPiece = Math.floor(Math.random() * 6);
  const degreesPerPiece = 60;
  const randomOffset = Math.random() * degreesPerPiece;
  const stopDegrees = stopPiece * degreesPerPiece + randomOffset;
  const totalDegrees = rotations * 360 + stopDegrees;

  const targetRotation = currentRotation + totalDegrees;

  pinwheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
  pinwheel.style.transform = `rotate(${targetRotation}deg)`;

  document.getElementById('spinButton').disabled = true;

  setTimeout(() => {
    const finalRotation = targetRotation % 360;
    const finalPieceIndex = Math.floor((360 - finalRotation + degreesPerPiece / 2) % 360 / degreesPerPiece) % 6;

    alert(`The needle stopped at: ${pieces[finalPieceIndex]}`);

    pinwheel.style.transition = 'none';
    pinwheel.style.transform = `rotate(${finalRotation}deg)`;

    currentRotation = finalRotation;
  }, 4000);
}
