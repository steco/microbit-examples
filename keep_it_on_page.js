let inGame = 0
let y = 0
let x = 0
let xPlot = 0
let yPlot = 0
yPlot = 2000
xPlot = 2000
basic.forever(() => {
    xPlot = xPlot + input.rotation(Rotation.Roll)
    yPlot = yPlot + input.rotation(Rotation.Pitch)
    led.unplot(x, y)
    x = xPlot / 1000
    y = yPlot / 1000
    led.plot(x, y)
    if (inGame != 0 && x > 4) {
        radio.sendNumber(1)
    }
})
