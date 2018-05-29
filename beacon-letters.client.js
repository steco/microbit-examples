// Client code for the beacon-letters game.
// Listens for the radio signal, plots it on the display and records
// the letters that the beacon is transmitting

let beacons: number[] = []
let letters: string = ""
radio.onDataPacketReceived( ({ receivedString, signal, serial: serial2 }) =>  {
    if (SignalDisplay.showSignal(signal)) {
    	if(beacons.indexOf(serial2) < 0)
        {
            beacons.push(serial2)
            letters = letters.concat(receivedString)
        }
    }
})
input.onButtonPressed(Button.B, () => {
    basic.clearScreen()
    basic.showNumber(beacons.length)
    basic.showString(letters)
})