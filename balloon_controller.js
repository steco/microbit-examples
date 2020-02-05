radio.setGroup(1)
radio.setTransmitPower(7)
let display = GAME_ZIP64.createZIP64Display()
display.setBrightness(10)
display.showRainbow(1, 360)
display.show()
basic.pause(1000)
display.clear()
display.show()

basic.forever(function () {
    let msg = ""
    msg += createMessage(GAME_ZIP64.ZIP64ButtonPins.Up, GAME_ZIP64.ZIP64ButtonPins.Down, "f", "b")
    msg += createMessage(GAME_ZIP64.ZIP64ButtonPins.Left, GAME_ZIP64.ZIP64ButtonPins.Right, "l", "r")
    msg += createMessage(GAME_ZIP64.ZIP64ButtonPins.Fire1, GAME_ZIP64.ZIP64ButtonPins.Fire2, "u", "d")

    basic.clearScreen()
    if (msg.indexOf("f") >= 0) {
        led.plot(2, 0)
        led.plot(2, 1)
    }
    if (msg.indexOf("b") >= 0) {
        led.plot(2, 3)
        led.plot(2, 4)
    }
    if (msg.indexOf("u") >= 0) {
        led.plot(1, 0)
        led.plot(2, 0)
        led.plot(3, 0)
    }
    if (msg.indexOf("d") >= 0) {
        led.plot(1, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    }
    if (msg.indexOf("l") >= 0) {
        led.plot(0, 2)
        led.plot(1, 2)
    }
    if (msg.indexOf("r") >= 0) {
        led.plot(3, 2)
        led.plot(4, 2)
    }

    radio.sendString(msg)
})

function createMessage(
    a: GAME_ZIP64.ZIP64ButtonPins,
    b: GAME_ZIP64.ZIP64ButtonPins,
    a_message: string,
    b_message: string) {
    if (GAME_ZIP64.buttonIsPressed(a) && !GAME_ZIP64.buttonIsPressed(b)) {
        return a_message
    }
    else if (GAME_ZIP64.buttonIsPressed(b) && !GAME_ZIP64.buttonIsPressed(a)) {
        return b_message
    }

    return ""
}
