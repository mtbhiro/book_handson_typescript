import Game from '../Game/GameInterface'

export const gameTitles = ['hit and blow', 'janken'] as const

export type GameTitle = typeof gameTitles[number]

export type GameStore = {
	[key in GameTitle]: Game
}