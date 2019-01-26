import expectToEqual from './expectToEqual'
import correctGrammar from './correctGrammar'

export default function(parseComment) {
	function parseCommentTest(comment, result) {
		return expectToEqual(parseComment(comment, { parseParagraphs: true, correctGrammar }), result)
	}

	parseCommentTest(
		"Sosach ,возник вопрос ,как легче всего воровать пароли ,допустим в кабинете информатики ?",
		[
			// ["Sosach ,возник вопрос ,как легче всего воровать пароли ,допустим в кабинете информатики ?"]
			["Sosach, возник вопрос, как легче всего воровать пароли, допустим в кабинете информатики?"]
		]
	)

	parseCommentTest(
		'<a href=\"https:&#47;&#47;www.youtube.com&#47;watch?v=dIFbIUUo0OU\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">https:&#47;&#47;www.youtube.com&#47;watch?v=dIFbIUUo0OU</a>',
		[
			[{
				"type": "link",
				content: "youtube.com/watch?v=dIFbIUUo0OU",
				"url": "https://www.youtube.com/watch?v=dIFbIUUo0OU"
			}]
		]
	)

	parseCommentTest(
		"Помогите найти видео. Там мужик кулаками машет и делат так &quot;уц-уц-уц&quot; или &quot;уш-уш-уш&quot;. Вроде демонстрации кунфу.",
		[
			[
				'Помогите найти видео. Там мужик кулаками машет и делат так «уц-уц-уц» или «уш-уш-уш». Вроде демонстрации кунфу.'
			]
		]
	)

	parseCommentTest(
		"Двачик, мне нужно ненадолго уйти. Присмотри пожалуйста за моим ручный Украинцем, АТО он <strong>ЗАМЕРЗНЕТ</strong>",
		[
			[
				'Двачик, мне нужно ненадолго уйти. Присмотри пожалуйста за моим ручный Украинцем, АТО он ',
				{
					type: 'text',
					style: 'bold',
					content: 'ЗАМЕРЗНЕТ'
				}
			]
		]
	)

	// parseCommentTest(
	// 	'<span class="spoiler">yandex emoji translator</span><br><br>,  ❓   ❓   .    ⚪️➡️    &amp;  .   ❔       ,   ☠ ❓  ,  ‍♂  &amp; ❓ . &amp; ⤴   ⛏   ‍‍,   ❔     &amp;   ⁉    . ‍♂   ‍,   , &amp;    , &amp; ⤴         , ✋️ 9⃣th , ❔      ,  ➡️  ⭕, &amp; ⤴     8⃣ . ❔ ,  ❓"',
	// 	[
	// 		[{
	// 			type: 'spoiler',
	// 			content: 'yandex emoji translator'
	// 		}],
	// 		[
	// 			',  ❓   ❓   .    ⚪️➡️    &  .   ❔       ,   ☠ ❓  ,  ‍♂  & ❓ . & ⤴   ⛏   ‍‍,   ❔     &   ⁉    . ‍♂   ‍,   , &    , & ⤴         , ✋️ 9⃣th , ❔      ,  ➡️  ⭕, & ⤴     8⃣ . ❔ ,  ❓"'
	// 		]
	// 	]
	// )

	parseCommentTest(
		'abc<br>def',
		[
			[
				'abc',
				'\n',
				'def'
			]
		]
	)

	parseCommentTest(
		'<span class="spoiler">Text<br>Text</span>',
		[
			[{
				type: 'spoiler',
				content: [
					'Text',
					'\n',
					'Text'
				]
			}]
		]
	)

	// parseCommentTest(
	// 	'<span class="spoiler">Text<br>- a<br>- b<br>Text<a href="https://github.com/mamkin-coder-228/yoba-brain/blob/master/main.go" target="_blank" rel="nofollow noopener noreferrer">https://github.com/mamkin-coder-228/yoba-brain/blob/master/main.go</a></span>',
	// 	[
	// 		[{
	// 			type: 'spoiler',
	// 			content: [
	// 				'Text',
	// 				'\n',
	// 				'- a',
	// 				'\n',
	// 				'- b',
	// 				'\n',
	// 				'Text',
	// 				{
	// 					type: 'link',
	// 					url: 'https://github.com/mamkin-coder-228/yoba-brain/blob/master/main.go',
	// 					content: 'github.com/mamkin-coder-228/yoba-brain/blob/master/main.go'
	// 				}
	// 			]
	// 		}]
	// 	]
	// )

	parseCommentTest(
		'<strong>test</strong><br><em>test</em><br><span class="unkfunc">&gt;test</span><br><span class=\"u\">test</span><br><span class=\"o\">test</span><br><span class=\"spoiler\">test</span><br><span class=\"s\">test</span><br><sup>test</sup><br><sub>test</sub>',
		[
			[{
				type: 'text',
				style: 'bold',
				content: 'test'
			},
			'\n',
			{
				type: 'text',
				style: 'italic',
				content: 'test'
			},
			'\n',
			{
				type: 'quote',
				content: 'test'
			},
			'\n',
			'test',
			'\n',
			'test',
			'\n',
			{
				type: 'spoiler',
				content: 'test'
			},
			'\n',
			{
				type: 'text',
				style: 'strikethrough',
				content: 'test'
			},
			'\n',
			{
				type: 'text',
				style: 'superscript',
				content: 'test'
			},
			'\n',
			{
				type: 'text',
				style: 'subscript',
				content: 'test'
			}]
		]
	)

	parseCommentTest(
		'<span class=\"spoiler\">&gt;<span class=\"s\">тест</span></span>',
		[
			[
				{
					"type": "spoiler",
					"content": [
						">",
						{
							"type": "text",
							"style": "strikethrough",
							"content": "тест"
						}
					]
				}
			]
		]
	)

	parseCommentTest(
		'<a href=\"/v/res/3475861.html#3476088\" class=\"post-reply-link\" data-thread=\"3475861\" data-num=\"3476088\">>>3476088</a>',
		[
			[{
				type: 'post-link',
				threadId: '3475861',
				postId: '3476088',
				url: 'https://2ch.hk/v/res/3475861.html#3476088',
				content: '3476088'
			}]
		]
	)

	parseCommentTest(
		'<span class="unkfunc">&gt;Отмечается, что в ходе <strong>контрснайперской борьбы</strong>, украинский снайпер ликвидировал Порошенко. </span>',
		[
		  [
		    {
		      "type": "quote",
		      "content": [
		        "Отмечается, что в ходе ",
		        {
		          "type": "text",
		          "style": "bold",
		          "content": "контрснайперской борьбы"
		        },
		        ", украинский снайпер ликвидировал Порошенко. "
		      ]
		    }
		  ]
		]
	)

	parseCommentTest(
		'<strong>вопрос к тням</strong><br>Несколько лет назад...<br><br>Так же, пост из моего прошлого треда, на эту же тему:<br><em>...</em><br><br><br><span class="unkfunc">&gt;Дискасс.</span>',
		[
			[
				{
					type: 'text',
					style: 'bold',
					content: 'вопрос к тням'
				},
				'\n',
				'Несколько лет назад…'
			],
			[
				'Так же, пост из моего прошлого треда, на эту же тему:',
				'\n',
				{
					type: 'text',
					style: 'italic',
					content: '...'
				}
			],
			[
				{
					type: 'quote',
					content: 'Дискасс.'
				}
			]
		]
	)

	// parseCommentTest(
	// 	'<p style=\"color:green;\">',
	// 	// Won't be implemented.
	// )
}