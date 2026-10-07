
const parseStyle = (styleObject) => {
    return Object.entries(styleObject).map(e => e.join(': ')).join('; ')
}

const popup = (message, color) => {
    const logBoxEl = document.getElementById('action-log-box')
    logBoxEl.textContent = message
    logBoxEl.style.color = color
}

const popdown = () => {
    const logBoxEl = document.getElementById('action-log-box')
    logBoxEl.textContent = ''
    logBoxEl.style.color = ''
}

const createLogBox = () => {
    const logBoxEl = document.createElement('div')
    logBoxEl.id = 'action-log-box'
    logBoxEl.style = parseStyle({
        position: 'fixed',
        index: '9999',
        right: '1em',
        bottom: '1em',
        width: '7em',
        'min-height': '7em',
        padding: '.5em 1em',
        border: '.2em solid',
        'background-color': '#f2f2f2',
        color: '#555',
        'font-weight': 'bold',
        'text-align': 'center',
    })
    return logBoxEl;
}

const reviewProfile = () => {
    const detailsEl = document.querySelector('.matchprofile-details')
    const familyDetailsEl = document.querySelector('.matchprofile-details-section--family')

    popdown()

    if (!familyDetailsEl || !familyDetailsEl.textContent?.includes(`kid`)) {
        popup('hmm..  read more', '#555')
    } else if (familyDetailsEl.textContent?.includes(`Doesn’t have kids and doesn’t want them`)) {
        popup('yay!!!', 'green')
    } else {
        detailsEl.scrollIntoView()
        popup('nay.', 'red')
    }
}

const clickLike = () => {
    const likeButtonEl = document.querySelector('.dt-action-buttons-button.like')
    popdown()
    likeButtonEl.click()
}

const clickPass = () => {
    const bodyContentEl = document.querySelector('.desktop-dt-content')
    const passButtonEl = document.querySelector('.dt-action-buttons-button.pass')
    popdown()
    bodyContentEl?.scrollIntoView()
    passButtonEl.click()
}

const bindKeyListener = (key, callback, modifier = 'shiftKey') => {
    document.addEventListener('keypress', (ev) => {
        console.log(ev)
        if (ev[modifier] && ev.key === key) {
            callback?.()
        }
    })
}

const bindKeyboardShortcuts = () => {
    bindKeyListener('R', reviewProfile)
    bindKeyListener('L', clickLike)
    bindKeyListener('P', clickPass)
}

const render = () => {
    document.body.appendChild(createLogBox())
    document.body.appendChild(createReviewButton())
}

const main = () => {
    render()
    bindKeyboardShortcuts()
}

main();
