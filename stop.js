let row = 0
input.onButtonPressed(Button.A, () => {
    row = row + 1
})
row = 0
basic.forever(() => {
    for (let index = 0; index <= 4; index++) {
        led.plot(index, row)
        basic.pause(100)
        led.unplot(index, row)
    }
})
