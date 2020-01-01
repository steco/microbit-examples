let item = 0
basic.forever(() => {
    item = input.rotation(Rotation.Pitch)
    Display.show((item + 90) / 7)
    music.ringTone(item)
})