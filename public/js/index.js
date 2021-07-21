var a_click = new Audio('/audio/click.mp3')
document.querySelectorAll('.window').forEach((element) => {
  element.addEventListener('mousedown', () => {
    if (active_window !== element.getAttribute('data-id')) {
      let id = element.getAttribute('data-id')
      changeWindow(id)
    }
  })
})
document.querySelectorAll('.tab').forEach((element) => {
  element.addEventListener('click', () => {
    if (active_window !== element.getAttribute('data-id')) {
      click()
      let id = element.getAttribute('data-id')
      changeWindow(id)
    }
  })
})

document.querySelectorAll('.close').forEach((element) => {
  element.addEventListener('click', () => {
    click()
    let id = element.getAttribute('data-id')
    removeWindow(id)
  })
})

function changeWindow(id) {
  document.querySelector(`.window[data-id="${id}"]`).classList.add('active')
  document.querySelector(`.tab[data-id="${id}"]`).classList.add('active')

  if (active_window){
    if (document.querySelector(`.window[data-id="${active_window}"]`)){
      document.querySelector(`.window[data-id="${active_window}"]`).classList.remove('active')
      document.querySelector(`.tab[data-id="${active_window}"]`).classList.remove('active')
    }
  }
  active_window = id
}
function removeWindow(id) {
  document.querySelector(`.window[data-id="${id}"]`).remove()
  document.querySelector(`.tab[data-id="${id}"]`).remove()
  
  const index = open_windows.indexOf(id)
  if (index > -1) {
    open_windows.splice(index, 1)
  }
}

function click() {
  a_click.play()
}