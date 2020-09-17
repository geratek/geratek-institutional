// Modals

const rootEl = document.documentElement
const $modals = document.querySelectorAll('.modal')
const $modalButtons = document.querySelectorAll('.modal-activator')
const $modalCloses = document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button')

$modalButtons.forEach($el => {
  $el.addEventListener('click', () => {
    const target = $el.dataset.target
    openModal(target)
  })
})

$modalCloses.forEach($el => {
  $el.addEventListener('click', () => {
    closeModals()
  })
})

function openModal(target) {
  const $target = document.getElementById(target)
  rootEl.classList.add('is-clipped')
  $target.classList.add('is-active')
}

function closeModals() {
  rootEl.classList.remove('is-clipped')
  $modals.forEach($el => {
    $el.classList.remove('is-active')
  })
}

document.addEventListener('keydown', event => {
  var e = event || window.event
  if (e.keyCode === 27) {
    closeModals()
  }
})