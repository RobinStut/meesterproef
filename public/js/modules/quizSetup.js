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
                classNameFinder.nextSibling.nextElementSibling.setAttribute('class', 'showFormElement');
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
                classNameFinder.previousSibling.previousElementSibling.setAttribute('class', 'showFormElement');
                nextButton.removeAttribute('disabled', '')
            }
        }
        progressBarUpdate()
    });

    const draggableItems = document.getElementsByClassName('draggableTag')
    const dragInputs = document.getElementsByClassName('dragInput')
    const dragTagValues = document.getElementsByClassName('draggableTag')
    let currentDraggedElement
    for (const dragInput of dragInputs) {
        dragInput.addEventListener("dragover", dragover)
        dragInput.addEventListener("dragenter", dragenter)
        dragInput.addEventListener("drop", drop)
    }
    for (const dragValue of dragTagValues) {
        dragValue.addEventListener("dragstart", dragstart)

    }



    function dragover(e) {
        e.preventDefault()
    }

    function dragstart(e) {
        currentDraggedElement = e.target.innerText
    }

    function dragenter(e) {
        e.preventDefault()
    }

    function drop(e) {
        setTimeout(() => {
            e.path[0].value = e.target.textContent;
        }, 0);
        this.innerText = currentDraggedElement
        const coresponsingInputfield = e.target.attributes[1].value;
        document.getElementById(coresponsingInputfield).value = currentDraggedElement
    }


    const form = document.getElementById('quizForm')
    form.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formInputs = document.getElementById('quizForm').getElementsByTagName('input')
        let formResult = []

        for (let formInput of formInputs) {
            if (formInput.type === 'radio' && formInput.checked === true) {
                formResult.push(formInput.attributes[3].value)
            }
            if (formInput.type !== 'radio') {
                formResult.push(formInput.value)
            }
        }
        let yourResultsOfForm = {
            age: formResult[0],
            gender: formResult[1],
            motivation: [formResult[2], formResult[3], formResult[4]],
            groupOrSolo: Number(formResult[5]),
            inOrOutdoor: Number(formResult[6]),
            fishOrLand: Number(formResult[7]),
            improvement: formResult[8]
        }

        const jsonData = await fetch(`${window.location.href}sportQuizFilter.json`).then(function (response) {
            return response.json();
        })

        let comparedResultsOfSports = []
        let mapCounter = 0;

        jsonData.map(x => {
            let percentage = 0

            const age = (() => {
                const ageIsInObject = x.age.includes(yourResultsOfForm.age)
                if (ageIsInObject == true) {
                    percentage += 20;
                }
            })()

            const gender = (() => {
                const genderIsInObject = x.gender.includes(yourResultsOfForm.gender)
                if (genderIsInObject == true) {
                    percentage += 20;
                }
            })()

            const group = (() => {
                const groupOrSoloInObject = x.groupOrSolo === yourResultsOfForm.groupOrSolo
                if (groupOrSoloInObject === true) {
                    percentage += 20;
                }
                if (groupOrSoloInObject === false) {
                    const calcedPercentage = 20 - (Math.abs(yourResultsOfForm.groupOrSolo - x.groupOrSolo) * 2)
                    percentage += calcedPercentage
                }
            })()

            const inOutdoor = (() => {
                const inOrOutdoorInObject = x.inOrOutdoor === yourResultsOfForm.inOrOutdoor
                if (inOrOutdoorInObject === true) {
                    percentage += 20;
                }
                if (inOrOutdoorInObject === false) {
                    const calcedPercentage = 20 - (Math.abs(yourResultsOfForm.inOrOutdoor - x.inOrOutdoor) * 2)
                    percentage += calcedPercentage
                }
            })()

            const fishOrLand = (() => {
                const fishOrLandInObject = x.fishOrLand === yourResultsOfForm.fishOrLand
                if (fishOrLandInObject === true) {
                    percentage += 20;
                }
                if (fishOrLandInObject === false) {
                    const calcedPercentage = 20 - (Math.abs(yourResultsOfForm.fishOrLand - x.fishOrLand) * 2)
                    percentage += calcedPercentage
                }
            })()
            console.log(percentage);

            comparedResultsOfSports.push({
                percentageNum: percentage,
                index: mapCounter
            })
            mapCounter += 1;
        });



    })

})()