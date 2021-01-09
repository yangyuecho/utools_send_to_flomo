const pasteIntoTextArea = () => {
    let textarea = e("#id-textarea-thought")
    utools.onPluginEnter(({code, type, payload, optional}) => {     
        console.log('用户进入插件', code, type, payload)   
        let content = `#utools\r\n${payload}`
        textarea.value = content
        setButtonStyle()
    })
}

const setButtonStyle = () => {
    let stringCount = e("#id-textarea-thought").value.length
    let button = e("#id-div-input button")
    let disableClass = "button-disabled"
    if (stringCount >= 1) {
        button.classList.remove(disableClass)
    } else {
        button.classList.add(disableClass)
    }
}

const _main = () => {
    log(123)
    pasteIntoTextArea()
}

_main()