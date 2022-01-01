export default interface Game {
	setting(): Promise<void>
	play(): Promise<void>
	end(): void
}