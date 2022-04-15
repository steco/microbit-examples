// Remote control for robot.
// Roll (left and right) and Pitch (forward to back) are sent
// constantly via a radio connection to the robot
// Open/close commands sent when buttons pressed

let radioChannel = 2
let pitch = 0
let roll = 0
let displayX = 0
let displayY = 0
radio.setGroup(radioChannel)
basic.showNumber(radioChannel)
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

input.onButtonPressed(Button.A, function () {
    radio.sendValue("open", 0)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("close", 0)
})