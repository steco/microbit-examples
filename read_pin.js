radio.setGroup(1)
basic.forever(() => {
    led.plotBarGraph(
    pins.analogReadPin(AnalogPin.P0),
    1023
    )
    radio.sendNumber(pins.analogReadPin(AnalogPin.P0))
})
