import parseThread from './parseThread'

/**
 * Parses chan API response for thread comments list.
 * @param  {object} response — Chan API response for thread comments list
 * @param  {object} options
 * @return {object} See README.md for "Thread" object description.
 */
export default function parseThreadResponse(response, options) {
	const parsedThread = parseThread(response.threads[0], response.threads[0].posts, {
		...options,
		bumpLimit: response.bump_limit,
		maxCommentLength: response.max_comment,
		maxAttachmentsSize: response.max_files_size,
		defaultAuthorName: response.default_name,
		commentsCount: response.posts_count,
		commentAttachmentsCount: response.files_count,
		hasVoting: response.enable_likes === 1,
		hasFlags: response.enable_flags === 1,
		icons: response.enable_icons === 1 && response.icons && response.icons.reduce((icons, { name, num }) => {
			icons[name] = num
			return icons
		}, {})
	})
	// Only for `/res/THREAD-ID.json` API response.
	if (response.unique_posters) {
		parsedThread.uniquePostersCount = parseInt(response.unique_posters)
	}
	return parsedThread
}