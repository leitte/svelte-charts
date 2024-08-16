<script>
    import Section from "./Section.svelte";
    import Scatterplot from "./Scatterplot.svelte";
    import { data, attributes } from "./store";

    let activeAttributes = [];
    let xAttribute;
    let yAttribute;
    let colorAttribute = "None";

    $: $attributes && updateChartSettings();

    function updateChartSettings() {
        const activeNumAttributes = Object.entries($attributes).filter(([key,value]) => (value.dataType === "number") && (value?.active)).map(([key]) => key);
        activeAttributes = Object.entries($attributes).filter(([key,value]) => (value?.active)).map(([key]) => key);
        console.log("active", activeAttributes)
        xAttribute = activeNumAttributes[0] || xAttribute;
        yAttribute = activeNumAttributes[1] || yAttribute;
        return true
    }
</script>

<Section id="visualization">
    <span slot="title">Visualize</span>
    <span slot="subtitle">Create a chart for your data.</span>
    <div slot="menu">
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">x-attribute</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select bind:value={xAttribute}>
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
                            <select bind:value={yAttribute}>
                                <option>{yAttribute}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">color</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select bind:value={colorAttribute}>
                                <option>None</option>
                            {#each activeAttributes as attribute}
                                <option>{attribute}</option>
                            {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div slot="content">
        {#if ($data.length > 0) && xAttribute && yAttribute}
            <Scatterplot data={$data} x={xAttribute} y={yAttribute} color={colorAttribute}/>
        {/if}
    </div>
</Section>