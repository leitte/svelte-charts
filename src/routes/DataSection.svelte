<script>
    import Papa from "papaparse";
    import Section from "./Section.svelte";
    import Table from "./Table.svelte";
    import { data, attributes } from "./store";

    let files;
    let url = "https://gist.githubusercontent.com/slopp/ce3b90b9168f2f921784de84fa445651/raw/4ecf3041f0ed4913e7c230758733948bc561f434/penguins.csv";

    let nDataPoints = 0;
    let nMissingValues = 0;
    let nCategoricalAttributes = 0;
    let nNumericalAttributes = 0;
    const fieldTypes = {};

    $: files ? loadData(files[0]) : data.set([]);

    function loadData(filepath, download=false) {
        console.log("loading data")
        nMissingValues = 0;
        Papa.parse(filepath, {
            header: true,
            dynamicTyping: true,
            download: download,
            transform: function(value, column) {
                if (value === "NA") {
                    nMissingValues += 1;
                    return NaN
                }
                return value
            },
            complete: function(results) {
                data.set(results.data);
                
                const dataLocal = results.data;
                
                dataLocal.forEach(row => {
                    for (const field in row) {
                        const value = row[field];
                        if (!fieldTypes[field]) {
                        fieldTypes[field] = {"dataType": inferType(value)};
                        }
                    }
                });
                attributes.set(fieldTypes);
                nDataPoints = $data.length;
                nCategoricalAttributes = Object.values(fieldTypes).filter(info => info.dataType === "string").length;
                nNumericalAttributes = Object.values(fieldTypes).filter(info => info.dataType === "number").length;
                console.log("Inferred Field Types:", fieldTypes);
            },
            error: function(error) {
                console.error('Error parsing CSV:', error.message);
            }
        });

        
    }

    function inferType(value) {
        if (!isNaN(value)) {
            return "number"
        }
        if (Date.parse(value)) {
            return "date";
        }
        return "string";
    }
</script>

<Section id="data">
    <span slot="title">Upload data</span>
    <span slot="subtitle">Choose a csv file from your local computer.</span>
    <div slot="menu">
        <!-- Form entry to load data from disk. -->
        <div class="field">
            <div class="control">
                <div class="file has-name is-right is-fullwidth">
                    <label class="file-label">
                        <input bind:files class="file-input" type="file" name="data" accept=".csv"/>
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label"> Upload file </span>
                        </span>
                        <span class="file-name">
                            {#if files}
                                {files[0].name}
                            {:else}
                                <span class="content has-text-grey-light">Choose a file...</span>
                            {/if}
                        </span>
                    </label>
                </div>
            </div>
            <p class="help">Load a file from your local computer.</p>
        </div>
        <!-- Form entry to load data from the web. -->
        <div class="field is-expanded">
            <div class="field has-addons mb-0">
                <p class="control is-expanded">
                    <input
                        class="input is-link"
                        type="text"
                        placeholder="Insert a link"
                        bind:value={url}
                    >
                </p>
                <p class="control">
                    <button class="button has-background-light"
                        on:click={() => loadData(url, true)}
                    >
                        <span class="file-icon">
                            <i class="fas fa-cloud-arrow-down"></i>
                        </span>
                        <span class="file-label has-text-weight-normal">Load file</span>
                        <span style:opacity="0.0">pe</span>
                    </button>
                </p>
            </div>
            <p class="help">Load a file from the internet.</p>
        </div>

        <div class="grid is-col-min-1 mt-6">
            <div class="cell has-text-centered">
                <p class="title is-4">{nDataPoints}</p>
                <p class="subtitle is-7">data points</p>
            </div>
            <div class="cell has-text-centered">
                <p class="title is-4">{nMissingValues}</p>
                <p class="subtitle is-7">missing<br>values</p>
            </div>
            <div class="cell has-text-centered">
                <p class="title is-4">{nCategoricalAttributes}</p>
                <p class="subtitle is-7">categorical<br>attributes</p>
            </div>
            <div class="cell has-text-centered">
                <p class="title is-4">{nNumericalAttributes}</p>
                <p class="subtitle is-7">numerical<br>attributes</p>
            </div>
        </div>
    </div>


    <div slot="content">
        {#if $data.length > 0}
            <Table data={$data} />
        {/if}
    </div>
</Section>

<style>
/*     *:not(path):not(g) {
        color:                    hsla(210, 100%, 100%, 0.9) !important;
        background:               hsla(210, 100%,  50%, 0.5) !important;
        outline:    solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;

        box-shadow: none !important;
    } */
</style>