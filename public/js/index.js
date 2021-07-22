var a_click = new Audio('/audio/click.mp3')
function click() {
  a_click.play()
}
var current_offset = [120,20]

init()

function init() {
  $('.draggable').draggable()
  $('.resizable').resizable({
    helper: "ui-resizable-helper",
    minWidth: 500
  })
  
  document.querySelectorAll('.window').forEach((element) => {
    element.addEventListener('mousedown', windowMove, true)
  })
  document.querySelectorAll('.tab').forEach((element) => {
    element.addEventListener('click', tabClick, true)
  })
  document.querySelectorAll('.close').forEach((element) => {
    element.addEventListener('click', windowClose, true)
  })
  document.querySelectorAll('.application.challenge').forEach((element) => {
    element.addEventListener('dblclick', challengeWindow, true)
  })
  document.querySelectorAll('.application.desktop').forEach((element) => {
    element.addEventListener('dblclick', desktopApplication, true)
  })
}
function clean() {
  document.querySelectorAll('.window').forEach((element) => {
    element.removeEventListener('mousedown', windowMove, true)
  })
  document.querySelectorAll('.tab').forEach((element) => {
    element.removeEventListener('click', tabClick, true)
  })
  document.querySelectorAll('.close').forEach((element) => {
    element.removeEventListener('click', windowClose, true)
  })
  document.querySelectorAll('.application.challenge').forEach((element) => {
    element.removeEventListener('dblclick', challengeWindow, true)
  })
  document.querySelectorAll('.application.desktop').forEach((element) => {
    element.removeEventListener('dblclick', desktopApplication, true)
  })
}

//Handlers
function windowMove(event) {
  let element = event.currentTarget
  if (active_window !== element.getAttribute('data-id')) {
    let id = element.getAttribute('data-id')
    changeWindow(id)
  }
}
function windowClose(event) {
  let element = event.currentTarget
  click()
  let id = element.getAttribute('data-id')
  closeWindow(id)
}
function challengeWindow(event) {
  element = event.currentTarget
  click()
  if (open_windows.includes(`${element.getAttribute('data-id')}`)) {
    changeWindow(`${element.getAttribute('data-id')}`)
  } else {
    createWindow(element, 'challenge', element.getAttribute('data-id'))
  }
}
function tabClick(event) {
  let element = event.currentTarget
  if (active_window !== element.getAttribute('data-id')) {
    click()
    let id = element.getAttribute('data-id')
    changeWindow(id)
  }
}
function desktopApplication(event) {
  let element = event.currentTarget
  if (active_window !== element.getAttribute('data-id')) {
    if (open_windows.includes(element.getAttribute('data-id'))) {
      changeWindow(element.getAttribute('data-id'))
    } else {
      click()
      document.body.classList.toggle('loading')
      createWindow(element, 'default', element.getAttribute('data-id'))
    } 
  }
}

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

function closeWindow(id) {
  document.querySelector(`.window[data-id="${id}"]`).remove()
  document.querySelector(`.tab[data-id="${id}"]`).remove()

  let top = parseInt(current_offset[0]) - 20
  let left = parseInt(current_offset[1]) - 20
  current_offset = [left, top]
  
  const index = open_windows.indexOf(id)
  if (index > -1) {
    open_windows.splice(index, 1)
  }
  active_window = null
}

function createWindow(reference, template, uuid) {
  clean()
  let window = newWindow(reference, uuid)
  let tab = newTab(reference, uuid)
  document.body.appendChild(window)
  let top = parseInt(current_offset[0]) + 20
  let left = parseInt(current_offset[1]) + 20
  window.style.top = top
  window.style.left = left
  
  current_offset = [left, top]

  document.getElementById('tabs').appendChild(tab)
  init()
  open_windows.push(`${uuid}`)
  changeWindow(`${uuid}`)
  setTimeout(function() {
    document.body.classList.toggle('loading')
  },300)
}

function newWindow(reference, uuid){
  let object
  console.log(reference)
  object = document.createElement('div')
  object.classList.add('section', 'window', 'resizable', 'draggable', reference.getAttribute('data-class'))
  object.setAttribute('data-id', `${uuid}`)

  let title = document.createElement('div')
  title.classList.add('title', 'flex', 'between')
  title.innerHTML = `<p class="flex a-center"><img src="/img/icons/${reference.getAttribute('data-icon')}.png" height="20px">${reference.getAttribute('data-title')}</p><button class="btn close" data-id="${uuid}"><span class="visually-hidden">Click or press ESC to close</span></button>`

  console.log("this is the title " + reference.getAttribute('data-title'))

  var windowContentRoute = new XMLHttpRequest()
  windowContentRoute.open("GET", reference.getAttribute('data-url'), false)
  windowContentRoute.send()  

  let content = document.createElement('div')
  content.innerHTML = windowContentRoute.responseText

  object.appendChild(title)
  object.appendChild(content)

  return object
}

function newTab(reference, uuid) {
  object = document.createElement('button')
  object.classList.add('btn', 'slim', 'tab')
  object.setAttribute('data-id', `${uuid}`)
  
  let content = document.createElement('p')
  content.classList.add('flex', 'a-center')
  content.innerHTML = `<img src="/img/icons/${reference.getAttribute('data-icon')}.png" height="20px">${reference.getAttribute('data-title')}`

  object.appendChild(content)

  return object
}