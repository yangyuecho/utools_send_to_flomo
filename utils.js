const e = sel => document.querySelector(sel)

const es = sel => document.querySelectorAll(sel)

const log = console.log.bind(console)

const append = (selector, html) => {
    selector.insertAdjacentHTML('beforeend', html);
}

const toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

const addAllClass = function(selectors, className) {
    for (var i = 0; i < selectors.length; i++) {
        var element = selectors[i]
        element.classList.add(className)
    }
}