const display = document.getElementById("display")
const buttons = document.querySelectorAll("button")
const clickSound = document.getElementById("clickSound")

const allowedKeys = [
  "0","1","2","3","4","5","6","7","8","9",
  ".","+","-","*","/","%","Enter","Backspace","Escape"
]

const operators = ["+","-","*","/","%"]

function playSound() {
    clickSound.currentTime = 0
    clickSound.play()
}

function handleInput(value) {
    playSound()

    if (value === "=" || value === "Enter") {
        try {
            if (display.value !== "") {
                display.value = eval(display.value)
            }
        } catch {
            display.value = "Error"
            setTimeout(() => display.value = "", 1000)
        }
        return
    }

    if (value === "AC" || value === "Escape") {
        display.value = ""
        return
    }

    if (value === "DEL" || value === "Backspace") {
        display.value = display.value.slice(0, -1)
        return
    }

    if (value === "%") {
        try {
            display.value = eval(display.value) / 100
        } catch {
            display.value = ""
        }
        return
    }

    const lastChar = display.value.slice(-1)

    if (operators.includes(lastChar) && operators.includes(value)) return
    if (display.value === "" && operators.includes(value)) return
    if (display.value.length >= 15) return

    display.value += value
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.dataset.value)
    })
})

document.addEventListener("keydown", e => {
    if (allowedKeys.includes(e.key)) {
        e.preventDefault()
        handleInput(e.key)
    }
})
