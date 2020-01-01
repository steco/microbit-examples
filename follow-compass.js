// Simple application uses the compass to draw route directions 
// on the display.  Each time buttonA is pressed the route advances one step

let item = 0
let route: number[] = []
input.onButtonPressed(Button.A, () => {
    item = item + 1
    if (item >= route.length) {
        basic.showIcon(IconNames.Heart)
    } else {
        Display.drawArrow(route[item])
    }
})
input.onButtonPressed(Button.AB, () => {
    input.calibrateCompass()
})
route = [0, 4, 8, 12]
item = -1
