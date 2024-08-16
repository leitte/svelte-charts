<script>
    import Table from "./Table.svelte";
    import Papa from "papaparse";
    import * as d3 from 'd3';
    import Scatterplot from "./Scatterplot.svelte";
    import Visualize from "./Visualize.svelte";

    import { data } from "./store";

    let files;
    let xAttribute = "bill_length_mm";
    let yAttribute = "bill_depth_mm";

    const data2 = d3.ticks(-2,2,200).map(Math.sin);

    $: if(files) {
        Papa.parse(files[0], {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                data.set(results.data);
            },
            error: function(error) {
                console.error('Error parsing CSV:', error.message);
            }
        });
    } else {
        data.set([]);
    }
</script>

<section class="section has-background-white-bis">
    <p class="title">Upload data</p>
    <p class="subtitle">Choose a csv file from your local computer.</p>
    <section class="columns">
        <div class="column is-one-third     has-background-white-bis">
            <div class="file has-name is-boxed">
                <label class="file-label">
                    <input bind:files class="file-input" type="file" name="data" accept=".csv"/>
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label"> Choose a file... </span>
                    </span>
                    <span class="file-name">
                        {#if files}
                            {files[0].name}
                        {:else}
                            no file
                        {/if}
                    </span>
                </label>
            </div>
            {#if $data}
                <p class="block">{$data.length} entries</p>
            {/if}
        </div>
        <div class="column">
            {#if $data}
                <Table data={$data} />
            {/if}
        </div>
    </section>
</section>

<Visualize />
    
