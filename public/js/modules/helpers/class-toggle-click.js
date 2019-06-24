function classToggleClick(clickElement, toggleElements) {
	clickElement.addEventListener("click", () => {
		toggleElements.forEach(e => {
			e.element.classList.toggle(e.class)
		})
	})
}

export { classToggleClick }
