// Driver for Kitronik :MOVE Mini robot (https://www.kitronik.co.uk/5624-move-mini-buggy-kit-excl-microbit.html)
// Roll (left and right) and Pitch (forward to back) are received
// via a radio connection from the controller and used to controller
// the speed of the motors
// (Code based on https://www.kitronik.co.uk/blog/move-mini-microbit-radio/)

let radioChannel = 2
let pitch = 0
let roll = 0
radio.setGroup(radioChannel)
basic.showNumber(radioChannel)

basic.forever(function () {
    let displayX = Math.round(pins.map(roll, -90, 90, 0, 4))
    let displayY = Math.round(pins.map(pitch, -90, 90, 0, 4))
    basic.clearScreen()
    led.plot(displayX, displayY)

    // Assuming no roll (left-right) then set speed of both motors to the same
    let speedLeft = pins.map(pitch, -90, 90, 0, 180)
    let speedRight = pins.map(pitch, -90, 90, 0, 180)

    // Roll reduces the speed of the offside motor
    if (roll < 0) {
        speedRight = speedRight * (90 + roll) / 90
    }
    else if (roll > 0) {
        speedLeft = speedLeft * (90 - roll) / 90
    }

    pins.servoWritePin(AnalogPin.P1, 180 - speedLeft)
    pins.servoWritePin(AnalogPin.P2, speedRight)
})

radio.onReceivedValue(function (name: string, value: number) {
    switch (name) {
        case "pitch":
            pitch = value

        case "roll":
            roll = value
    }
})
