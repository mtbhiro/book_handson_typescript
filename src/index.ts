import Game from './Game/GameInterface'
import GameProcedure from './Game/GameProcedure'
import HitAndBrow from './Game/HitAndBrow'
import Janken from './Game/Janken'
import { promptInput } from './Utility/Utility';

;(async () => {
	const name = await promptInput("名前を入力してください")
	console.log(name)
	const age = await promptInput("年齢を入力してください")
	console.log(age)
	new GameProcedure({
		'hit and blow': new HitAndBrow(),
		'janken': new Janken()
	}).start()
})()