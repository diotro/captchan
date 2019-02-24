import PARSE_COMMENT_TEXT_PLUGINS from './parseCommentTextPlugins'

import { describe, it } from '../mocha'
import expectToEqual from '../expectToEqual'
import parseCommentText from '../parseCommentText'

function parseCommentTest(comment, result) {
	return expectToEqual(parseCommentText(comment, {
		plugins: PARSE_COMMENT_TEXT_PLUGINS
	}), result)
}

describe('parseCommentText', () => {
	it('should strip unmatched/unknown tags', () => {
		const consoleWarn = console.warn
		const warnings = []
		console.warn = (text) => warnings.push(text)

		const consoleError = console.error
		const errors = []
		console.error = (text) => errors.push(text)

		parseCommentTest(
			'<div align=\"center\"><br><h1><blink><font color=\"red\">\/s\/ is NOT for \/r\/EQUESTS<\/font><\/blink><\/h1><br><h1><font color=\"red\">Do not start a thread if you don\'t have at least 6 related pictures to post in it.<\/font><\/h1><br><br><\/div>',
			[
				[
    			"/s/ is NOT for /r/EQUESTS",
				],
				[
					"Do not start a thread if you don't have at least 6 related pictures to post in it."
				]
			]
		)

		expectToEqual(warnings.length, 3)
		expectToEqual(warnings[0], 'Unsupported tag found: "<blink>"')
		expectToEqual(warnings[1], 'Unsupported tag found: "<font color="red">"')
		expectToEqual(warnings[2], 'Unsupported tag found: "<font color="red">"')

		expectToEqual(errors.length, 0)

		console.warn = consoleWarn
		console.error = consoleError
	})
})
