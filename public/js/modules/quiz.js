export default (() => {

    const nextButton = document.getElementById('quizNextButton')
    const backButton = document.getElementById('quizBackButton')
    const sectionCount = document.getElementById("quizForm").getElementsByTagName('section')

    function progressBarCreation(status) {
        const HTMLProgressBar = document.getElementById('progressBar')
        // setup of progressbar
        for (let i = 0; i < (sectionCount.length + 1); i++) {

            if (i === 0) {
                HTMLProgressBar.insertAdjacentHTML('beforeend', `<div class="progressStep green"value="${i}">${i+1}</div>`);
            }

            if (i > 0 && i < sectionCount.length) {
                HTMLProgressBar.insertAdjacentHTML('beforeend', `<div class="progressStep"value="${i}">${i+1}</div>`);
            }

            if (sectionCount.length === i) {
                HTMLProgressBar.insertAdjacentHTML('beforeend', `<div class="progressStep lastStep"value="${i}">Result</div>`);
            }
        }
    }
    progressBarCreation()


    function progressBarUpdate() {
        const allSectionsInForm = document.getElementsByTagName('section')
        const progressBarItems = document.getElementById('progressBar').getElementsByClassName('progressStep')

        for (let i = 0; i < allSectionsInForm.length; i++) {

            if (allSectionsInForm[i].className === 'showFormElement') {

                for (let x = 0; x < i; x++) {
                    progressBarItems[x + 1].classList.add("green");
                }
                for (let y = (i + 1); y < allSectionsInForm.length; y++) {
                    progressBarItems[y].classList.remove("green");
                }
            }
        }
    }

    nextButton.addEventListener('click', e => {
        e.preventDefault()

        const classNameFinder = document.getElementsByClassName('showFormElement')[0]
        for (let i = 0; i < sectionCount.length; i++) {
            const sectionClass = sectionCount[i].className;

            if (sectionClass == 'showFormElement' && (i + 1) === sectionCount.length) {
                //end of the questions
                nextButton.setAttribute('disabled', '')

            } else {
                //all other posibilities
                classNameFinder.removeAttribute("class");;
                classNameFinder.nextSibling.nextSibling.setAttribute('class', 'showFormElement');
                backButton.removeAttribute('disabled', '')
            }
        }
        progressBarUpdate()
    });

    backButton.addEventListener('click', e => {
        e.preventDefault()

        const classNameFinder = document.getElementsByClassName('showFormElement')[0]
        for (let i = 0; i < sectionCount.length; i++) {
            const sectionClass = sectionCount[i].className;
            if (sectionCount[0].className == 'showFormElement') {
                //begin of the questions
                backButton.setAttribute('disabled', '')
            }
            if (sectionClass == 'showFormElement' && i > 0) {
                //all other posibilities
                classNameFinder.removeAttribute("class");;
                classNameFinder.previousSibling.previousSibling.setAttribute('class', 'showFormElement');
                nextButton.removeAttribute('disabled', '')
            }
        }
        progressBarUpdate()
    });


})()