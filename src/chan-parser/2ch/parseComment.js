import parseAuthor from './parseAuthor'
import parseSubjectFromComment from './parseSubjectFromComment'
import parseAttachment from './parseAttachment'
import getInReplyToPosts from './getInReplyToPosts'

import expandStandaloneAttachmentLinks from '../expandStandaloneAttachmentLinks'
import removeNewLineCharacters from '../removeNewLineCharacters'
import parseYouTubeLinks from '../parseYouTubeLinks'
import parseCommentText from '../parseCommentText'
import unescapeContent from '../unescapeContent'
import filterComment from '../filterComment'

/**
 * Parses response thread JSON object.
 * @param  {object} thread — Response thread JSON object.
 * @param  {object} options — `{ correctGrammar, filters, defaultAuthor }`
 * @return {object}
 * @example
 * // Outputs:
 * // {
 * //   id: 45678,
 * //   author: 'Школьник №2',
 * //   content: ...,
 * //   inReplyTo: [
 * //     45677
 * //   ],
 * //   createdAt: ...,
 * //   attachments: [{
 * //     type: 'picture',
 * //     size: 35.5, // in kilobytes
 * //     picture: {
 * //       type: 'image/jpeg',
 * //       sizes: [{
 * //         width: 120,
 * //         height: 40,
 * //         url: 'https://...'
 * //       }, {
 * //         width: 1200,
 * //         height: 400,
 * //         url: 'https://...'
 * //       }]
 * //     }
 * //   }, {
 * //     type: 'video',
 * //     size: 5260.12, // in kilobytes
 * //     video: {
 * //       type: 'video/webm',
 * //       duration: 50, // in seconds
 * //       width: 800,
 * //       height: 600,
 * //       source: {
 * //         provider: 'file',
 * //         sizes: [{
 * //           width: 800,
 * //           height: 600,
 * //           url: 'https://...'
 * //         }]
 * //       },
 * //       picture: {
 * //         type: 'image/jpeg',
 * //         sizes: [{
 * //           width: 800,
 * //           height: 600,
 * //           url: 'https://...'
 * //         }]
 * //       }
 * //     }
 * //   }]
 * // }
 * parseComment(...)
 */
export default async function parseComment(post, {
	threadId,
	filters,
	correctGrammar,
	defaultAuthor,
	parseCommentTextPlugins,
	youTubeApiKey
}) {
	const id = post.num
	const author = parseAuthor(post.name, defaultAuthor)
	if (post.subject) {
		// Detect `subject` being autogenerated from `comment`.
		// If the `subject` is autogenerated then ignore it.
		if (isAutogeneratedSubject(post.subject, post.comment)) {
			post.subject = null
		}
	}
	// Sometimes users skip the subject field and
	// write the subject in bold as part of the post.
	if (post.comment && !post.subject) {
		const match = parseSubjectFromComment(post.comment)
		if (match) {
			post.subject = match.subject
			post.comment = match.comment
			// If the post subject is all caps then convert it to normal case.
			if (!/[а-я]/.test(post.subject) && /[А-Я]/.test(post.subject)) {
				post.subject = post.subject.toLowerCase().replace(/([а-я])/, _ => _.toUpperCase())
			}
		}
	}
	const comment = {
		id,
		inReplyTo: post.comment ? getInReplyToPosts(post.comment, { threadId }) : [],
		attachments: post.files.map(parseAttachment),
		createdAt: new Date(post.timestamp * 1000)
	}
	if (post.subject) {
		comment.subject = unescapeContent(post.subject)
	}
	if (post.comment) {
		// Sometimes there're some weird `\t` tabulation characters.
		// I guess they're of the same nature as `\r\n`s.
		post.comment = post.comment.replace(/\\t/g, '')
		comment.content = parseCommentText(post.comment, {
			parseParagraphs: false,
			correctGrammar,
			parseCommentTextPlugins
		})
	}
	if (filters) {
		const reason = filterComment(post.comment, filters)
		if (reason) {
			comment.hidden = true
			comment.hiddenReason = reason
		}
	}
	if (author) {
		comment.author = author
		const authorRole = post.trip === '!!%adm%!!' ? 'administrator' : post.trip === '!!%mod%!!' ? 'moderator' : undefined
		if (authorRole) {
			comment.authorRole = authorRole
		}
	}
	removeNewLineCharacters(comment)
	await parseYouTubeLinks(comment, { youTubeApiKey })
	// This should be the last one in the chain of comment transformations
	// because it splits text into paragraphs.
	expandStandaloneAttachmentLinks(comment)
	return comment
}

// Detect `subject` being autogenerated from `comment`.
function isAutogeneratedSubject(subject, comment) {
	// This is how `2ch.hk` autogenerates post subjects from content.
	const autogeneratedSubject = comment.replace(/<br>/g, ' ').replace(/<.+?>/g, '')
	return autogeneratedSubject.indexOf(subject) === 0
}