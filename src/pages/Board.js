import React from 'react'
import PropTypes from 'prop-types'
import { goto, pushLocation, preload, meta } from 'react-website'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { getThreads, getComments } from '../redux/chan'
import { notify } from 'webapp-frontend/src/redux/notifications'
import { preloadStarted, preloadFinished } from 'webapp-frontend/src/redux/preload'
import { openSlideshow } from 'webapp-frontend/src/redux/slideshow'

import { getChan, addChanParameter } from '../chan'
import getMessages from '../messages'

import ThreadComment from '../components/ThreadComment'

import './Board.css'

@meta(({ chan: { board }}) => ({
	title: board && board.name,
	description: board && board.description
}))
@connect(({ app, chan }) => ({
	board: chan.board,
	threads: chan.threads,
	settings: app.settings,
	locale: app.settings.locale
}), {
	openSlideshow,
	preloadStarted,
	preloadFinished,
	getComments,
	pushLocation,
	goto,
	notify
})
@preload(async ({ getState, dispatch, params }) => {
	// Must be the same as the code inside `onBoardClick` in `components/Boards.js`.
	await dispatch(getThreads(
		params.board,
		getState().app.settings.filters,
		getState().app.settings.locale
	))
})
export default class BoardPage extends React.Component {
	static propTypes = {
		openSlideshow: PropTypes.func.isRequired,
		locale: PropTypes.string.isRequired
	}

	constructor() {
		super()
		this.onThreadClick = this.onThreadClick.bind(this)
	}

	async onThreadClick(comment, thread, board) {
		const {
			preloadStarted,
			preloadFinished,
			getComments,
			pushLocation,
			notify,
			settings,
			locale
		} = this.props
		try {
			preloadStarted()
			// Must be the same as the code inside `@preload()` in `pages/Thread.js`.
			await getComments(
				board.id,
				thread.id,
				settings.filters,
				locale
			)
			// Won't ever throw because `goto()` doesn't return a `Promise`.
			pushLocation(addChanParameter(this.getUrl(board, thread, comment)), { instantBack: true })
		} catch (error) {
			console.error(error)
			notify(getMessages(locale).loadingCommentsError, { type: 'error '})
		} finally {
			preloadFinished()
		}
	}

	getUrl = (board, thread, comment) => {
		return `/${board.id}/${thread.id}`
	}

	render() {
		const {
			board,
			threads,
			openSlideshow,
			locale
		} = this.props
		return (
			<section className="board-page content text-content">
				<h1 className="page__heading">
					{board.name}
				</h1>
				{getChan().id === '2ch' && board.id === 'd' &&
					<p className="board-page__api-bug-note">
						Данный раздел пуст из-за бага в <a href="https://2ch.hk/d/catalog.json" target="_blank">API Двача</a>.
					</p>
				}
				{threads && threads.map((thread) => (
					<ThreadComment
						key={thread.comments[0].id}
						mode="board"
						board={board}
						thread={thread}
						comment={thread.comments[0]}
						getUrl={this.getUrl}
						onClick={this.onThreadClick}
						openSlideshow={openSlideshow}
						locale={locale}/>
				))}
			</section>
		)
	}
}