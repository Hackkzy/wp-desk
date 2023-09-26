/**
 * Hook to convert a plugin name into a plugin prefix.
 * @param {string} pluginName - The name of the plugin.
 * @returns {string} - The plugin prefix.
 */
function usePluginPrefix(pluginName) {
	const prefix = pluginName
		.split(" ")
		.map((word) => word.charAt(0).toLowerCase())
		.join("");

	return prefix;
}

export default usePluginPrefix;
