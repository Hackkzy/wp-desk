function useSlugify(inputString) {
	const sanitizedString = inputString
		.toLowerCase() // Convert the string to lowercase
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/[^a-z0-9-]/g, "") // Remove any non-alphanumeric characters except hyphens
		.replace(/--+/g, "-"); // Replace consecutive hyphens with a single hyphen

	return sanitizedString;
}

export default useSlugify;
