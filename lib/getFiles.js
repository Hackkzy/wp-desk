import {promises as fs} from "fs-extra";
import {join} from "path";

async function getFiles(directory, fileArray = []) {
	try {
		const items = await fs.readdir(directory, {withFileTypes: true});

		for (const item of items) {
			const itemPath = join(directory, item.name);

			if (item.isDirectory()) {
				await getFiles(itemPath, fileArray);
			} else if (item.isFile()) {
				fileArray.push(itemPath);
			}
		}

		return fileArray;
	} catch (err) {
		// Handle errors
		console.error(
			`Error while reading directory '${directory}': ${err.message}`
		);
	}
}

export default getFiles;
