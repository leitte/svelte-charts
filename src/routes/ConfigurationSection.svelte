<script>
    import Section from "./Section.svelte";
    import { data, attributes } from "./store";
</script>

<Section id="configuration">
    <span slot="title">Configure your chart</span>
    <span slot="subtitle">Specify which data to show and choose a chart type.</span>
    <div slot="menu">
        <div class="title is-5 has-text-grey-dark">Attributes</div>
        <p class="block mt-2">
            {#if $data.length > 0}
                <div class="checkboxes">
                    {#each Object.keys($data[0]) as attribute}
                        <label class="checkbox">
                            <input type="checkbox" on:change={() => console.log($attributes)} bind:checked={$attributes[attribute].active}/>
                            {attribute}</label>
                    {/each}
                </div>
            {:else}
            <p class="block has-text-grey">No data available yet.</p>
            {/if}
        </p>
    </div>
    <div slot="content">
        <div class="title is-5 has-text-grey-dark">Chart type</div>
        <div class="select">
            <select>
                <option>Scatterplot</option>
            </select>
        </div>        
    </div>
</Section>