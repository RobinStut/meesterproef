export default (() => {
    // console.log('test');

    const nextButton = document.getElementById('quizNextButton')
    const backButton = document.getElementById('quizBackButton')

    nextButton.addEventListener('click', e => {
        e.preventDefault()
        const sectionCount = document.getElementById("quizForm").getElementsByTagName('section')
        const classNameFinder = document.getElementsByClassName('showFormElement')[0]
        for (let i = 0; i < sectionCount.length; i++) {
            const sectionClass = sectionCount[i].className;

            if (sectionClass == 'showFormElement' && (i + 1) === sectionCount.length) {
                nextButton.setAttribute('disabled', '')

            } else {
                classNameFinder.removeAttribute("class");;
                classNameFinder.nextSibling.nextSibling.setAttribute('class', 'showFormElement');
                console.log(backButton.removeAttribute('disabled', ''));

            }
        }
    });

    backButton.addEventListener('click', e => {
        e.preventDefault()
        const sectionCount = document.getElementById("quizForm").getElementsByTagName('section')
        const classNameFinder = document.getElementsByClassName('showFormElement')[0]
        for (let i = 0; i < sectionCount.length; i++) {
            const sectionClass = sectionCount[i].className;
            console.log(i);
            if (sectionCount[0].className == 'showFormElement') {
                backButton.setAttribute('disabled', '')
            }
            if (sectionClass == 'showFormElement' && i > 0) {
                classNameFinder.removeAttribute("class");;
                classNameFinder.previousSibling.previousSibling.setAttribute('class', 'showFormElement');
                nextButton.removeAttribute('disabled', '')
            }
        }

    });


})()