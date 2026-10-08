
const popup = (message, timeoutSeconds = 3) => {
    const logEl = document.getElementById('ok-buddy-log')
    logEl.textContent = message
    logEl.style['--ok-buddy-log-transition-duration'] = `${timeoutSeconds}s`
    logEl.classList.add('ok-buddy-transparent')
    setTimeout(popdown, timeoutSeconds * 1000)
}

const popdown = () => {
    const logEl = document.getElementById('ok-buddy-log')
    logEl.textContent = ''
    logEl.classList.remove('ok-buddy-transparent')
}

const createLogBox = () => {
    const logEl = document.createElement('div')
    logEl.id = 'ok-buddy-log'
    logEl.classList.add('ok-buddy-log-text')
    const logBoxEl = document.createElement('div')
    logBoxEl.classList.add('ok-buddy-log-box')
    logBoxEl.appendChild(logEl)
    return logBoxEl;
}

const reviewProfile = () => {
    const detailsEl = document.querySelector('.matchprofile-details')

    popdown()

    const rules = {
        yay: ['Doesn’t have kids and doesn’t want them'],
        nay: ['Smokes cigarettes regularly'],
    }

    const yayMatch = rules.yay.some(yRule => detailsEl.textContent.includes(yRule))
    const nayMatch = rules.nay.some(nRule => detailsEl.textContent.includes(nRule))

    if (nayMatch) {
        popup('❌')
    } else if (yayMatch) {
        popup('✅')
    } else {
        popup('❔')
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
