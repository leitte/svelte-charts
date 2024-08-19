<script>
    import Scatterplot from "./Scatterplot.svelte";
    import { data } from "./store";

    const attributeSelection = {};

    let xAttribute;
    let yAttribute;

    $: attributeSelection && updateChartSettings(attributeSelection);

    function updateChartSettings() {
        const activeAttributes = Object.keys(attributeSelection).filter(key => attributeSelection[key]);
        xAttribute = activeAttributes[0] || xAttribute;
        yAttribute = activeAttributes[1] || yAttribute;
    }

    function saveSvg(svgEl, name) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var svgData = svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
</script>

<!-- <section class="section" id="configuration">
    <p class="title">Configure your chart</p>
    <p class="subtitle">Specify which data to show and choose a chart type.</p>

    <div class="columns">
         <div class="column is-one-third">
            <p class="block">
                {#if $data.length > 0}
                    <div class="checkboxes">
                        {#each Object.keys($data[0]) as attribute}
                            <label class="checkbox">
                                <input type="checkbox" on:change={updateChartSettings} bind:checked={attributeSelection[attribute]}/>
                                {attribute}</label>
                        {/each}
                    </div>
                {/if}
            </p>
        </div>
       <div class="column is-one-third">
            <div class="select">
                <select>
                    <option>Scatterplot</option>
                </select>
            </div>
        </div>
    </div>
</section> -->

<section class="section has-background-white-bis">
    <p class="title">Visualize</p>
    <p class="subtitle">Create a chart for your data.</p>

    <div class="columns">
        <div class="column is-one-third">
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">x-attribute</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select>
                                    <option>{xAttribute}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">y-attribute</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select>
                                    <option>{yAttribute}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class="button is-primary"
                on:click={() => saveSvg(document.getElementById("svg"), 'test.svg')}
            >
                Download svg
            </button>
        </div>
        <div class="column">
            {#if ($data.length > 0) && xAttribute && yAttribute}
                <Scatterplot data={$data} x={xAttribute} y={yAttribute}/>
            {/if}
            
        </div>
    </div>
</section>

<style>
    .section {
        overflow-y: hidden;
    }
    
</style>