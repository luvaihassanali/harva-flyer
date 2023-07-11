let e0, e1, e2, e3, e4, e5, e6
let p0, p1, p2, p3, p4, p5, p6
let p0k, p1k, p2k, p3k, p4k, p5k, p6k
let w = 1240
let h = 1754

const toolbarBtns = {
    'moreText': {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
    },
    'moreParagraph': {
        'buttons': [/*'alignLeft', 'alignCenter',*/ 'formatOLSimple', /*'alignRight', 'alignJustify',*/ 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', /*'outdent', 'indent','quote'*/],
        'align': 'right'
    },
    'moreRich': {
        'buttons': [/*'insertLink', 'insertImage', 'insertVideo',*/ 'insertTable', /*'emoticons', 'fontAwesome',*/ 'specialCharacters', /*'embedly', 'insertFile',*/ 'insertHR'],
        'buttonsVisible': 4
    },
    'moreMisc': {
        'buttons': ['undo', 'redo', /*'fullscreen', 'print', 'getPDF',*/ 'spellChecker', 'selectAll', /*'html',*/ 'help'],
        'align': 'right',
        'buttonsVisible': 4
    }
}

function reset() {
    getFlyerValues()
    setEditorValues()
    getEditorValues()
    setFlyerValues()
}

$(document).ready(async function () {
    createEditors()
    await sleep(1000)
    p0k = '#p0'
    p1k = '#p1'
    p2k = '#p2'
    p3k = '#p3'
    p4k = '#p4'
    p5k = '#p5'
    p6k = '#p6'

    try {
        window.api.handle('custom-endpoint', (event, d) => function (event, d) {
            if (d === undefined) {
                reset()
                return
            }
            console.log(`data: ${d}`)
            parseData(d)
            setEditorValues()
            getEditorValues()
            setFlyerValues()
        }, event)
        window.api.send('custom-endpoint', "ready");
    } catch (error) {
        console.error(error);
        reset()
    }
    enable()
})

$('#bgBtn').click(function () {
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png'
    input.onchange = e => {
        // getting a hold of the file reference
        let file = e.target.files[0]
        if (file.type !== 'image/png') {
            alert('Only PNG image files supported. Please choose a different image file or covert to PNG.')
            return
        }
        // setting up the reader
        let reader = new FileReader()
        reader.readAsDataURL(file) // this is reading as data url
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            let content = readerEvent.target.result // this is the content!
            document.querySelector('#mainDiv').style.backgroundImage = 'url(' + content + ')'
            try {
                window.api.send('custom-endpoint', content)
            } catch (error) {
                console.error(error)
            }
        }
    }
    input.click();
})

$('#imgBtn').click(function () {
    disable()
    let currDiv = '#mainDiv'
    html2canvas($(currDiv)[0], { width: w, height: h }).then((canvas) => {
        let dataUrl = canvas.toDataURL('image/png')
        let link = document.createElement('a')
        link.download = 'flyer.png'
        link.href = dataUrl
        link.click()
    })
    enable()
})

$('#saveBtn').click(function () {
    disable()
    getFlyerValues()
    const data = [];
    data.push(p0, p1, p2, p3, p4, p5, p6)
    try {
        window.api.send('custom-endpoint', data)
    } catch (error) {
        console.error(error);
    }
    console.log("save done")
    enable()
})

$('#refreshBtn').click(function () {
    disable()
    getEditorValues()
    setFlyerValues()
    enable()
})

function enable() {
    $('.btn-disable').removeClass('disabled grey')
}

function disable() {
    $('.btn-disable').addClass('disabled grey')
}

function parseData(data) {
    p0 = data[0]
    p1 = data[1]
    p2 = data[2]
    p3 = data[3]
    p4 = data[4]
    p5 = data[5]
    p6 = data[6]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getFlyerValues() {
    p0 = $(p0k).html()
    p1 = $(p1k).html()
    p2 = $(p2k).html()
    p3 = $(p3k).html()
    p4 = $(p4k).html()
    p5 = $(p5k).html()
    p6 = $(p6k).html()
}

function getEditorValues() {
    p0 = e0.html.get()
    p1 = e1.html.get()
    p2 = e2.html.get()
    p3 = e3.html.get()
    p4 = e4.html.get()
    p5 = e5.html.get()
    p6 = e6.html.get()
}

function setFlyerValues() {
    $(p0k).html(p0)
    $(p1k).html(p1)
    $(p2k).html(p2)
    $(p3k).html(p3)
    $(p4k).html(p4)
    $(p5k).html(p5)
    $(p6k).html(p6)
}

function setEditorValues() {
    setEditorValue(e0, p0)
    setEditorValue(e1, p1)
    setEditorValue(e2, p2)
    setEditorValue(e3, p3)
    setEditorValue(e4, p4)
    setEditorValue(e5, p5)
    setEditorValue(e6, p6)
}

function setEditorValue(editor, p) {
    editor.html.set(p)
    editor.commands.selectAll()
    editor.lineHeight.apply(1)
    editor.selection.clear()
}

function createEditors() {
    e0 = new FroalaEditor('div#e0', {
        events: {
            'input': function (inputEvent) {
                $(p0k).html(e0.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });

    e1 = new FroalaEditor('div#e1', {
        events: {
            'input': function (inputEvent) {
                $(p1k).html(e1.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });

    e2 = new FroalaEditor('div#e2', {
        events: {
            'input': function (inputEvent) {
                $(p2k).html(e2.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });


    e3 = new FroalaEditor('div#e3', {
        events: {
            'input': function (inputEvent) {
                $(p3k).html(e3.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });

    e4 = new FroalaEditor('div#e4', {
        events: {
            'input': function (inputEvent) {
                $(p4k).html(e4.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });

    e5 = new FroalaEditor('div#e5', {
        events: {
            'input': function (inputEvent) {
                $(p5k).html(e5.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });

    e6 = new FroalaEditor('div#e6', {
        events: {
            'input': function (inputEvent) {
                $(p6k).html(e6.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });
}