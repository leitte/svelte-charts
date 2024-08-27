<script>
    export let width = 640;
    export let height = 400;
    export let gapSize;
    export let xAttribute;
    export let yAttribute;
    export let colorAttribute;
    export let activeAttributes = [];
</script>

<div class="field is-horizontal">
    <div class="field-label">
        <label class="label">width</label>
    </div>
    <div class="field-body">
        <div class="field">
            <div class="control">
                <input bind:value={width} class="input" type="number" placeholder="Enter a number">
              </div>
        </div>
    </div>
</div>
<div class="field is-horizontal">
    <div class="field-label">
        <label class="label">height</label>
    </div>
    <div class="field-body">
        <div class="field">
            <div class="control">
                <input bind:value={height} class="input" type="number" placeholder="Enter a number">
              </div>
        </div>
    </div>
</div>
<div class="field is-horizontal">
    <div class="field-label">
        <label class="label">gap-size</label>
    </div>
    <div class="field-body">
        <div class="field">
            <div class="control">
                <input bind:value={gapSize} class="input" type="number" placeholder="Enter a number">
              </div>
        </div>
    </div>
</div>
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