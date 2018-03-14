let goalkeeper = 0
let friend = 0
let countdown = 0
radio.setGroup(1)
radio.setTransmitSerialNumber(true)

// When we get a message, if the message contains our name then we've found a friend
// If not, then we can be the friend to someone else, so record their name
// and send a message back to them with their name so they know we are listening
radio.onDataPacketReceived(({ serial: serial2, receivedNumber }) => {
    if (input.buttonIsPressed(Button.AB)) {
        if (receivedNumber == control.deviceSerialNumber()) {
            friend = serial2
        }
    } else {
        if (goalkeeper == 0) {
            goalkeeper = serial2
            radio.sendNumber(serial2)
            countdown = 12
            led.plot(4, 0)
            led.plot(4, 4)
        } else {
            if (goalkeeper == serial2) {
                countdown = 12
            }
        }
    }
})

// 
basic.forever(() => {
    if (goalkeeper != 0) {
        countdown = countdown - 1
        basic.pause(100)
        if (countdown == 0) {
            goalkeeper = 0
            led.unplot(4, 0)
            led.unplot(4, 4)
        }
    }
})

// If button is pressed, send notification that we are here
// Flash the top left pixel while we wait for a friend to listen,
// or display a tick if someone is listening
// If the button is not pressed, then remove friend
basic.forever(() => {
    if (input.buttonIsPressed(Button.AB)) {
        radio.sendNumber(0)
        if (friend == 0) {
            led.plot(0, 0)
            basic.pause(500)
            led.unplot(0, 0)
            basic.pause(500)
        } else {
            basic.showIcon(IconNames.Yes)
        }
    } else {
        if (friend != 0) {
            basic.clearScreen()
            friend = 0
        }
    }
})
