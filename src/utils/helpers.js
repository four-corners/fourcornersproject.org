export const extractHostname = (url) => {
	let hostname;
	if(!url){return false}
	if(url.indexOf('//') > -1) {
		hostname = url.split('/')[2];
	} else {
		hostname = url.split('/')[0];
	}
	hostname = hostname.split(':')[0];
	hostname = hostname.split('?')[0];
	return hostname;
}

export const extractRootDomain = (url) =>  {
	if(!url){return false}
	let domain = extractHostname(url);
	let splitArr = domain.split('.');
	let arrLen = splitArr.length;
	if (arrLen > 2) {
		domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
		if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
			domain = splitArr[arrLen - 3] + '.' + domain;
		}
	}
	return domain;
}