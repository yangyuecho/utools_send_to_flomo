const hiddenClass = "hidden"
const db_write_api_name = "flomo_write_api"
let write_api_data = {_id: db_write_api_name}

const checkApiStatus = () => {
    let apiStatus = getApiStatus()
    if (apiStatus) {
        StyleApiInputHas()
    } else {
        StyleApiInputHasNot()
    }
    setButtonStyle()
}

const StyleApiInputHas = () => {
    e("#id-div-reinput").classList.remove(hiddenClass)
    e("#id-div-api-input").classList.add(hiddenClass)
}

const StyleApiInputHasNot = () => {
    e("#id-div-reinput").classList.add(hiddenClass)
    e("#id-div-api-input").classList.remove(hiddenClass)
}

const EventSaveApi = () => {
    let element = e("#id-div-api-input input")
    element.addEventListener("keydown", function(event) {
        let key = event.key
        let value = element.value
        if (key == "Enter" && value.length > 0) {          
            setApiValue(value)
            checkApiStatus()
        }
    })
}

const EventReinputApi = () => {
    let element = e("#id-div-reinput")
    element.addEventListener("click", function(event) {
        StyleApiInputHasNot()
        setButtonStyle()
    })
}

const EventTextAreaInput= () => {
    let element = e("#id-textarea-thought")
    element.addEventListener("keydown", function(event) {
        // auto height
        element.style.height = 'auto';
        element.style.height = (this.scrollHeight) + 10 + 'px';
        setButtonStyle()
        log(event)
        // cmd + enter to send
        if (event.key === "Enter" && event.metaKey) {
            sendFlomo()
        }
    })
}

const apiSendFlomo = function(data, callback) {
    let path = getApiValue()
    ajax('POST', path, data, callback)
}

const initInputStatus = () => {
    e("#id-textarea-thought").value = "#utools\r\n"
    getApiValue()
    checkApiStatus()
}

const sendFlomo = () => {
    let content = e("#id-textarea-thought").value
    let data = {
        content: content,
    }
    let apiStatus = getApiStatus()
    if (content.length >= 1 && apiStatus) {
        apiSendFlomo(data, (response) => {
            // log(response)
            if (response.code === 0) {
                initInputStatus()
                alert(response.message)
            } else {
                alert(response.message)
            }
        })
    }
}

const EventSendFlomo = () => {
    let element = e("#id-div-input button")
    element.addEventListener("click", function(event) {
        sendFlomo()
    })
}

const setApiValue = (value) => {
    write_api_data.data = value
    utools.db.put(write_api_data)
}

const getApiValue = () => {
    write_api_data = utools.db.get(db_write_api_name)
    // log('get', db_write_api_name, write_api_data)
    return write_api_data.data
}

const getApiStatus = () => {
    let flag = typeof(write_api_data.data) == "string"
    // log("type", flag)
    if (flag) {
        flag = flag && write_api_data.data.length > 0
    }
    return flag
}

const pasteIntoTextArea = () => {
    let textarea = e("#id-textarea-thought")
    utools.onPluginEnter(({code, type, payload, optional}) => {     
        console.log('用户进入插件', code, type, payload)
        let content = `#utools\r\n`
        if (code == "copy") {
            content += `${payload}`
        }
        textarea.value = content
        getApiValue()
        checkApiStatus()
    })
}

const setButtonStyle = () => {
    let stringCount = e("#id-textarea-thought").value.length
    let button = e("#id-div-input button")
    let disableClass = "button-disabled"
    let apiStatus = getApiStatus()
    if (stringCount >= 1 && apiStatus) {
        button.classList.remove(disableClass)
    } else {
        button.classList.add(disableClass)
    }
}

const bindEvents = () => {
    EventSaveApi()
    EventReinputApi()
    EventTextAreaInput()
    EventSendFlomo()
}

const _main = () => {
    pasteIntoTextArea()
    bindEvents()
}

_main()