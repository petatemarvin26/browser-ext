import './index.css';

function showPopup(message: string) {
  alert(message);
}

document.body.addEventListener('click', () => {
  showPopup('POPUP!');
});
