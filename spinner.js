let angle = 0
let dot = game.createSprite(2, 2)
basic.forever(function () {
    angle = input.rotation(Rotation.Roll)
    dot.goTo(Math.trunc(angle / 45) + 2, 2)
    // pins.analogWritePin(AnalogPin.P0, (angle + 90) / 180 * 1024)
})
input.onButtonPressed(Button.A, function () {
    pins.analogWritePin(AnalogPin.P0, 1023)
})
input.onButtonPressed(Button.B, function () {
    pins.analogWritePin(AnalogPin.P0, 0)
})
