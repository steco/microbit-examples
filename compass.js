// Draw a compass on a Micro:bit

// This requires the Display extension from https://github.com/steco/microbit-display

input.onButtonPressed(Button.AB, () => {
    input.calibrateCompass()
})
basic.forever(() => {
    display.drawArrow((360 - input.compassHeading()) * 2 / 45)
})
