const lint = document.querySelectorAll('.linter');

function changeName(e) {
  if (window.event.target.classList.value === 'linter') {
    if (e.target.textContent === lint[0].textContent) {
      e.target.innerHTML = 'eslint is working';
    } else {
      e.target.innerHTML = 'csslint is working';
    }
  }
}
document.addEventListener('click', changeName);
