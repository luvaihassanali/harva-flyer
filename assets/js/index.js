let e1, e2, e3, e4, e5, e6, e7
let p1, p2, p3, p4, p5, p6, p7
let p1k, p2k, p3k, p4k, p5k, p6k, p7k
let c1
let sfx = ''

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

$(document).ready(async function () {
    createEditors()
    await sleep(1000)
    getKeys()

    let h = $('#flyerCol').height()
    $('#editorCol').height(h)

    try {
        window.api.handle('custom-endpoint', (event, d) => function (event, d) {
            if (d === undefined) {
                getFlyerValues()
                setEditorValues()
                getEditorValues()
                setFlyerValues()
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
        getFlyerValues()
        setEditorValues()
        getEditorValues()
        setFlyerValues()
    }
    enable()

})

$('#imgBtn').click(function () {
    disable()
    let currDiv = `#c1${sfx}`
    html2canvas($(currDiv)[0], { height: $(currDiv)[0].offsetHeight, scale: 2 }).then((canvas) => {
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
    data.push(p1, p2, p3, p4, p5, p6, p7);
    try {
        window.api.send('custom-endpoint', data);
    } catch (error) {
        console.error(error);
    }
    console.log("save done")
    enable()
})

$('#switchBtn').click(function () {
    disable()
    if ($('#c1').is(":hidden")) {
        $('#c1d2').hide()
        $('#c1').show()
        sfx = ''
    } else {
        $('#c1').hide()
        $('#c1d2').show()
        sfx = 'd2'
    }
    getEditorValues()
    getKeys()
    setFlyerValues()
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
    p1 = data[0]
    p2 = data[1]
    p3 = data[2]
    p4 = data[3]
    p5 = data[4]
    p6 = data[5]
    p7 = data[6]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getKeys() {
    p1k = `#p1${sfx}`
    p2k = `#p2${sfx}`
    p3k = `#p3${sfx}`
    p4k = `#p4${sfx}`
    p5k = `#p5${sfx}`
    p6k = `#p6${sfx}`
    p7k = `#p7${sfx}`
    c1k = `#c1${sfx}`
}

function getFlyerValues() {
    p1 = $(p1k).html()
    p2 = $(p2k).html()
    p3 = $(p3k).html()
    p4 = $(p4k).html()
    p5 = $(p5k).html()
    p6 = $(p6k).html()
    p7 = $(p7k).html()
}

function getEditorValues() {
    p1 = e1.html.get()
    p2 = e2.html.get()
    p3 = e3.html.get()
    p4 = e4.html.get()
    p5 = e5.html.get()
    p6 = e6.html.get()
    p7 = e7.html.get()
}

function setFlyerValues() {
    $(p1k).html(p1)
    $(p2k).html(p2)
    $(p3k).html(p3)
    $(p4k).html(p4)
    $(p5k).html(p5)
    $(p6k).html(p6)
    $(p7k).html(p7)
}

function setEditorValues() {
    setEditorValue(e1, p1)
    setEditorValue(e2, p2)
    setEditorValue(e3, p3)
    setEditorValue(e4, p4)
    setEditorValue(e5, p5)
    setEditorValue(e6, p6)
    setEditorValue(e7, p7)
}

function setEditorValue(editor, p) {
    editor.html.set(p)
    editor.commands.selectAll()
    editor.lineHeight.apply(1)
    editor.selection.clear()
}

function createEditors() {
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

    e7 = new FroalaEditor('div#e7', {
        events: {
            'input': function (inputEvent) {
                $(p7k).html(e7.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false,
        toolbarButtons: toolbarBtns
    });
}