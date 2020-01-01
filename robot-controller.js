// Remote control for robot.
// Roll (left and right) and Pitch (forward to back) are sent
// separately via a radio connection to the robot

let pitch = 0
let roll = 0
let displayX = 0
let displayY = 0
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    displayX = Math.round(pins.map(roll, -90, 90, 0, 4))
    displayY = Math.round(pins.map(pitch, -90, 90, 0, 4))
    basic.clearScreen()
    led.plot(displayX, displayY)

    radio.sendValue("pitch", pitch)
    radio.sendValue("roll", roll)
})
