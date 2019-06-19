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

function headerBackgroundScroll() {
    const scrollPos = 0,
          header = document.querySelector('header'),
          headerHamburgerIcon = document.querySelector('#st-hamburger-menu svg'),
          headerSearchIcon = document.querySelector('#st-search svg')

    window.addEventListener('scroll', () => {
        const windowYOffset = window.scrollY

        if (windowYOffset > scrollPos){
            header.classList.add('st-header-background-color')
            headerHamburgerIcon.classList.add('st-text-color')
            headerSearchIcon.classList.add('st-text-color')
        } else if (windowYOffset === scrollPos) {
            header.classList.remove('st-header-background-color')
            headerHamburgerIcon.classList.remove('st-text-color')
            headerSearchIcon.classList.remove('st-text-color')
        }
    })
}

headerBackgroundScroll()
sidebarNav()

export default {}
