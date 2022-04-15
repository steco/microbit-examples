// Driver for motorised robot.
//
// Roll (left to right) and Pitch (forward to back) values are received
// via a radio connection from the controller and used to control
// the speed of the motors. In addition, "open" and "close" commands
// are used to open/close a jaw attached to the robot

let pitch = 0
let roll = 0
let radioChannel = 2
let hideLed = false
radio.setGroup(radioChannel)
basic.showNumber(radioChannel)

basic.forever(function () {
    if(!hideLed)
    {
        let displayX = Math.round(pins.map(roll, -90, 90, 0, 4))
        let displayY = Math.round(pins.map(pitch, -90, 90, 0, 4))
        basic.clearScreen()
        led.plot(displayX, displayY)
    }

    // Assuming no roll (left-right) then set speed of both motors to the same
    let speedLeft = pins.map(pitch, -90, 90, -200, 200)
    let speedRight = pins.map(pitch, -90, 90, -200, 200)

    // Roll reduces the speed of the offside motor
    if (roll > 0) {
        speedRight = speedRight * (90 - roll) / 90
    }
    else if (roll < 0) {
        speedLeft = speedLeft * (90 + roll) / 90
    }

    kitronik_motor_driver.motorOn(
        kitronik_motor_driver.Motors.Motor1,
        speedLeft > 0 ? kitronik_motor_driver.MotorDirection.Reverse : kitronik_motor_driver.MotorDirection.Forward,
        Math.abs(speedLeft))
    kitronik_motor_driver.motorOn(
        kitronik_motor_driver.Motors.Motor2,
        speedRight > 0 ? kitronik_motor_driver.MotorDirection.Reverse : kitronik_motor_driver.MotorDirection.Forward,
        Math.abs(speedRight))
})

radio.onReceivedValue(function (name: string, value: number) {
    switch (name) {
        case "pitch":
            pitch = value
            break

        case "roll":
            roll = value
            break

        case "open":
            open()
            break

        case "close":
            close()
            break
    }
    
})

function open() {
    hideLed = true
    basic.showString("O")
    pins.servoWritePin(AnalogPin.P0, 0)
    basic.pause(500)
    hideLed = false
}

function close() {
    hideLed = true
    basic.showString("C")
    pins.servoWritePin(AnalogPin.P0, 90)
    basic.pause(500)
    hideLed = false
}

