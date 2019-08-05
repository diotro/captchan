import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-website'
import classNames from 'classnames'

import ApplicationMenu from './ApplicationMenu'

import getMessages from '../messages'
import { getChan } from '../chan'
import { isContentSectionsContent, isRegularContent } from '../utility/routes'

import PostBlock from 'webapp-frontend/src/components/PostBlock'

import CaptchanLogo from '../../assets/images/icon.svg'

import './Footer.css'

@connect(({ app, found }) => ({
	locale: app.settings.locale,
	offline: app.offline,
  route: found.resolvedMatch
}))
export default class Footer extends React.Component {
	static propTypes = {
		route: PropTypes.object.isRequired,
		locale: PropTypes.string.isRequired,
		offline: PropTypes.bool,
		className: PropTypes.string
	}

	render() {
		const {
			route,
			locale,
			offline,
			className
		} = this.props
		return (
			<footer className={classNames(className, 'footer', {
				'footer--center': isRegularContent(route),
				'background-content': isContentSectionsContent(route)
			})}>
				<div className={classNames('content', {
					'text-content': isContentSectionsContent(route) || isRegularContent(route)
				})}>
					{getChan().links &&
						<nav>
							<ul className="footer__chan-links">
								{getChan().links.map((link, i) => (
									<li key={i} className="footer__chan-link-item">
										<a
											target="_blank"
											href={link.url}
											className="footer__chan-link">
											{link.text}
										</a>
									</li>
								))}
							</ul>
						</nav>
					}
					<div className="footer__copyright">
						{typeof getChan().copyright === 'string' &&
							<p>
								{getChan().copyright}
							</p>
						}
						{Array.isArray(getChan().copyright) &&
							<PostBlock>
								{getChan().copyright}
							</PostBlock>
						}
						<p className="footer__copyright-captchan">
							{getMessages(locale).copyright.preCaptchan}
							<a
								target="_blank"
								href="https://github.com/catamphetamine/captchan">
								<CaptchanLogo className="footer__copyright-captchan-logo"/>
								captchan
							</a>
							{getMessages(locale).copyright.postCaptchan}
							{getMessages(locale).copyright.preAuthor}
							<a
								target="_blank"
								href="https://github.com/catamphetamine">
								@catamphetamine
							</a>
							.
						</p>
					</div>
					{!offline && <ApplicationMenu footer/>}
				</div>
			</footer>
		)
	}
}

const COPYRIGHT_REPORT = {
	_html: getChan().copyrightReport
}

// copyright.replace('{0}', (new Date()).getFullYear())