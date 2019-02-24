import parseComment from './parseComment'
import constructThread from '../constructThread'

/**
 * Parses 2ch.hk thread JSON object.
 * @param  {object} thread — 2ch.hk thread JSON object.
 * @param  {object} options
 * @return {object}
 * @example
 * // Outputs:
 * // {
 * //   id: 12345,
 * //   boardId: 'b',
 * //   author: 'Школьник',
 * //   isClosed: false,
 * //   isEndless: false, // "endless" threads don't disappear.
 * //   isSticky: false,
 * //   comments: [{
 * //     commentsCount: 18,
 * //     id: '45678',
 * //     author: 'Школьник №2',
 * //     content: ...,
 * //     inReplyTo: [
 * //       45677
 * //     ],
 * //     createdAt: ...,
 * //     attachments: [{
 * //       id: 1,
 * //       type: 'picture',
 * //       size: 35.5, // in kilobytes
 * //       picture: {
 * //         type: 'image/jpeg',
 * //         sizes: [{
 * //           width: 120,
 * //           height: 40,
 * //           url: 'https://...'
 * //         }, {
 * //           width: 1200,
 * //           height: 400,
 * //           url: 'https://...'
 * //         }]
 * //       }
 * //     }, {
 * //       id: 2,
 * //       type: 'video',
 * //       size: 5260.12, // in kilobytes
 * //       video: {
 * //         type: 'video/webm',
 * //         duration: 50, // in seconds
 * //         width: 800,
 * //         height: 600,
 * //         source: {
 * //           provider: 'file',
 * //           sizes: [{
 * //             width: 800,
 * //             height: 600,
 * //             url: 'https://...'
 * //           }]
 * //         },
 * //         picture: {
 * //           type: 'image/jpeg',
 * //           sizes: [{
 * //             width: 800,
 * //             height: 600,
 * //             url: 'https://...'
 * //           }]
 * //         }
 * //       }
 * //     }]
 * //   }
 * // }]
 * parseThread(...)
 */
export default async function parseThread(thread, {
	boardId,
	filters,
	parseCommentTextPlugins,
	youTubeApiKey,
	messages
}) {
	const comment = await parseComment(thread, {
		boardId,
		threadId: thread.no,
		filters,
		parseCommentTextPlugins,
		youTubeApiKey,
		messages
	})
	return constructThread(
		thread.replies,
		thread.images,
		comment,
		thread.closed === 1,
		thread.endless === 1,
		thread.sticky === 1
	)
}