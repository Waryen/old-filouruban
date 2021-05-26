const open = document.querySelector('.open-menu')
const close = document.querySelector('.close-menu')
const nav = document.querySelector('.navigation-mobile')
const navList = document.querySelector('.navigation-list-mobile')
const focusableEl = nav.querySelectorAll('a[href]')
const maxFocusableEl = focusableEl.length - 1




// Ouvre le menu de navigation
open.addEventListener('click', function(e) {
    e.preventDefault()
    if(nav.style.visibility != 'visible') {
        nav.setAttribute('aria-hidden', 'false')
        nav.style.visibility = 'visible'
        open.style.visibility = 'hidden'
        focusableEl[0].focus()
    }
})

// Ferme le menu en cliquant sur la croix
close.addEventListener('click', function(e) {
    e.preventDefault()
    if(nav.style.visibility == 'visible') {
        nav.setAttribute('aria-hidden', 'true')
        nav.style.visibility = 'hidden'
        open.style.visibility = 'visible'
        open.focus()
    }
})

// Ferme le menu en appuyant sur Escape
window.addEventListener('keydown', function(e) {
    if(e.key == 'Escape' && nav.style.visibility == 'visible') {
        nav.setAttribute('aria-hidden', 'true')
        nav.style.visibility = 'hidden'
        open.style.visibility = 'visible'
        open.focus()
    }
})

// Ferme le menu en cliquant en-dehors des liens
nav.addEventListener('click', () => {
    if(nav.style.visibility == 'visible') {
        nav.setAttribute('aria-hidden', 'true')
        nav.style.visibility = 'hidden'
        open.style.visibility = 'visible'
        open.focus()
    }
})

// Gestion des tabulations dans le menu
nav.addEventListener('keydown', function(e) {
    if(e.key == 'Tab' && nav.style.visibility == 'visible') {
        function back() {
            if(document.activeElement == focusableEl[0]) {
                e.preventDefault()
                focusableEl[maxFocusableEl].focus()
            }
        }

        function forward() {
            if(document.activeElement == focusableEl[maxFocusableEl]) {
                e.preventDefault()
                focusableEl[0].focus()
            }
        }

        switch(e.key) {
            case 'Tab':
                if(e.shiftKey) {
                    back()
                } else {
                    forward()
                }
                break
            default:
                break
        }
    }
})