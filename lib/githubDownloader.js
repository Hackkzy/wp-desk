import axios from "axios";
import {createWriteStream} from "fs";
import AdmZip from "adm-zip";

export async function downloadGitHubRepo(
	username,
	repo,
	branch,
	downloadPath,
	extractPath
) {
	try {
		// Fetch repository contents
		const response = await axios.get(
			`https://github.com/${username}/${repo}/archive/refs/heads/${branch}.zip`,
			{
				responseType: "stream",
			}
		);

		// Create a readable stream from the zip file.
		const writer = createWriteStream(downloadPath);
		response.data.pipe(writer);
		await new Promise((resolve, reject) => {
			writer.on("finish", resolve);
			writer.on("error", reject);
		});

		// Unzip
		const zip = new AdmZip(downloadPath);
		zip.extractAllTo(extractPath, true);

		return {success: true, message: "Repository downloaded successfully."};
	} catch (error) {
		console.error("Error downloading repository:", error);
		return {success: false, error: "Error downloading repository."};
	}
}
