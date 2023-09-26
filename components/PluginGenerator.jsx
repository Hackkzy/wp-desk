"use client";
import {useState} from "react";

import PluginGenerateForm from "./PluginGenerateForm";
import PluginPreview from "./PluginPreview";

//default form data.
const defaultFormData = {
	pluginName: "Simple Plugin",
	pluginSlug: "plugin-slug",
	pluginUri: "example.com/plugin-name-uri",
	pluginDescription: "This is a short description.",
	pluginVersion: "1.0.0",
	pluginAuthorName: "Hackkzy",
	pluginAuthorUri: "example.com",
	pluginTextDomain: "text-domain",
};

export default function PluginGenerator() {
	const [data, setData] = useState(defaultFormData);

	const updateData = (newData) => {
		setData({...data, ...newData});
	};

	const onSubmit = () => {
		setData(defaultFormData);
	};

	return (
		<div className='h-screen grid grid-cols-2 w-full p-8 gap-3'>
			<PluginGenerateForm updateData={updateData} onSubmit={onSubmit} />
			<PluginPreview data={data} />
		</div>
	);
}
