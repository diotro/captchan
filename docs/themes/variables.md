# Theme Variables

This document describes the [CSS Variables](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties) available for customization in [themes](https://gitlab.com/catamphetamine/captchan/blob/master/docs/themes/guide.md). If you have suggestions for new CSS Variables then contact the repo author through [issues](https://gitlab.com/catamphetamine/captchan/issues) to discuss that.

All variables listed here have their default values — see
[style-variables.css](https://gitlab.com/catamphetamine/captchan/blob/master/src/styles/style-variables.css). If a variable isn't there then it's in the [style-variables.css](https://gitlab.com/catamphetamine/webapp-frontend/blob/master/src/styles/style-variables.css) of the parent project.

"Light" mode should be styled via `.light` CSS selector and "Dark" mode should be styled via `.dark` CSS selector. Both can be styled via `:root` CSS selector.

## Colors

There're three main colors in the palette: "black", "white" and "color".

* "Black" is for text, and for "Dark Mode" it's actually "white", so semantically it's called `--Content-color`.

* "White" is for text background, and for "Dark Mode" it's actually "black", so semantically it's called `--Content-backgroundColor`.

* "Color" is about bringing some color, and it's usually a "branding" color: sky blue for Twitter, dark blue for Facebook, red for YouTube, etc. In order to differentiate the "color" from the other colors it's called `--base-color`.

Each color can have variations: from `100` for the "lightest" one to `900` for the "darkest" one. The meaning of "lightest" and "darkest" depends on the context. For example, for `--Content-color` "lightest" means the lightest in "Light Mode" and the darkest in "Dark Mode". And for `--base-color` regardless of "Light Mode" or "Dark Mode" "lightest" means the lightest and "darkest" means the darkest.

See [this article](https://refactoringui.com/previews/building-your-color-palette) for more details on building a color palette.

## Base color

* All variations of `--base-color`: from `--base-color-100` for the lightest one to `--base-color-900` for the darkest one. See [this article](https://refactoringui.com/previews/building-your-color-palette) for more details on building a color palette.

## Document

* `--Document-color: black` — Text color on a page.
* `--Document-backgroundColor: white` — Background color of a page.
* `--Document-fontFamily: Roboto` — Application font.

## Text

* `--Text-fontFamily: sans-serif` — Text content font.

## Header

* `--Header-color: black` — Header text color.
* `--Header-color--hover: var(--Clickable-color--text)` — Header text color when hovered.
* `--Header-color--active: var(--Clickable-color--textActive)` — Header text color when clicked.
* `--Header-backgroundColor: white` — Header background color.
* `--Header-backgroundColor--title: var(--Header-backgroundColor)` — Header background color on the left side.
* `--Header-backgroundColor--menu: var(--Header-backgroundColor)` — Header background color on the right side.
* `--Header-borderWidth: 1px` — Header bottom border width.
* `--Header-borderColor: gray` — Header bottom border color color.

## HeaderSeparator

On thread pages there's a separator line between board name and thread title in the header.

* `--HeaderSeparator-color--left` — The color of the separator line.

## NotificationBadge

"Notification badges" are the (1) notification count badges of the menu icons.

* `--NotificationBadge-color: white` — Notification badge text color.
* `--NotificationBadge-backgroundColor: red` — Notification badge background color.

## Announcement

Sometimes chan administration needs to announce something to the users. Things like latest news, contests, etc. Such an announcement appears on top of the page, below the header.

* `--Announcement-backgroundColor: white` — Announcement background color.
* `--Announcement-color: black` — Announcement text color.
* `--Announcement-borderWidth: 1px` — Header bottom border width.
* `--Announcement-borderColor: gray` — Header bottom border color color.

## Menu

* `--Menu-color: black` — Menu icons color (outline).
* `--Menu-color--active: gray` — Menu icons color (fill) when clicked.
* `--Menu-color--selected: black` — Menu icons color (fill) when selected.

## Sidebar

* `--Sidebar-backgroundColor: white` — Sidebar background color.
* `--Sidebar-color-200: gray` - Sidebar "muted" content color.
* `--Sidebar-color-500: black` — Sidebar scrollbar color.
* `--Sidebar-color-600: black` — Sidebar "miscellaneous" content color.
* `--Sidebar-color-900: black` — Sidebar text color.
* `--Sidebar-baseColor-200: orange` — Sidebar input border color when focused.
* `--Sidebar-baseColor-700: orange` — Sidebar link color.
* `--Sidebar-highlightColor-100: gray` — Sidebar active element background color on mouse over.
* `--Sidebar-highlightColor-200: gray` — Sidebar active element background color on click.
* `--Sidebar-borderColor: black` — Sidebar right border color.

## Clickable

A clickable is a link or a button. Links and textual buttons are darker than buttons with background for eligibility reasons.

* `--Clickable-color--text: brown` — Link color.
* `--Clickable-color--textActive: orange` — Link color on click.
* `--Clickable-color: orange` — Link color when clicked. Button background color.
* `--Clickable-color--active: red` — Button background color when clicked.

## Picture

* `--Picture-backgroundColor: gray` — Background color of a picture while it's being loaded.
* `--Picture-borderWidth: 1px` — Picture border width.
* `--Picture-borderColor: gray` — Picture border color.
* `--Picture-borderColor--focus: gray` — Picture border color when focused.
* `--Picture-filter: none` — Picture filter. For example, "Dark Mode" uses `brightness(85%)`.

## Critical

* `--Critical-color: red` — Error message text color.
* `--Critical-backgroundColor: red` — Error `Notification` background color. Error `Notification` text color will be `--Content-color-900`.

## Warning

* `--Warning-color: yellow` — Warning message text color.
* `--Warning-backgroundColor: yellow` — Warning `Notification` background color. Warning `Notification` text color will be `--Content-color-900`.

## Selection

* `--Selection-color: white` — Selected text color.
* `--Selection-backgroundColor: orange` — Selected text background color.

## Notification

* `--Notification-color: white` — Notification text color.
* `--Notification-backgroundColor: black` — Notification background color.
* `--Notification-borderColor: transparent` — Notification border color.
* `--Notification-borderWidth: 0px` — Notification border width.

### Notification (critical)

* `--Notification-color--critical: white` — Error notification text color.
* `--Notification-backgroundColor--critical: var(--Critical-backgroundColor)` — Error notification background color.
* `--Notification-borderColor--critical: var(--Notification-borderColor)` — Error notification border color.
* `--Notification-borderWidth--critical: var(--Notification-borderWidth)` — Error notification border width.

### Notification (warning)

* `--Notification-color--warning: white` — Warning notification text color.
* `--Notification-backgroundColor--warning: var(--Warning-backgroundColor)` — Warning notification background color.
* `--Notification-borderColor--warning: var(--Notification-borderColor)` — Warning notification border color.
* `--Notification-borderWidth--warning: var(--Notification-borderWidth)` Warning notification border width.

## Modal

* `--Modal-borderColor: transparent` — Modal border color.
* `--Modal-borderWidth: 0px` — Modal border width.

## HoverButton

A "hover button" is a button that doesn't look like a button unless it's hovered. The examples are the various post buttons: comment date link, "reply" button, "…" menu button, show replies button.

Some buttons can be "pushed" meaning that they stay in the "pushed" state until "unpushed" via a click.

* `--HoverButton-backgroundColor: gray` — Hover button background color on mouse over.
* `--HoverButton-backgroundColor--active: yellow` — Hover button background color when clicked.
* `--HoverButton-backgroundColor--pushed: var(--HoverButton-backgroundColor--active)` — Hover button background color when pushed.
* `--HoverButton-color--active: orange` — Hover button text color when clicked.
* `--HoverButton-color--pushed: orange` — Hover button text color when pushed.
* `--HoverButton-color--pushedActive: var(--HoverButton-color--active)` — Hover button text color when clicked to unpush.
* `--HoverButton-borderColor: gray` — Hover button border color on mouse over.
* `--HoverButton-borderColor--active: var(--HoverButton-borderColor)` — Hover button border color on click.
* `--HoverButton-borderColor--pushed: var(--HoverButton-borderColor--active)` — Hover button background color when pushed.

## Content

"Content" are posts and generic page content.

* All variations of `--Content-color`: from `--Content-color-100` for the "lightest" one to `--Content-color-900` for the "darkest" one. In "Dark Mode" `--Content-color-100` is the "darkest" variation and `--Content-color-900` is for the "lightest" one. See [this article](https://refactoringui.com/previews/building-your-color-palette) for more details on building a color palette.
* `--Content-backgroundColor: white` — Content background color.
* `--Content-backgroundColor--active: yellow` — When a thread is clicked in a threads list then it's highlighted with this color.

## ContentSection

An example of a "Content Section" is a post.

* `--ContentSection-shadowColor: gray` — The color of `box-shadow` of a content section.

## Post

* `--Post-color--secondary: gray` — A color for "secondary" content of a post. "Secondary" content is everything besides the comment text (comment date, buttons color, icons color).
* `--Post-color--secondaryThread: gray` — While `--Post-color--secondary` is used on board pages (example: `/a/`) `--Post-color--secondaryThread` is used on thread pages (example: `/a/123456`). The rationale is that when scrolling a thread "secondary" content has less informational value than when scrolling a list of threads.

### CommentAuthorBannedIcon

* `--CommentAuthorBannedIcon-color: red` — The color of the "User was banned for this post" icon.

### CommentAuthor

A "comment author section" is comment author name and its surroundings like the "person" icon, an email or a "tripcode".

* `--CommentAuthor-color: black` — The color of a comment author section.
<!-- * `--CommentAuthor-color--accent: orange` — The color of a comment author email. -->
* `--CommentAuthor-color--administrator: red` — The color of a comment author name when the user is an administrator.
* `--CommentAuthor-color--moderator: blue` — The color of a comment author name when the user is a moderator.

### PostQuoteBlock

* `--PostQuoteBlock-color: green` — Post quote text color.
* `--PostQuoteBlock-backgroundColor: transparent` — Post quote background color.
* `--PostQuoteBlock-backgroundColor--hover: gray` — Post quote background color on mouse over.
* `--PostQuoteBlock-borderColor: transparent` — Post quote border color.
<!-- * `--PostQuoteBlock-borderColor--hover: gray` — Post quote border color on mouse over. -->
<!-- * `--PostQuoteBlock-spacing: 0px` — The spacing between the "blocks" of a post quote. Each block is marked by a `PostQuoteBlockBorderLeft` (a vertical line on the left side of a quote). -->
* `--PostQuoteBlock-marginTop: 0px` — The top margin of a post quote. When a post quote has a background then the content is usually more readable with some additional vertical margin, and also this way consequtive post quotes don't look like a single one.
* `--PostQuoteBlock-marginBottom: 0px` — The bottom margin of a post quote. Is equal to `--PostQuoteBlock-marginTop` by default.

For autogenerated post links there're the same style variables but ending with a `--generated` postfix.

* `--PostQuoteBlock-color--generated`
* `--PostQuoteBlock-backgroundColor--generated`
* `--PostQuoteBlock-backgroundColor--generated--hover`
* `--PostQuoteBlock-borderColor--generated`
<!-- * `--PostQuoteBlock-borderColor--generated--hover` -->
<!-- * `--PostQuoteBlock-spacing--generated` -->
* `--PostQuoteBlock-marginTop--generated`
* `--PostQuoteBlock-marginBottom--generated`

`8ch.net` and chans running on `lynxchan` engine (such as `kohlchan.net`) have a notion of "inverse" quotes: the ones posted with a `<` prefix rather than the normal `>` quote prefix. There's no explanation on how "inverse" quotes are different from the normal ones and what's the purpose of their existence.

For "inverse" quotes there're the same style variables but ending with a `--inverse` postfix.

### PostQuoteBlockBorderLeft

"Post quote marker" is the vertical line on the left side of the quote.

* `--PostQuoteBlockBorderLeft-color: gray` — Post quote marker color.
* `--PostQuoteBlockBorderLeft-opacity: 1` — Post quote marker opacity.
* `--PostQuoteBlockBorderLeft-width: 2px` — Post quote marker width.
* `--PostQuoteBlockBorderLeft-marginTop: 0.2em` — Post quote marker top and bottom padding.

For autogenerated post links there're the same style variables for `PostQuoteBlockBorderLeft` but ending with a `--generated` postfix.

* `--PostQuoteBlockBorderLeft-color--generated`
* `--PostQuoteBlockBorderLeft-opacity--generated`
* `--PostQuoteBlockBorderLeft-width--generated`
* `--PostQuoteBlockBorderLeft-marginTop--generated`

For "inverse" quotes there're the same style variables but ending with a `--inverse` postfix.

### PostInlineSpoiler

* `--PostInlineSpoiler-color: gray` — Spoiler color.
* `--PostInlineSpoiler-color--contentActive: gray` — When a thread is clicked in a list of threads all spoilers in its opening post will have this color.
* `--PostInlineSpoiler-color--censored: red` — Ignored word spoiler color.
* `--PostInlineSpoiler-color--censoredContentActive: red` — When a thread is clicked in a list of threads all ignored word spoilers in its opening post will have this color.

<!-- ### PostAttachment -->

<!-- * `--PostAttachment-shadowColor--hover: gray` — The color of `box-shadow` of a post attachment on mouse over. -->

### PostVotes

Some chans allow upvoting/downvoting comments and threads on some boards (for example, [`2ch.hk`](https://2ch.hk/) on [`po`](https://2ch.hk/po/) and [`news`](https://2ch.hk/news/) boards).

* `--PostVotes-color--positive: green` — The color of a positive post rating.
* `--PostVotes-color--positive: red` — The color of a negative post rating.

### CommentSeparator

* `--CommentSeparator-color: gray` — Comments separator line color.

### CommentTree

* `--CommentTree-color: black` — The color of the comment tree lines.
* `--CommentTree-color--branch: black` — The color of the horizontal comment tree lines (the ones that "branch off" to the right).
* `--CommentTree-color--hover: orange` — The color of the comment tree lines on mouse over.
* `--CommentTree-backgroundColor--hover: gray` — The background color of the comment tree on mouse over.

### Boards

Board selection list.

* `--Boards-fontWeight: normal` — Font weight of boards list names.
* `--Boards-color: white` — Text color of a boards list entry.
* `--Boards-color--active: orange` — Text color of a boards list entry when it's clicked.

### BoardsViewSwitcher

* `--BoardsViewSwitcher-color: white` — Boards view switcher text color. Some chans (like `2ch.hk`) provide board activity rating. For such chans the board selection list will have an option of viewing the list of boards either sorted by their rating descending ("Popular") or categorized as usual ("By Category").

### BoardUrl

* `--BoardUrl-fontFamily: monospace` — Font family of boards list URLs.
* `--BoardUrl-fontWeight: normal` — Font weight of boards list URLs.
* `--BoardUrl-slash-color: gray` — The color of the "slash" (`/`) characters on both sides of board URLs in the boards list.
* `--BoardUrl-slash-color--hover: gray` — The color of the "slash" (`/`) characters on both sides of board URLs in the boards list on mouse over.
* `--BoardUrl-slash-color--active: gray` — The color of the "slash" (`/`) characters on both sides of board URLs in the boards list when clicked.
* `--BoardUrl-slash-color--selected: gray` — The color of the "slash" (`/`) characters on both sides of board URLs in the boards list when selected.

# BoardThreadMenu

The menu at the top of a board or thread page.

* `--BoardThreadMenu-color: black` — The color of icons in a board or thread page menu.
* `--BoardThreadMenu-color--active: black` — The color of icons in a board or thread page menu when clicked. Menu icons usually change from outline to counterform when clicked.
* `--BoardThreadMenu-color--selected: black` — The color of icons in a board or thread page menu when selected. Menu icons usually change from outline to counterform when selected.