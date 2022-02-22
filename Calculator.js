export default class Calculator {
  constructor(
    primaryOperandDisplay,
    secondaryOperandDisplay,
    operationalDisplay
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay;
    this.#secondaryOperandDisplay = secondaryOperandDisplay;
    this.#operationalDisplay = operationalDisplay;
  }
  #primaryOperandDisplay;
  #secondaryOperandDisplay;
  #operationalDisplay;
  get primaryOperand() {
    return parseFloat(this.#primaryOperandDisplay.dataset.value);
  }

  get secondaryOperand() {
    return parseFloat(this.#secondaryOperandDisplay.dataset.value);
  }

  get operation() {
    return this.#operationalDisplay.textContent;
  }

  set primaryOperand(value) {
    this.#primaryOperandDisplay.dataset.value = value ?? "";
    this.#primaryOperandDisplay.textContent = displayNumber(value ?? "");
  }

  set secondaryOperand(value) {
    this.#secondaryOperandDisplay.dataset.value = value ?? "";
    this.#secondaryOperandDisplay.textContent = displayNumber(value ?? "");
  }
  set operation(value) {
    this.#operationalDisplay.textContent = value ?? "";
  }

  clear() {
    this.primaryOperand = 0;
    this.secondaryOperand = null;
    this.operation = null;
  }

  addDigit(digit) {
    if (
      digit === "." &&
      this.#primaryOperandDisplay.dataset.value.includes(".")
    )
      return;
    if (this.primaryOperand === 0) {
      this.primaryOperand = digit;
      return;
    }

    this.primaryOperand = this.#primaryOperandDisplay.dataset.value + digit;
  }
  removeDigit() {
    const numberString = this.#primaryOperandDisplay.dataset.value;
    if (numberString.length <= 1) {
      this.primaryOperand = 0;
      return;
    }

    this.primaryOperand = numberString.substring(0, numberString.length - 1);
  }
  chooseOperation(operation) {
    // console.log(operation);
    if (this.operation !== "") return;

    this.operation = operation;
    this.secondaryOperand = this.primaryOperand;
    this.primaryOperand = 0;
  }

  evaluate() {
    let result;
    switch (this.operation) {
      case "+":
        result = this.secondaryOperand + this.primaryOperand;
        break;
      case "-":
        result = this.secondaryOperand - this.primaryOperand;
        break;
      case "*":
        result = this.secondaryOperand * this.primaryOperand;
        break;
      case "÷":
        result = this.secondaryOperand / this.primaryOperand;
        break;
      default:
        return;
    }
    this.clear();
    this.primaryOperand = result;
    return result;
  }
}

const NUMBER__FIRMATTER = new Intl.NumberFormat("en");

function displayNumber(number) {
  const stringnumber = number?.toString() || "";
  if (stringnumber === "") return " ";
  const [integer, decimals] = stringnumber.split(".");
  const formattedInteger = NUMBER__FIRMATTER.format(integer);
  if (decimals == null) return formattedInteger;
  return formattedInteger + "." + decimals;
}
