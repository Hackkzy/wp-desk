import usePackageName from "@/hooks/usePackageName";
import useSlugify from "@/hooks/useSlugify";

export default function PluginPreview({data}) {
	return (
		<>
			<div className='bg-black shadow-md p-6 rounded-lg w-full font-mono'>
				<div className='flex justify-between items-center'>
					<div className='flex space-x-2 text-red-500'>
						<div className='w-3 h-3 rounded-full bg-red-500' />
						<div className='w-3 h-3 rounded-full bg-yellow-500' />
						<div className='w-3 h-3 rounded-full bg-green-500' />
					</div>
					<p className='text-sm'>{`${useSlugify(
						data.pluginSlug
					)}.php`}</p>
				</div>
				<div className='mt-4 overflow-hidden'>
					<code>
						<pre className='text-primary'>{`<?php`}</pre>
						<pre className='text-muted-foreground'>{` /*`}</pre>
						<pre className='text-muted-foreground'>{`  * Plugin Name:       ${data.pluginName}`}</pre>
						<pre className='text-muted-foreground'>{`  * Plugin URI:        ${data.pluginUri}`}</pre>
						<pre className='text-muted-foreground'>{`  * Description:       ${data.pluginDescription}`}</pre>
						<pre className='text-muted-foreground'>{`  * Version:           ${data.pluginVersion}`}</pre>
						<pre className='text-muted-foreground'>{`  * Author:            ${data.pluginAuthorName}`}</pre>
						<pre className='text-muted-foreground'>{`  * Author URI:        ${data.pluginAuthorUri}`}</pre>
						<pre className='text-muted-foreground'>{`  * License:           GPL-2.0+`}</pre>
						<pre className='text-muted-foreground'>{`  * Text Domain:       ${data.pluginTextDomain}`}</pre>
						<pre className='text-muted-foreground'>{`  * Domain Path:       /languages`}</pre>
						<pre className='text-muted-foreground'>{`  *`}</pre>
						<pre className='text-muted-foreground'>{`  * @package           ${usePackageName(
							data.pluginName
						)}`}</pre>
						<pre className='text-muted-foreground'>{`  */`}</pre>
					</code>
				</div>
			</div>
		</>
	);
}
