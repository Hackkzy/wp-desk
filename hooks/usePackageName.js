function usePackageName(inputString) {
	const words = inputString.split(" ");

	const formattedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
	);

	return formattedWords.join("_");
}

export default usePackageName;
