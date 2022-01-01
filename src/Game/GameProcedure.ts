import Game from './GameInterface'
import { promptSelect, printLine } from '../Utility/Utility'
import { gameTitles, GameTitle, GameStore } from '../Model/GameTitle'
import { NextAction, nextActions } from '../Model/NextAction'

export default class GameProcedure {
	private currentGameTitle: GameTitle | '' = ''
	private currentGame: Game | null = null

	constructor(private readonly gameStore: GameStore){
	}

	public async start() {
		await this.select()
		await this.play()
	}

	private async select() {
		this.currentGameTitle = await promptSelect<GameTitle>('ゲームのタイトルを入力してください', gameTitles)
		this.currentGame = this.gameStore[this.currentGameTitle]
	}

	private async play() {
		if (!this.currentGame) throw new Error('ゲームが選択されていません')

		printLine(`===\n${this.currentGameTitle}を開始します\n===`)
		await this.currentGame.setting()
		await this.currentGame.play()
		this.currentGame.end()

		const action = await promptSelect<NextAction>('ゲームを続けますか？', nextActions)
		if (action === 'play again') {
			await this.play()
		} else if (action === 'change game') {
			await this.select()
			await this.play()
		} else if (action == 'exit'){
			this.end()
		} else {
			const neverValue: never = action
			throw new Error(`${neverValue} is an invalid action`)
		}
	}

	private end() {
		printLine('ゲームを終了しました')
		process.exit()
	}
}