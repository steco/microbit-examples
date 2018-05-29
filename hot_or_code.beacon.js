// This turns a microbit into a beacon for the hot-or-code game
// It is based on the example at https://makecode.microbit.org/projects/hot-or-cold

radio.setGroup(1)
radio.setTransmitSerialNumber(true)
radio.setTransmitPower(7)
basic.forever(() => {
    radio.sendNumber(0)
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.Surprised)
})
