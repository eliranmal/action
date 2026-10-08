
/**
 * helpers for okcupid:
 *
 * - review current user profile according to set rule (META + Numpad 8)
 * - like current user profile (META + Numpad 6)
 * - pass current user profile (META + Numpad 4)
 * - reload page to hopefully load a different user profile (META + Numpad 2)
 */

const parseStyle = (styleObject) => {
    return Object.entries(styleObject).map(e => e.join(': ')).join('; ')
}

const popup = (message, timeoutSeconds = 3) => {
    const logBoxEl = document.getElementById('action-log-box')
    logBoxEl.textContent = message
    logBoxEl.style.opacity = '1'
    logBoxEl.style.transition = `opacity ${timeoutSeconds}s ease-in`
    logBoxEl.style.opacity = '0'
    setTimeout(popdown, timeoutSeconds * 1000)
}

const popdown = () => {
    const logBoxEl = document.getElementById('action-log-box')
    logBoxEl.style.opacity = '1'
    logBoxEl.style.transition = ''
    logBoxEl.textContent = ''
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
    const logBoxEl = document.createElement('div')
    const logBoxBgEl = document.createElement('div')
    logBoxEl.id = 'action-log-box'
    logBoxEl.style = parseStyle({
        ...baseStyle,
        index: '99999',
        'line-height': '4rem',
        'text-align': 'center',
        'font-size': '1.5em',
    })
    logBoxBgEl.style = parseStyle({
        ...baseStyle,
        index: '99998',
        'background-color': '#333',
    })
    logBoxBgEl.appendChild(logBoxEl)
    return logBoxBgEl;
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
