
const parseStyle = (styleObject) => {
    return Object.entries(styleObject).map(e => e.join(': ')).join('; ')
}

const popup = (message, timeoutSeconds) => {
    const logBoxEl = document.getElementById('action-log-box')
    logBoxEl.textContent = message
    if (Number.isInteger(timeoutSeconds)) {
        setTimeout(popdown, timeoutSeconds * 1000)
    }
}

const popdown = () => {
    const logBoxEl = document.getElementById('action-log-box')
    logBoxEl.textContent = ''
}

const createLogBox = () => {
    const logBoxEl = document.createElement('div')
    logBoxEl.id = 'action-log-box'
    logBoxEl.style = parseStyle({
        position: 'fixed',
        index: '99999',
        right: '2rem',
        bottom: '2rem',
        width: '4rem',
        height: '4rem',
        'line-height': '4rem',
        'border-radius': '2rem',
        'text-align': 'center',
        'font-size': '1.5em',
        'background-color': '#333',
    })
    return logBoxEl;
}

const reviewProfile = () => {
    const detailsEl = document.querySelector('.matchprofile-details')
    const familyDetailsEl = document.querySelector('.matchprofile-details-section--family')

    popdown()

    if (!familyDetailsEl || !familyDetailsEl.textContent?.includes(`kid`)) {
        popup('👀')
    } else if (familyDetailsEl.textContent?.includes(`Doesn’t have kids and doesn’t want them`)) {
        popup('✅')
    } else {
        detailsEl.scrollIntoView()
        popup('❌')
    }
}

const likeProfile = () => {
    popdown()
    const likeButtonEl = document.querySelector('.dt-action-buttons-button.like')
    likeButtonEl.click()
    popup('👍', 3)

}
const passProfile = () => {
    popdown()
    const bodyContentEl = document.querySelector('.desktop-dt-content')
    const passButtonEl = document.querySelector('.dt-action-buttons-button.pass')
    bodyContentEl?.scrollIntoView()
    passButtonEl.click()
    popup('👎', 3)
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
    bindKeyListener('L', likeProfile)
    bindKeyListener('P', passProfile)
}

const render = () => {
    document.body.appendChild(createLogBox())
}

const main = () => {
    render()
    bindKeyboardShortcuts()
}

main();
