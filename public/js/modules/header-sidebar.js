function sidebarNav() {
    const body = document.querySelector('body'),
        headerHamburger = document.getElementById('st-hamburger-menu'),
        headerHamburgerIcon = document.querySelector('#st-hamburger-menu svg'),
        asideMenu = document.querySelector('aside')

    headerHamburger.addEventListener('click', () => {
        body.classList.toggle('st-overflow-hidden')
        asideMenu.classList.toggle('st-show')
        headerHamburgerIcon.classList.toggle('st-text-color')
    })
}

export {
    sidebarNav
}