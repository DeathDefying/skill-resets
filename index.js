const SHOW_SYSTEM_RESET_MESSAGE = false;
const RESET_FONT_COLOR = '#FF4500'; // https://www.google.com/search?q=colour+picker
const FLASHING_NOTIFICATION = false;
const SOUND_ID = 3028;
const PLAY_SOUND = true;

module.exports = function SkillResets(dispatch) {
	let model;

	dispatch.hook('S_LOGIN', 1, event => ({ model } = event));

	const showMessage = message => {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
			message,
			unk1: FLASHING_NOTIFICATION ? 70 : 2,
			unk2: 0,
			unk3: 0
		});
	};
	
	function playSound(id) {
		dispatch.toClient('S_PLAY_SOUND', 1, {
			SoundID: id
		})
	}

	dispatch.hook('S_CREST_MESSAGE', 1, event => {
		if (event.type === 6) {
			showMessage(`<img src="img://skill__0__${model}__${event.skillID}" width="48" height="48" vspace="-20"/><font size="24" color="${RESET_FONT_COLOR}">&nbsp;Reset</font>`);
			if (PLAY_SOUND) playSound(SOUND_ID);
			if (!SHOW_SYSTEM_RESET_MESSAGE) return false;
		}
	});
};
