let editor1

$(document).ready(function () {
    /*const scaleBy = 5
    const w = 1000
    const h = 1000
    let canvas = document.createElement('canvas')

    canvas.width = w * scaleBy
    canvas.height = h * scaleBy
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    let context = canvas.getContext('2d')
    context.scale(scaleBy, scaleBy)
    window.devicePixelRatio = 2*/

    editor1 = new FroalaEditor('div#froala-editor1', {
        events: {
            'input': function (inputEvent) {
                //console.log(this);
                console.log(editor.html.get())
            }
        },
        width: 600,
        height: 150,
        toolbarSticky: false
    });
    console.log('ready')
})

let dataUrl
$('#imgBtn').click(function () {
    html2canvas($('#flyerCol')[0], { height: $('#flyerCol')[0].offsetHeight - 1, scale: 5 }).then((canvas) => {
        dataUrl = canvas.toDataURL('image/png')
        var link = document.createElement('a')
        link.download = 'flyer.png'
        link.href = dataUrl
        link.click()
    })
})

$('#fileBtn').click(function () {
    //alert(editor1.html.get())
    window.open(dataUrl, '_blank')
})