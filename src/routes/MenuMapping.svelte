<script>
    import { createEventDispatcher } from "svelte";

    export let xAxisRangeMin;
    export let xAxisRangeMax;
    export let xAxisRangeReset;

    const dispatch = createEventDispatcher();

</script>

<div class="label">
    
</div>
<div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="block">Range</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input class="input" type="text" bind:value={xAxisRangeMin} placeholder="min">
        </div>
        
      </div>
      <div class="field">
        <div class="control">
            <input class="input" type="text" bind:value={xAxisRangeMax} placeholder="max">
        </div>
      </div>
      <div class="field">
        <div class="control">
            <button class="button is-white" on:click={(e) => dispatch('resetXAxis', e)}>
                <span class="icon is-small">
                    <i class="fa-solid fa-rotate"></i>
                  </span>
            </button>
        </div>
      </div>
    </div>
  </div>