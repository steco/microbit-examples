/**
 * Defines a custom function showSignal which plots the signal
 * strength from the radio receiver using all the pixels on the display.
 * The return value indicates if the signal is above a certain threshold, allowing
 * the caller to run custom 'found' logic.
 */

//% weight=100 color=#0fbc11 icon="\uf1ec" 
namespace Display {
    /**
     * Display a radio signal level on the LED display
     * @param signal the radio signal level
     * @return whether the beacon has been found
     */
    //% block
    export function showSignal(signal: number): boolean {
        // Signal is -128 to -42, range of 86
        // We have 5*5 leds, 25 in total

        let leds: number
        // First convert to 0-86
        leds = signal + 128

        // Then divide by three so range is 0-28.33
        leds = Math.floor(leds / 3)

        // Switch on the leds starting at the bottom left
        // This covers the range from 0-25
        basic.clearScreen()
        for (let draw: number = 0; draw < leds; draw++) {
            led.plot(draw - Math.floor(draw / 5) * 5, 4 - draw / 5)
        }

        if (leds > 24) {
            // To handle 25 to 28.33, increase the brightness
            // from 128 to 255 in steps of 32
            led.setBrightness(128 + (leds - 24) * 32)

            // Indicate we are close enough to the transmitter
            return true
        }
        else {
            led.setBrightness(128)

            // To far away
            return false
        }
    }

    /**
     * Display a directional line on the display
     * @param direction the direction to draw the line
     * 0-15 where 0 is upwards and moving clockwise
     */
    //% block
    export function drawArrow(direction: number) {

        let xData = [2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 0, 0, 1]
        let yData = [0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0]

        let x : number = xData[direction]
        let y : number = yData[direction]

        basic.clearScreen()

        // Centre
        led.plotBrightness(2,2, 255);

        // Intermediate
        let xI = (x + 2) / 2
        let yI = (y + 2) / 2

        led.plotBrightness(xI, yI, 255)

        // Edge
        led.plotBrightness(x, y, 255)
    }
}
