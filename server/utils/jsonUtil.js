function jsonBigIntParser(data) {
	const jsonStringify = JSON.stringify(data, (key, value) =>
		typeof value === "bigint" ? value.toString() + "n" : value
	);
	const jsonParsed = JSON.parse(jsonStringify);
	return jsonParsed
}

function jsonBigIntStringify(data) {
	const jsonStringify = JSON.stringify(data, (key, value) =>
		typeof value === "bigint" ? value.toString() + "n" : value
	);
	return jsonStringify ;
}


module.exports = { stringify : jsonBigIntStringify, parse: jsonBigIntParser };
