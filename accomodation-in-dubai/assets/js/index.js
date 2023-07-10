$(document).on('DOMContentLoaded', function () {
    $('#setCustomBtn').prop('disabled', true)
    $('#resolutionBtn1').click()
})

$(document).ready(function () {
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

$('#resolutionBtn4').click(function () {
    $('#mainDiv').width(2480 - actual)
    $('#mainDiv').height(3508 - actual)
    $('#mainContainer').width(2480 + 26 - actual)
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
        $('#setCustomBtn').prop('disabled', false)
    } else {
        $('#widthInput').prop('disabled', true)
        $('#heightInput').prop('disabled', true)
        $('#setCustomBtn').prop('disabled', true)
    }
})