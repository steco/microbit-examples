// Driver for Kitronik robot (https://makecode.microbit.org/pkg/kitronikltd/pxt-kitronik-servo-lite)
// Button A drives forward, B backward
// This program is both the controller and the driver for the robot

let radioChannel = 1
basic.showNumber(radioChannel)
radio.setGroup(radioChannel)

input.onButtonPressed(Button.A, function () {
    radio.sendString("f")
    kitronik_servo_lite.forward()
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("b")
    kitronik_servo_lite.backward()
})
input.onButtonPressed(Button.AB, function () {
    radio.sendString("")
    kitronik_servo_lite.stop()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "f") {
        kitronik_servo_lite.forward()
    } else if (receivedString == "b") {
        kitronik_servo_lite.backward()
    } else {
        kitronik_servo_lite.stop()
    }
})
