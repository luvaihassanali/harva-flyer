let e1, e2, e3, e4, e5
let p1, p2, p3, p4, p5
let p1k, p2k, p3k, p4k, p5k

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

$(document).on('DOMContentLoaded', function () {
    $('#setCustomBtn').addClass('disabled')
    $('#resolutionBtn1').click()
})

$(document).ready(async function () {
    createEditors()
    await sleep(1000)
    p1k = '#p1'
    p2k = '#p2'
    p3k = '#p3'
    p4k = '#p4'
    p5k = '#p5'
    
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

const actual = 2
$('#resolutionBtn1').click(function () {
    $('#mainDiv').width(595 - actual)
    $('#mainDiv').height(842 - actual)
    $('#mainContainer').width(595 + 26 - actual)
})

$('#resolutionBtn2').click(function () {
    $('#mainDiv').width(794 - actual)
    $('#mainDiv').height(1123 - actual)
    $('#mainContainer').width(794 + 26 - actual)
})

$('#resolutionBtn3').click(function () {
    $('#mainDiv').width(1240 - actual)
    $('#mainDiv').height(1754 - actual)
    $('#mainContainer').width(1240 + 26 - actual)
})

$('#setCustomBtn').click(function () {
    $('#mainDiv').width(Number($('#widthInput').val()) - actual)
    $('#mainDiv').height(Number($('#heightInput').val()) - actual)
    $('#mainContainer').width(Number($('#widthInput').val()) + 26 - actual)
})

$('#customCheckbox').click(function () {
    if ($('#customCheckbox').is(':checked')) {
        $('#widthInput').prop('disabled', false)
        $('#heightInput').prop('disabled', false)
        $('#setCustomBtn').removeClass('disabled')
    } else {
        $('#widthInput').prop('disabled', true)
        $('#heightInput').prop('disabled', true)
        $('#setCustomBtn').addClass('disabled')
    }
})

$('#imgBtn').click(function () {
    disable()
    let currDiv = '#mainDiv'
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
    data.push(p1, p2, p3, p4, p5)
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
    p1 = data[0]
    p2 = data[1]
    p3 = data[2]
    p4 = data[3]
    p5 = data[4]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getFlyerValues() {
    p1 = $(p1k).html()
    p2 = $(p2k).html()
    p3 = $(p3k).html()
    p4 = $(p4k).html()
    p5 = $(p5k).html()
}

function getEditorValues() {
    p1 = e1.html.get()
    p2 = e2.html.get()
    p3 = e3.html.get()
    p4 = e4.html.get()
    p5 = e5.html.get()
}

function setFlyerValues() {
    $(p1k).html(p1)
    $(p2k).html(p2)
    $(p3k).html(p3)
    $(p4k).html(p4)
    $(p5k).html(p5)
}

function setEditorValues() {
    setEditorValue(e1, p1)
    setEditorValue(e2, p2)
    setEditorValue(e3, p3)
    setEditorValue(e4, p4)
    setEditorValue(e5, p5)
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
}