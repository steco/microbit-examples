let tummy = 0
input.onButtonPressed(Button.A, () => {
    tummy = tummy + 3
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, () => {
    basic.showIcon(IconNames.SmallHeart)
})
basic.showIcon(IconNames.Giraffe)
tummy = 5
basic.forever(() => {
    basic.pause(1000)
    tummy = tummy - 1
    if (tummy < 0) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Giraffe)
    }
})
