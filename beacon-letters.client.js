let letters = ""
let beacons: number[] = []
let lastReceivedTime = 0
let showRadio = false
radio.onDataPacketReceived(function ({ receivedString, signal, serial: serial2 }) {
    if (showRadio) {
        display.showSignal(signal, -100, -46)
        if (signal > -60) {
            if (beacons.indexOf(serial2) < 0) {
                beacons.push(serial2)
                letters = "" + letters + receivedString
            }
        }
    }
    lastReceivedTime = input.runningTime()
})
input.onButtonPressed(Button.B, function () {
    showRadio = false
    basic.clearScreen()
    basic.showNumber(beacons.length)
    basic.showString(letters)
    showRadio = true
})
showRadio = true
radio.setGroup(1)
basic.forever(function () {
    basic.pause(1000)
    if (lastReceivedTime - input.runningTime() > 1000) {
        basic.clearScreen()
    }
})
