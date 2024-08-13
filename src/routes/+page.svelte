<script>
    import Chart from "./Chart.svelte";
    import Table from "./Table.svelte";
    import Papa from "papaparse";
    import * as d3 from 'd3';
    import Scatterplot from "./Scatterplot.svelte";

    let files;
    let data;
    let xAttribute = "bill_length_mm";
    let yAttribute = "bill_depth_mm";

    const data2 = d3.ticks(-2,2,200).map(Math.sin);

    $: if(files) {
        Papa.parse(files[0], {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                data = results.data;
            },
            error: function(error) {
                console.error('Error parsing CSV:', error.message);
            }
        });
    }
</script>

<h1>Welcome to SvelteKit</h1>

<label for="fileupload">Upload data:</label>
<input bind:files id="fileupload" type="file" accept=".csv"/>

{#if files}
    <h2>Got file</h2>
    {#each Array.from(files) as file}
		<div>{file.name} ({file.size} bytes)</div>
	{/each}
{/if}

{#if data}
    <Scatterplot data={data} x={xAttribute} y={yAttribute}/>
    
    <Table data={JSON.stringify(data, null, 2)} />
{/if}

<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
