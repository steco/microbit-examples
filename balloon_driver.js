radio.setGroup(1)

radio.onReceivedString(function (msg: string) {
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
})

