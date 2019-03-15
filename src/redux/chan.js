import { ReduxModule } from 'react-website'

import configuration from '../configuration'
import { getChan } from '../chan'
import getMessages from '../messages'
import getUrl from '../utility/getUrl'

import { Parser as TwoChannelParser, BOARDS_RESPONSE_EXAMPLE as TWO_CHANNEL_BOARDS_RESPONSE_EXAMPLE } from '../chan-parser/2ch'
import { Parser as FourChanParser } from '../chan-parser/4chan'
import groupBoardsByCategory from '../chan-parser/groupBoardsByCategory'

const redux = new ReduxModule()

export const getBoards = redux.action(
	() => async http => {
		// Most chans don't provide `/boards.json` API
		// so their boards list is defined as a static one in JSON configuration.
		if (getChan().boards) {
			return {
				boards: getChan().boards,
				boardsByCategory: groupBoardsByCategory(getChan().boards)
			}
		}
		const apiRequestStartedAt = Date.now()
		let response
		// Development process optimization.
		// (public CORS proxies introduce delays)
		if (process.env.NODE_ENV !== 'production' && getBoardsResponseExample(getChan().id)) {
			response = getBoardsResponseExample(getChan().id)
		} else {
			response = await http.get(proxyUrl(addOrigin(getChan().boardsUrl)))
		}
		console.log(`Get boards API request finished in ${(Date.now() - apiRequestStartedAt) / 1000} secs`)
		const {
			boards,
			boardsByPopularity,
			boardsByCategory
		} = createParser({}).parseBoards(response)
		return {
			boards,
			boardsByPopularity,
			boardsByCategory
		}
	},
	(state, result) => ({
		...state,
		...result
	})
)

export const getThreads = redux.action(
	(boardId, filters, locale) => async http => {
		const apiRequestStartedAt = Date.now()
		const response = await http.get(proxyUrl(
			addOrigin(getChan().threadsUrl).replace('{boardId}', boardId)
		))
		console.log(`Get threads API request finished in ${(Date.now() - apiRequestStartedAt) / 1000} secs`)
		const startedAt = Date.now()
		const threads = createParser({ filters, locale }).parseThreads(response, { boardId })
		console.log(`Threads parsed in ${(Date.now() - startedAt) / 1000} secs`)
		for (const thread of threads) {
			thread.comments[0].commentsCount = thread.commentsCount
			thread.comments[0].attachmentsCount = thread.attachmentsCount
		}
		return {
			boardId,
			threads
		}
	},
	(state, { threads, boardId }) => ({
		...state,
		board: state.boards.find(_ => _.id === boardId),
		threads
	})
)

export const getThread = redux.action(
	(boardId, threadId, filters, locale) => async http => {
		const apiRequestStartedAt = Date.now()
		const response = await http.get(proxyUrl(
			addOrigin(getChan().commentsUrl).replace('{boardId}', boardId).replace('{threadId}', threadId)
		))
		console.log(`Get thread API request finished in ${(Date.now() - apiRequestStartedAt) / 1000} secs`)
		const startedAt = Date.now()
		const thread = createParser({ filters, locale }).parseThread(response, { boardId })
		console.log(`Thread parsed in ${(Date.now() - startedAt) / 1000} secs`)
		// Move thread subject from the first comment to the thread object.
		const subject = thread.comments[0].title
		if (subject) {
			thread.comments[0].title = undefined
		}
		return {
			boardId,
			thread: {
				...thread,
				subject
			}
		}
	},
	(state, { boardId, thread }) => {
		const board = state.boards.find(_ => _.id === boardId)
		// 2ch.hk doesn't specify the limits in board settings themselves.
		// Instead, it returns the limits as part of "get thread" API response.
		if (thread.maxCommentLength) {
			// Maximum allowed comment length.
			board.maxCommentLength = thread.maxCommentLength
			delete thread.maxCommentLength
			// Maximum allowed attachments size.
			board.maxAttachmentsSize = thread.maxAttachmentsSize
			delete thread.maxAttachmentsSize
		}
		return {
			...state,
			board,
			thread
		}
	}
)

export default redux.reducer()

function createParser({ filters, locale }) {
	const Parser = getParser()
	return new Parser({
		...getChan().parserOptions,
		filters,
		commentLengthLimit: 700,
		messages: locale ? getMessages(locale) : undefined,
		useRelativeUrls: shouldUseRelativeUrls(),
		getUrl
	})
}

function shouldUseRelativeUrls() {
	if (typeof window !== 'undefined') {
		const domain = window.location.hostname
		if (getChan().domains) {
			if (getChan().domains.includes(domain)) {
				return true
			}
		}
	}
	return false
}

function proxyUrl(url) {
	if (!getChan().proxy) {
		return url
	}
	if (getChan().proxy.aws) {
		if (configuration.corsProxyUrlAws) {
			return configuration.corsProxyUrlAws.replace('{url}', url)
		}
	}
	if (configuration.corsProxyUrl) {
		return configuration.corsProxyUrl.replace('{url}', url)
	}
	return url
}

function getParser() {
	switch (getChan().parser) {
		case '2ch':
			return TwoChannelParser
		case '4chan':
			return FourChanParser
		default:
			throw new Error(`Unknown chan parser: "${getChan().parser}"`)
	}
}

function getBoardsResponseExample(chan) {
	switch (chan) {
		case '2ch':
			return TWO_CHANNEL_BOARDS_RESPONSE_EXAMPLE
	}
}

/**
 * Adds HTTP origin to a possibly relative URL.
 * For example, if this application is deployed on 2ch.hk domain
 * then there's no need to query `https://2ch.hk/...` URLs
 * and instead relative URLs `/...` should be queried.
 * This function checks whether the application should use
 * relative URLs and transforms the URL accordingly.
 */
function addOrigin(url) {
	if (url[0] === '/') {
		if (!shouldUseRelativeUrls(url)) {
			url = getChan().website + url
		}
	}
	return url
}