const SHOW_SYSTEM_RESET_MESSAGE = false;
const SOUND_ID = 3028;
const PLAY_SOUND = false;

module.exports = function SkillResets(dispatch) {
	let model;

	dispatch.hook('S_LOGIN', 13, event => {model = event.templateId})

	const showMessage = message => {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 2, {
			message: message,
			type: 41,
			channel: 0,
			chat: 0
		});
	};
	
	function playSound(id) {
		dispatch.toClient('S_PLAY_SOUND', 1, {
			SoundID: id
		})
	}

	dispatch.hook('S_CREST_MESSAGE', 2, event => {
		if (event.type === 6) {
			showMessage(`<img src="img://skill__0__${model}__${event.skill}" vspace="-12"/><font>&nbsp;Reset</font>`);
			if (PLAY_SOUND) playSound(SOUND_ID);
			if (!SHOW_SYSTEM_RESET_MESSAGE) return false;
		}
	});
};
