
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

const highlightText = (terms, selector) => {
    if (!CSS.highlights) {
        console.log('css highlights not supported!')
        return
    }

    CSS.highlights.clear()

    const domWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, node => (
        terms.some(t => node.data.includes(t)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    ))

    const termsTextNodes = []
    while (domWalker.nextNode()) {
        termsTextNodes.push(domWalker.currentNode)
    }

    const ranges = termsTextNodes.map(node => {
        const range = document.createRange()
        const term = terms.find(t => node.data.includes(t))
        range.setStart(node, node.data.indexOf(term))
        range.setEnd(node, node.data.indexOf(term) + term.length)
        return range
    })

    const matchesHighlight = new Highlight(...ranges)
    CSS.highlights.set(selector, matchesHighlight)
}

const reviewProfile = async () => {
    const detailsEl = document.querySelector('.matchprofile-details')

    popdown()

    const rules = await chrome.runtime.sendMessage({ type: 'getRules' })
    const yayMatch = rules.yay.some(yRule => detailsEl.textContent.includes(yRule))
    const nayMatch = rules.nay.some(nRule => detailsEl.textContent.includes(nRule))

    if (nayMatch) {
        popup('❌')
        highlightText(rules.nay, 'nay-matches')
    } else if (yayMatch) {
        popup('✅')
        highlightText(rules.yay, 'yay-matches')
    } else {
        popup('❔')
    }

    detailsEl.scrollIntoView()
}

const likeProfile = () => {
    popdown()
    const profilePageSelector = '#like-button'
    const discoverPageSelector = '.dt-action-buttons-button.like'
    const likeButtonEl = document.querySelector([profilePageSelector, discoverPageSelector].join(','))
    likeButtonEl.click()
    popup('👍', 2)
}

const passProfile = () => {
    popdown()
    const profilePageSelector = '#pass-button'
    const discoverPageSelector = '.dt-action-buttons-button.pass'
    const passButtonEl = document.querySelector([profilePageSelector, discoverPageSelector].join(','))
    passButtonEl.click()
    popup('👎', 2)
}

const messageProfile = () => {
    popdown()
    const profilePageSelector = '.profile-pill-buttons-button.message-pill-button'
    const messageButtonEl = document.querySelector(profilePageSelector)
    messageButtonEl?.click()
    popup('✏️', 2)
}

const bindHotkeys = () => {
    document.addEventListener('keypress', (ev) => {
        if (!ev.metaKey) {
            return;
        }

        document.querySelector('.desktop-dt-wrapper').scrollIntoView()

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
            case 'Numpad5':
                messageProfile()
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
    bindHotkeys()
}

main();
