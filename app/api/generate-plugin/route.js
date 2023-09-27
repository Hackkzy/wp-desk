import {NextResponse} from "next/server";
import {rimrafSync} from "rimraf";
import path from "path";
import fs from "fs-extra";
import replace from "replace-in-file";

import getFiles from "@/lib/getFiles";
import {downloadGitHubRepo} from "@/lib/githubDownloader";
import usePackageName from "@/hooks/usePackageName";

const temp = "/tmp";

const downloadPath = path.join(temp, "master.zip");
const extractPath = path.join(temp, "source");
const gitUsername = "Hackkzy";
const gitRepo = "wp-plugin-boilerplate";
const gitBranch = "main";
export async function POST(req) {
	rimrafSync(extractPath);

	const data = await req.json();

	try {
		await downloadGitHubRepo(
			gitUsername,
			gitRepo,
			gitBranch,
			downloadPath,
			extractPath
		);

		await replaceStrings(data);

		return NextResponse.json("Plugin generated successfully!", {
			status: 200,
		});
	} catch (error) {
		console.log("[CODE_ERROR]", error);
		return new NextResponse("Internal Error", {status: 500});
	}
}

const replaceStrings = async (data) => {
	const {
		pluginName,
		pluginSlug,
		pluginUri,
		pluginDescription,
		pluginVersion,
		pluginAuthorName,
		pluginAuthorUri,
	} = data;

	// zipName = pluginSlug;
	let destination = path.join(extractPath, gitRepo + "-" + gitBranch);

	// Rename the plugin-name folder to the plugin slug
	fs.renameSync(destination + "/plugin-slug", destination + "/" + pluginSlug);

	// Get all the files and rename the plugin-name to the plugin slug
	const rawFiles = await getFiles(`${destination}/${pluginSlug}`);

	const files = [];
	rawFiles.forEach((file) => {
		const newName = file.replace(/plugin-slug/gi, pluginSlug);
		fs.renameSync(file, newName);
		files.push(newName);
	});

	// Find and replace all based on the arrays above
	await replace({
		files: files,
		from: [
			/PLUGIN_NAME/g,
			/PLUGIN_URI/g,
			/PLUGIN_DESCRIPTION/g,
			/PLUGIN_VERSION/g,
			/PLUGIN_AUTHOR_NAME/g,
			/PLUGIN_AUTHOR_URI/g,
		],
		to: [
			pluginName,
			pluginUri,
			pluginDescription,
			pluginVersion,
			pluginAuthorName,
			pluginAuthorUri,
		],
	});
};
