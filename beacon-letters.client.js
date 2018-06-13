// Client code for the beacon-letters game.
// Listens for the radio signal, plots it on the display and records
// the letters that the beacon is transmitting

let letters = ""
let beacons: number[] = []
let showRadio = false
radio.onDataPacketReceived(({ receivedString, signal, serial: serial2 }) => {
    if (showRadio && SignalDisplay.showSignal(signal)) {
        if (beacons.indexOf(serial2) < 0) {
            beacons.push(serial2)
            letters = "" + letters + receivedString
        }
    }
})
input.onButtonPressed(Button.B, () => {
    showRadio = false
    basic.clearScreen()
    basic.showNumber(beacons.length)
    basic.showString(letters)
    showRadio = true
})
showRadio = true
radio.setGroup(1)

