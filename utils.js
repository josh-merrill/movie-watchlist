
function showModal(data) {
  const filmModal = document.getElementById('film-modal')
  const headerEl = document.querySelector('header')
  const mainEl = document.querySelector('main')
  const bodyEl = document.querySelector('body')
  const filmModalHtml = `
      <div class="film-modal">
      <div class="close-modal-btn-container">
          <button class="modal-close-btn" id="modal-close-btn">X</button>
      </div>
          <img src="${data.Poster}" class="film-poster" />
          <h3>${data.Title} was added to your watchlist</h3>
      </div>
  `

  filmModal.innerHTML = filmModalHtml
  filmModal.style.display = 'flex'
  headerEl.style.opacity = "0.4"
  mainEl.style.opacity = "0.4"
  bodyEl.style.overflow = 'hidden'

  // Add event listener to close button
  const closeBtn = document.getElementById('modal-close-btn')
  closeBtn.addEventListener('click', () => {
      filmModal.style.display = 'none'
      headerEl.style.opacity = "1"
      mainEl.style.opacity = "1"
      bodyEl.style.overflow = 'auto'
  })
}

export default showModal
