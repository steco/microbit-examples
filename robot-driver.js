// Driver for motorised robot.
// Roll (left and right) and Pitch (forward to back) are received
// via a radio connection from the controller and used to controller
// the speed of the motors

let pitch = 0
let roll = 0
radio.setGroup(1)

basic.forever(function () {
    let displayX = Math.round(pins.map(roll, -90, 90, 0, 4))
    let displayY = Math.round(pins.map(pitch, -90, 90, 0, 4))
    basic.clearScreen()
    led.plot(displayX, displayY)

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

        case "roll":
            roll = value
    }
})
