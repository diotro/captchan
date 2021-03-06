import { describe, it } from 'webapp-frontend/src/utility/mocha'
import expectToEqual from 'webapp-frontend/src/utility/expectToEqual'

import { UserData } from './UserData'
import MemoryStorage from 'webapp-frontend/src/utility/storage/MemoryStorage'

const storage = new MemoryStorage({
	emulateSerialize: true
})
const userData = new UserData(storage, {
	prefix: '',
	migrate: false
})

describe('UserData', () => {
	it('should add/remove/get hidden comments', () => {
		storage.clear()
		userData.addHiddenComments('a', 123, 124)
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [124]
					}
				}
			}
		)
		userData.addHiddenComments('a', 123, 125)
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [124, 125]
					}
				}
			}
		)
		userData.addHiddenComments('a', 456, 456)
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [124, 125],
						'456': [456]
					}
				}
			}
		)
		userData.addHiddenComments('b', 789, 790)
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [124, 125],
						'456': [456]
					},
					b: {
						'789': [790]
					}
				}
			}
		)
		expectToEqual(
			userData.getHiddenComments(),
			{
				a: {
					'123': [124, 125],
					'456': [456]
				},
				b: {
					'789': [790]
				}
			}
		)
		expectToEqual(
			userData.getHiddenComments('b', 789, 790),
			true
		)
		expectToEqual(
			userData.getHiddenComments('b', 789, 791),
			false
		)
		expectToEqual(
			userData.getHiddenComments('b', 789),
			[790]
		)
		expectToEqual(
			userData.getHiddenComments('a'),
			{
				'123': [124, 125],
				'456': [456]
			}
		)
		expectToEqual(
			userData.getHiddenComments('c'),
			{}
		)
		expectToEqual(
			userData.getHiddenComments('c', 111),
			[]
		)
		expectToEqual(
			userData.getHiddenComments('c', 111, 112),
			false
		)
		userData.removeHiddenComments('b')
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [124, 125],
						'456': [456]
					}
				}
			}
		)
		userData.removeHiddenComments('a', 456)
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [124, 125]
					}
				}
			}
		)
		userData.removeHiddenComments('a', 123)
		expectToEqual(
			storage.data,
			{}
		)
	})

	it('should merge hidden comments', () => {
		storage.data = {
			hiddenComments: {
				a: {
					'123': [124],
					'125': [126]
				}
			}
		}
		userData.merge({
			hiddenComments: {
				a: {
					'123': [123],
					'125': [127],
					'456': [456]
				},
				b: {
					'789': [790]
				}
			}
		})
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [123, 124],
						'125': [126, 127],
						'456': [456]
					},
					b: {
						'789': [790]
					}
				}
			}
		)
	})

	it('should merge hidden comments (source not exists)', () => {
		storage.data = {}
		userData.merge({
			hiddenComments: {
				a: {
					'123': [123]
				}
			}
		})
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [123]
					}
				}
			}
		)
	})

	it('should merge hidden comments (destination not exists)', () => {
		storage.data = {
			hiddenComments: {
				a: {
					'123': [123]
				}
			}
		}
		userData.merge({})
		expectToEqual(
			storage.data,
			{
				hiddenComments: {
					a: {
						'123': [123]
					}
				}
			}
		)
	})
})