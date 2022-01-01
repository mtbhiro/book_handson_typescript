import Game from "./GameInterface"
import { promptSelect, promptInput, printLine } from "../Utility/Utility"
import { Mode } from "../Model/Mode"

export default class HitAndBrow implements Game {
  private readonly answerSource: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]
  private answer: string[] = []
  private tryCount: number = 0
  private mode: Mode = "normal"

  async setting() {
    this.mode = await promptSelect<Mode>("モードを入力してください", [
      "normal",
      "hard",
    ])
    const answerLength = this.getAnswerLength()
    while (this.answer.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length)
      const selectedItem = this.answerSource[randNum]
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem)
      }
    }
  }

  async play() {
    const inputString = await promptInput(
      `「,」区切りで${this.getAnswerLength()}つの数字を入力してください`
    )
    const inputArr = inputString.split(",")
    if (!this.validate(inputArr)) {
      printLine(`---\n入力された文字列が不適切です`)
      await this.play()
      return
    }
    const result = this.check(inputArr)

    if (result.hit !== this.answer.length) {
      printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`)
      this.tryCount += 1
      await this.play()
    } else {
      this.tryCount += 1
    }
  }

  end() {
    printLine(`正解です! \n試行回数: ${this.tryCount}回`)
    this.reset()
  }

  private reset() {
    this.answer = []
    this.tryCount = 0
  }

  private validate(inputArr: string[]): boolean {
    const isLengthValid = inputArr.length === this.answer.length
    const isAllAnswerSourceOption = inputArr.every((value) =>
      this.answerSource.includes(value)
    )
    const isAllDifferentValues = inputArr.every(
      (value, index) => inputArr.indexOf(value) === index
    )
    return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues
  }

  private check(input: string[]): { hit: number; blow: number } {
    let hitCount = 0
    let blowCount = 0

    input.forEach((value, index) => {
      if (value === this.answer[index]) {
        hitCount += 1
      } else if (this.answer.includes(value)) {
        blowCount += 1
      }
    })

    return {
      hit: hitCount,
      blow: blowCount,
    }
  }

  private getAnswerLength(): number {
    switch (this.mode) {
      case "normal":
        return 3
      case "hard":
        return 4
      default:
        const neverValue: never = this.mode
        throw new Error(`${neverValue}は無効なモードです`)
    }
  }
}
