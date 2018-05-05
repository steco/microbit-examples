/**
 * Define a custom function showSignal which plots the signal
 * strength from the radio receiver using all the pixels on the display.
 * It also returns 1 if the signal of above a certain threshold, allowing
 * the caller to run some kind of 'found' logic.
 */

//% weight=100 color=#0fbc11 icon="\uf1ec" 
namespace SignalDisplay {
    /**
     * Display a radio signal level on the LED display
     * @param signal the radio signal level
     * @return whether the beacon has been found
     */
    //% block
    export function showSignal(signal: number): number {
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

            return 1
        }
        else {
            led.setBrightness(128)

            return 0
        }
    }
}
