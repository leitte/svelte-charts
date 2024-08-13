<script>
    let datafile;
</script>

<h1>Welcome to SvelteKit</h1>

<label for="fileupload">Upload data:</label>
<input bind:datafile id="fileupload" type="file"/>

{#if file}
    <h2>Got file</h2>
    {file.name}
{/if}

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
