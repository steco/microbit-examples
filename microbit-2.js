basic.forever(function () {
    music.ringTone(Math.map(input.rotation(Rotation.Pitch), -180, 180, 131, 988))
})


let list: number[] = []
input.onButtonPressed(Button.A, function () {
    list = []
    for (let index = 0; index <= 4; index++) {
        list.push(input.soundLevel())
        display.show(Math.map(input.soundLevel(), 0, 255, 0, 25))
        basic.pause(1000)
    }
    basic.showNumber(list.length)
    basic.pause(200)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Heart)
    for (let value of list) {
        music.setVolume(value)
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
    basic.clearScreen()
})

basic.forever(function () {
    display.show(Math.map(input.soundLevel(), 0, 255, 0, 25))
})

