import './index.css';

function showWeb(message: string) {
  alert(message);
}

document.body.addEventListener('click', () => {
  showWeb('WEB!');
});
