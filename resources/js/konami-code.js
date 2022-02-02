// Konami code easter egg
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let current = 0

let keyHandler = function (e) {

    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    if (pattern.indexOf(e.key) < 0 || e.key !== pattern[current]) {
        current = 0
        return
    }

    // Update how much of the pattern is complete
    current++

    // If complete, alert and reset
    if (pattern.length === current) {
        current = 0
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    }

}

document.addEventListener('keydown', keyHandler)