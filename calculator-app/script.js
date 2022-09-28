class Calulator {
    constructor(previousOperandOutput, currentOperandOutput) {
        this.previousOperandOutput = previousOperandOutput
        this.currentOperandOutput = currentOperandOutput
        this.clearAll()
    }

    clearAll() {
        // new vairables
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (number === '.' && this.currentOperand === '') {
            this.currentOperand = 0
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.calculateResult()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.previousOperand = this.previousOperand.toString() + operation.toString()  // appending the operation icon
        this.currentOperand = ''
    }

    calculateResult() {
        let result
        let previousNumber = parseFloat(this.previousOperand)
        let currentNumber = parseFloat(this.currentOperand)
        if (isNaN(previousNumber) || isNaN(currentNumber)) return
        switch (this.operation) {
            case '+':
                result = previousNumber + currentNumber
                break;
            case '-':
                result = previousNumber - currentNumber
                break;
            case 'x':
                result = previousNumber * currentNumber
                break;
            case '/':
                result = previousNumber / currentNumber
                break;
            default:
                return
        }
        this.currentOperand = result.toFixed(2)
        this.operation = undefined
        this.previousOperand = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    updateDisplay() {
        this.currentOperandOutput.innerText = this.currentOperand
        this.previousOperandOutput.innerText = this.previousOperand

    }
}

const numberKeys = document.querySelectorAll('.key-numbers')
const operationKeys = document.querySelectorAll('.key-operations')
const allClearKey = document.querySelector('.key-all-clear')
const deleteKey = document.querySelector('.key-delete')
const equalsToKey = document.querySelector('.key-equals-to')

// selecting output elements
const previousOperandOutput = document.querySelector('.previous-operand')
const currentOperandOutput = document.querySelector('.current-operand')

const calculator = new Calulator(previousOperandOutput, currentOperandOutput)

numberKeys.forEach(key => {
    key.addEventListener('click', () => {
        calculator.appendNumber(key.innerText)
        calculator.updateDisplay()
    })
})

operationKeys.forEach(key => {
    key.addEventListener('click', () => {
        calculator.chooseOperation(key.innerText)
        calculator.updateDisplay()
    })
})

equalsToKey.addEventListener('click', () => {
    calculator.calculateResult()
    calculator.updateDisplay()
})

allClearKey.addEventListener('click', () => {
    calculator.clearAll()
    calculator.updateDisplay()
})

deleteKey.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})