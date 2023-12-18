export const load = async (event) => {
	let image;
	if (event.locals.user) {
		image = event.locals.user.image;
	} else {
		image = 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg';
	}

	return { image };
};
