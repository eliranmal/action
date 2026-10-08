
const parseStyle = (styleObject) => {
    return Object.entries(styleObject).map(e => e.join(': ')).join('; ')
}

const popup = (message, timeoutSeconds = 3) => {
    const logEl = document.getElementById('ok-buddy-log')
    logEl.textContent = message
    logEl.style.opacity = '1'
    logEl.style.transition = `opacity ${timeoutSeconds}s ease-in`
    logEl.style.opacity = '0'
    setTimeout(popdown, timeoutSeconds * 1000)
}

const popdown = () => {
    const logEl = document.getElementById('ok-buddy-log')
    logEl.textContent = ''
    logEl.style.opacity = '1'
    logEl.style.transition = ''
}

const createLogBox = () => {
    const baseStyle = {
        position: 'fixed',
        right: '2rem',
        bottom: '2rem',
        width: '4rem',
        height: '4rem',
        'border-radius': '2rem',
    }
    const logEl = document.createElement('div')
    logEl.id = 'ok-buddy-log'
    logEl.style = parseStyle({
        ...baseStyle,
        index: '99999',
        'line-height': '4rem',
        'text-align': 'center',
        'font-size': '1.5em',
    })
    const logBoxEl = document.createElement('div')
    logBoxEl.style = parseStyle({
        ...baseStyle,
        index: '99998',
        'background-color': '#333',
    })
    logBoxEl.appendChild(logEl)
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
    popup('👍', 2)

}

const passProfile = () => {
    popdown()
    const bodyContentEl = document.querySelector('.desktop-dt-content')
    const passButtonEl = document.querySelector('.dt-action-buttons-button.pass')
    bodyContentEl?.scrollIntoView()
    passButtonEl.click()
    popup('👎', 2)
}


const bindKeyboardShortcuts = () => {
    document.addEventListener('keypress', (ev) => {
        if (!ev.metaKey) {
            return;
        }
        switch (ev.code) {
            case 'Numpad8':
                reviewProfile()
                break;
            case 'Numpad6':
                likeProfile()
                break;
            case 'Numpad4':
                passProfile()
                break;
            case 'Numpad2':
                location.reload()
                break;
            default:
                break;
        }
    })
}

const render = () => {
    document.body.appendChild(createLogBox())
}

const main = () => {
    render()
    bindKeyboardShortcuts()
}

main();
