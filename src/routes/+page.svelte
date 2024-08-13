<script>
    let files;
</script>

<h1>Welcome to SvelteKit</h1>

<label for="fileupload">Upload data:</label>
<input bind:files id="fileupload" type="file"/>

{#if files}
    <h2>Got file</h2>
    {#each Array.from(files) as file}
		<p>{file.name} ({file.size} bytes)</p>
	{/each}
{/if}

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
