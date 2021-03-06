import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import PostTitle from 'webapp-frontend/src/components/PostTitle'
import PostContent from 'webapp-frontend/src/components/PostContent'
import PostAttachments from 'webapp-frontend/src/components/PostAttachments'
import PostStretchVertically from 'webapp-frontend/src/components/PostStretchVertically'

import TextSelectionTooltip from 'webapp-frontend/src/components/TextSelectionTooltip'
import Button from 'webapp-frontend/src/components/Button'

import CommentAuthor, { hasAuthor } from './CommentAuthor'
import CommentStatusBadges from './CommentStatusBadges'
import CommentHidden from './CommentHidden'
import CommentFooter from './CommentFooter' // , { hasReplies }
import CommentWithThumbnail from './CommentWithThumbnail'

import useVote from './useVote'
import useSlideshow from './useSlideshow'
import useSocial from './useSocial'
import usePostLink from './usePostLink'

import getMessages from '../../messages'
import { getChan } from '../../chan'
import { getResourceMessages } from '../../utility/loadResourceLinks'
import getCommentLengthLimit from '../../utility/getCommentLengthLimit'
import getUrl from '../../utility/getUrl'
import configuration from '../../configuration'

import { isMiddleDialogueChainLink } from 'webapp-frontend/src/components/CommentTree'

import ArhivachIcon from '../../../assets/images/icons/services/arhivach.svg'

import './Comment.css'

window.SHOW_POST_HEADER = false
// window.POST_FULL_WIDTH = true

export default function Comment({
	mode,
	comment,
	thread,
	board,
	showingReplies,
	onToggleShowReplies,
	toggleShowRepliesButtonRef,
	onShowComment,
	parentComment,
	postRef,
	dispatch,
	locale,
	compact,
	screenWidth,
	expandAttachments,
	onReply,
	onPostUrlClick,
	urlBasePath,
	previouslyRead,
	className,
	// <OnLongPress/> stuff:
	onTouchStart,
	onTouchEnd,
	onTouchMove,
	onTouchCancel,
	onDragStart,
	onMouseDown,
	onMouseUp,
	onMouseMove,
	onMouseLeave,
	// "Reply on double click" stuff:
	onDoubleClick,
	// <CommentTitleContentAndAttachments/> props:
	...rest
}) {
	const isFirstCommentInThread = comment.id === thread.id
	const url = getUrl(board, thread, comment)
	if (compact === undefined) {
		compact = mode === 'thread' && !isFirstCommentInThread
	}

	const [
		vote,
		onVote
	] = useVote({
		board,
		thread,
		comment,
		locale
	})

	const [hidden, setHidden] = useState(comment.hidden)
	const toggleShowHide = useCallback(
		() => setHidden(!hidden),
		[hidden]
	)

	const [
		onPostLinkClick,
		isPostLinkClickable
	] = usePostLink({
		board,
		thread,
		comment,
		onShowComment
	})

	const [onAttachmentClick] = useSlideshow({ comment })

	const [
		isSocialClickable,
		onSocialClick
	] = useSocial()

	const [clickedPostUrl, setClickedPostUrl] = useState()
	// `<Post/>` automatically passes a second argument `post` here,
	// but because `<PostSelfLink/>` is used directly here,
	// it doesn't add that second `post` argument "under the hood",
	// so instead it's passed to `onPostUrlClick()` explicitly
	// from the `comment` property.
	const _onPostUrlClick = useCallback((event) => {
		if (onPostUrlClick) {
			onPostUrlClick(event, comment)
		}
		setClickedPostUrl(true)
	}, [
		comment,
		onPostUrlClick,
		setClickedPostUrl
	])

	const shouldFixAttachmentPictureSize = mode === 'board' &&
		comment.attachments &&
		comment.attachments.length === 1 &&
		comment.attachments[0].isLynxChanCatalogAttachmentsBug

	const onShowReplies = hasReplies(comment, parentComment) ? onToggleShowReplies : undefined

	const showPostThumbnailWhenThereAreMultipleAttachments = mode === 'board' ||
		(mode === 'thread' && isFirstCommentInThread)
	const showPostThumbnailWhenThereIsNoContent = mode === 'board'

	const commentClassName = 'Comment-comment'

	// `postRef` is supplied by `<CommentTree/>`
	// and is used to focus stuff on toggle reply form.
	const commentElement = hidden ? (
		<CommentHidden
			comment={comment}
			locale={locale}
			onShow={toggleShowHide}
			className={commentClassName}/>
	) : (
		<div className="Comment-exceptThumbnail">
			<CommentAuthor
				post={comment}
				locale={locale}/>
			<div className={commentClassName}>
				<CommentTitleContentAndAttachments
					{...rest}
					comment={comment}
					expandAttachments={expandAttachments}
					onlyShowFirstAttachmentThumbnail={mode === 'board'}
					locale={locale}
					messages={getMessages(locale).post}
					onReply={onReply}
					resourceMessages={getResourceMessages(getMessages(locale))}
					useSmallestThumbnailsForAttachments
					serviceIcons={SERVICE_ICONS}
					youTubeApiKey={configuration.youtubeApiKey}
					expandFirstPictureOrVideo={false}
					maxAttachmentThumbnails={false}
					contentMaxLength={getCommentLengthLimit(mode)}
					onAttachmentClick={onAttachmentClick}
					onPostLinkClick={onPostLinkClick}
					isPostLinkClickable={isPostLinkClickable}
					isSocialClickable={isSocialClickable}
					onSocialClick={onSocialClick}
					url={url}
					fixAttachmentPictureSizes={shouldFixAttachmentPictureSize}
					showPostThumbnailWhenThereAreMultipleAttachments={showPostThumbnailWhenThereAreMultipleAttachments}
					showPostThumbnailWhenThereIsNoContent={showPostThumbnailWhenThereIsNoContent}/>
			</div>
			<CommentFooter
				comment={comment}
				thread={thread}
				board={board}
				parentComment={parentComment}
				showingReplies={showingReplies}
				onShowReplies={onShowReplies}
				onToggleShowReplies={onToggleShowReplies}
				toggleShowRepliesButtonRef={toggleShowRepliesButtonRef}
				locale={locale}
				dispatch={dispatch}
				url={url}
				urlBasePath={urlBasePath}
				onPostUrlClick={_onPostUrlClick}
				mode={mode}
				onReply={onReply}
				vote={vote}
				onVote={onVote}/>
		</div>
	)
	return (
		<CommentWithThumbnail
			ref={postRef}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
			onTouchMove={onTouchMove}
			onTouchCancel={onTouchCancel}
			onDragStart={onDragStart}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
			onDoubleClick={onDoubleClick}
			mode={mode}
			comment={comment}
			thread={thread}
			hidden={hidden}
			locale={locale}
			onReply={onReply}
			expandAttachments={expandAttachments}
			onAttachmentClick={onAttachmentClick}
			shouldFixAttachmentPictureSize={shouldFixAttachmentPictureSize}
			showPostThumbnailWhenThereAreMultipleAttachments={showPostThumbnailWhenThereAreMultipleAttachments}
			showPostThumbnailWhenThereIsNoContent={showPostThumbnailWhenThereIsNoContent}
			className={classNames(className, 'Comment', `Comment--${mode}`, {
				'Comment--compact': compact,
				'Comment--hidden': hidden,
				'Comment--titled': comment.title,
				'Comment--authored': hasAuthor(comment),
				'Comment--opening': mode === 'thread' && comment.id === thread.id,
				'Comment--showHeader': window.SHOW_POST_HEADER,
				'Comment--fullWidth': window.POST_FULL_WIDTH,
				'Comment--last': thread.comments[thread.comments.length - 1].id === comment.id,
				'Comment--previouslyRead': previouslyRead ? !showingReplies && !parentComment && !clickedPostUrl && previouslyRead(comment.id) : undefined
			})}>
			{commentElement}
		</CommentWithThumbnail>
	)
}

Comment.propTypes = {
	compact: PropTypes.bool,
	mode: PropTypes.oneOf(['board', 'thread']).isRequired,
	comment: commentType.isRequired,
	thread: threadType.isRequired,
	board: boardType.isRequired,
	expandAttachments: PropTypes.bool,
	locale: PropTypes.string.isRequired,
	parentComment: commentType,
	previouslyRead: PropTypes.func,
	showingReplies: PropTypes.bool,
	onToggleShowReplies: PropTypes.func,
	toggleShowRepliesButtonRef: PropTypes.any,
	// `postRef` is supplied by `<CommentTree/>`
	// and is used to focus stuff on toggle reply form.
	postRef: PropTypes.any,
	onPostUrlClick: PropTypes.func,
	onShowComment: PropTypes.func.isRequired,
	urlBasePath: PropTypes.string.isRequired,
	onReply: PropTypes.func,
	dispatch: PropTypes.func,
	className: PropTypes.string
}

const SERVICE_ICONS = {
	'arhivach': ArhivachIcon,
	'2ch': getChan('2ch').logo,
	'4chan': getChan('4chan').logo
}

function hasReplies(comment, parentComment) {
	return comment.replies && !(parentComment && isMiddleDialogueChainLink(comment, parentComment))
}

function CommentTitleContentAndAttachments({
	comment,
	initialExpandContent,
	onExpandContent,
	initialExpandPostLinkQuotes,
	onContentDidChange,
	youTubeApiKey,
	onPostContentChange,
	contentMaxLength,
	resourceMessages,
	fixAttachmentPictureSizes,
	expandFirstPictureOrVideo,
	expandAttachments,
	attachmentThumbnailSize,
	useSmallestThumbnailsForAttachments,
	serviceIcons,
	onAttachmentClick,
	onPostLinkClick,
	isPostLinkClickable,
	isSocialClickable,
	onSocialClick,
	expandPostLinkBlockQuotes,
	postLinkQuoteMinimizedComponent,
	postLinkQuoteExpandTimeout,
	onPostLinkQuoteExpand,
	url,
	locale,
	messages,
	onReply,
	showPostThumbnailWhenThereAreMultipleAttachments,
	showPostThumbnailWhenThereIsNoContent,
	maxAttachmentThumbnails,
	onlyShowFirstAttachmentThumbnail
}) {
	const tooltipProps = useMemo(() => ({
		onReply,
		children: messages.reply
	}), [
		onReply,
		messages
	])
	let titleAndContent = (
		<React.Fragment>
			<PostTitle post={comment}/>
			<PostContent
				post={comment}
				initialExpandContent={initialExpandContent}
				onExpandContent={onExpandContent}
				initialExpandPostLinkQuotes={initialExpandPostLinkQuotes}
				onContentDidChange={onContentDidChange}
				youTubeApiKey={youTubeApiKey}
				onPostContentChange={onPostContentChange}
				contentMaxLength={contentMaxLength}
				resourceMessages={resourceMessages}
				fixAttachmentPictureSizes={fixAttachmentPictureSizes}
				expandFirstPictureOrVideo={expandFirstPictureOrVideo}
				expandAttachments={expandAttachments}
				attachmentThumbnailSize={attachmentThumbnailSize}
				useSmallestThumbnailsForAttachments={useSmallestThumbnailsForAttachments}
				serviceIcons={serviceIcons}
				onAttachmentClick={onAttachmentClick}
				onPostLinkClick={onPostLinkClick}
				isPostLinkClickable={isPostLinkClickable}
				isSocialClickable={isSocialClickable}
				onSocialClick={onSocialClick}
				expandPostLinkBlockQuotes={expandPostLinkBlockQuotes}
				postLinkQuoteMinimizedComponent={postLinkQuoteMinimizedComponent}
				postLinkQuoteExpandTimeout={postLinkQuoteExpandTimeout}
				onPostLinkQuoteExpand={onPostLinkQuoteExpand}
				url={url}
				locale={locale}
				messages={messages}/>
		</React.Fragment>
	)
	if (onReply) {
		titleAndContent = (
			<TextSelectionTooltip
				TooltipComponent={TextSelectionTooltipComponent}
				tooltipProps={tooltipProps}>
				{titleAndContent}
			</TextSelectionTooltip>
		)
	}
	return (
		<React.Fragment>
			{titleAndContent}
			<PostAttachments
				post={comment}
				showPostThumbnailWhenThereAreMultipleAttachments={showPostThumbnailWhenThereAreMultipleAttachments}
				showPostThumbnailWhenThereIsNoContent={showPostThumbnailWhenThereIsNoContent}
				expandFirstPictureOrVideo={expandFirstPictureOrVideo}
				useSmallestThumbnails={useSmallestThumbnailsForAttachments}
				maxAttachmentThumbnails={maxAttachmentThumbnails}
				attachmentThumbnailSize={attachmentThumbnailSize}
				expandAttachments={expandAttachments}
				onlyShowFirstAttachmentThumbnail={onlyShowFirstAttachmentThumbnail}
				spoilerLabel={messages.spoiler}
				onAttachmentClick={onAttachmentClick}/>
			<PostStretchVertically/>
		</React.Fragment>
	)
}

function TextSelectionTooltipComponent({
	selection,
	onReply,
	children,
	...rest
}, ref) {
	const onClick = () => {
		onReply(selection.getText())
		selection.clear()
	}
	return (
		<Button
			ref={ref}
			{...rest}
			type="button"
			onClick={onClick}
			className="Comment-textSelectionTooltip">
			{children}
		</Button>
	)
}

TextSelectionTooltipComponent = React.forwardRef(TextSelectionTooltipComponent)

TextSelectionTooltipComponent.propTypes = {
	selection: PropTypes.object.isRequired,
	onReply: PropTypes.func.isRequired
}