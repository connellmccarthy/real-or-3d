console.log('lakjsdflkj')
var active_window;
document.querySelectorAll('.window').forEach((element) => {
  console.log(element)
  element.addEventListener('mousedown', () => {
    if (active_window !== element) {
      element.classList.add('active')
      if (active_window){
        active_window.classList.remove('active')
      }
      active_window = element
    }
  })
});