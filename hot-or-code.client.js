// Client code for the hot-or-code game.
// Listens for the radio signal, plots it on the display and records
// the unique beacons that are seen

let beacons: number[] = []
let list = 0
radio.onDataPacketReceived( ({ receivedNumber, signal, serial: serial2 }) =>  {
    if (SignalDisplay.showSignal(signal) == 1) {
        if (beacons.indexOf(serial2) < 0) {
            beacons.push(serial2)
            basic.showIcon(IconNames.Butterfly)
        }
    }
})
input.onButtonPressed(Button.B, () => {
    basic.clearScreen()
    basic.showNumber(beacons.length)
})
list = 0
radio.setGroup(1)
