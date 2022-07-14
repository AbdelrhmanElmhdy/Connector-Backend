import User from '../models/User';

export const stripUserFromPrivateInformation = (user: User): any => {
	let safeUserInfo = { ...user };

	delete safeUserInfo.id;
	delete safeUserInfo.encryptedPassword;
	delete safeUserInfo.accessToken;

	return safeUserInfo;
};
