import Chan from './Chan'
import addCommentProps from './utility/addCommentProps'
import configuration from '../configuration'
import UserData from '../UserData/UserData'
import getMessages from './utility/getMessages'
import getCommentLengthLimit from '../utility/getCommentLengthLimit'

export default async function getThreads({
	boardId,
	censoredWords,
	messages,
	http
}) {
	const chan = Chan({ censoredWords, messages, http })
	const threads = await chan.getThreads({
		boardId
	}, {
		// The parser parses thread comments up to 4x faster without parsing their content.
		// Example: when parsing comments content — 650 ms, when not parsing comments content — 200 ms.
		parseContent: false,
		// Add `.parseContent()` function to each `comment`.
		addParseContent: true,
		commentLengthLimit: getCommentLengthLimit('board')
	})
	const votes = UserData.getCommentVotes(boardId)
	for (const thread of threads) {
		addCommentProps(thread, {
			mode: 'board',
			votes: votes[thread.id] || {},
			messages
		})
		const comment = thread.comments[0]
		// Set `comment.boardId` for "is tracked thread" comment header badge.
		comment.boardId = boardId
	}
	return threads
}