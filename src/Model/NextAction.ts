export const nextActions = ["play again", "change game", "exit"] as const
export type NextAction = typeof nextActions[number]
