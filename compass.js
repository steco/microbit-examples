input.onButtonPressed(Button.A, () => {
    input.calibrateCompass()
})
basic.forever(() => {
    Display.drawArrow((360 - input.compassHeading()) * 2 / 45)
})
