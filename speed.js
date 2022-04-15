// Calculate speed from Microbit acceleration
// NOT CALIBRATED !

let averageAccelerationMss = 0
let averageAccelerationMilliGs = 0
let samples = 0
let totalAcceleration = 0
let endTime = 0
let speed = 0
let maxAccelerationMilligs = 0
let maxAccelerationMss = 0
let sampleTimeMs = 500

basic.forever(function () {
    while (true) {
        endTime = input.runningTime() + sampleTimeMs
        totalAcceleration = 0
        samples = 0

        // Average acceleration over `sampleTimeMs`
        while (input.runningTime() < endTime) {
            totalAcceleration += input.acceleration(Dimension.Strength) - 1024
            samples += 1
        }
        averageAccelerationMilliGs = totalAcceleration / samples

        // Convert to metres per second squared
        averageAccelerationMss = averageAccelerationMilliGs * 9.80665 / 1024

        // Record maximums
        maxAccelerationMilligs = Math.max(maxAccelerationMilligs, averageAccelerationMilliGs)
        maxAccelerationMss = Math.max(maxAccelerationMss, averageAccelerationMss)

        // Assuming a standing start and a constant acceleration in the same direction - horrible!
        // An improvement would be to calculate this in each of the three directions, but how deal with the microbit spinning in space?
        speed = averageAccelerationMs * sampleTimeMs / 1000 + speed
        basic.pause(100)
    }
})

input.onButtonPressed(Button.A, function () {
    basic.showNumber(maxAccelerationMs)
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(maxAccelerationMilligs)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(Math.floor(speed))
})
