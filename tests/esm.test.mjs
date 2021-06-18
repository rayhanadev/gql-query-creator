import { gqlQueryCreator } from '../dist/gql-query-creator.mjs';

const userAttributes = {
	id: '',
	username: '',
	firstName: '',
	lastName: '',
	bio: '',
	isVerified: '',
	displayName: '',
	fullName: '',
	url: '',
	isLoggedIn: '',
	isSubscribed: '',
	timeCreated: '',
	isBannedFromBoards: '',
	karma: '',
	isHacker: '',
	image: '',
};

const postAttributes = {
	id: '',
	title: '',
	body: '',
	showHosted: '',
	voteCount: '',
	commentCount: '',
	isPinned: '',
	isLocked: '',
	timeCreated: '',
	timeUpdated: '',
	url: '',
	isAnnouncement: '',
	isAuthor: '',
	canEdit: '',
	canComment: '',
	canVote: '',
	canPin: '',
	canSetType: '',
	canChangeBoard: '',
	canLock: '',
	hasVoted: '',
	canReport: '',
	hasReported: '',
	isAnswerable: '',
	tutorialPages: '',
	preview: [
		{
			propOverride: true,
			length: 150,
			removeMarkdown: true,
		},
	],
};

const itemsTree = {
	userByUsername: {
		args: [{ username: 'username' }],
		items: {
			...userAttributes,
			posts: {
				args: [],
				items: {
					items: {
						args: [],
						items: {
							...postAttributes,
						},
					},
				},
			},
		},
	},
};

const variables = {
	username: ['String!', 'RayhanADev'],
};

console.log(gqlQueryCreator('UserInfo', variables, itemsTree));
