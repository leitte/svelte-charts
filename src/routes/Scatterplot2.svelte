<script>
    import * as d3 from "d3";
    import { marginLeft, marginTop, gapSize } from "./store";
    import { getContext } from "svelte";

    export let data;
    export let x;
    export let y;
    export let color;
    export let size;

    export let xAxisRangeMin = 0;

    const plotWidth = getContext('plotWidth');
    const plotHeight = getContext('plotHeight');

    let marginBottom = 0;

    let myvar = "hello world";
    let xScale;
    let yScale;
    let xAxis;
    let yAxis;

    $: if (x || y || xAxisRangeMin || $plotHeight || $plotWidth) {
        // do the layout
        updateCoordinateSystem();
        // compute sizes for offset
        marginBottom = xAxis?.getBBox().height || 0;
        $marginLeft = yAxis?.getBBox().width || 0;
        // apply the offset
        updateCoordinateSystem();
    }

    function updateCoordinateSystem () {
        const range = d3.extent(data, (row) => row[x]);

        xScale = d3.scaleLinear([xAxisRangeMin,range[1]],
                                [$marginLeft + $gapSize, $plotWidth - $gapSize]);
        yScale = d3.scaleLinear(d3.extent(data, (row) => row[y]),
                                [$gapSize, $plotHeight - marginBottom - $gapSize]);
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale));
    }

</script>

<slot {myvar}></slot>

{#if x}
    <g transform="translate(0,{$plotHeight-marginBottom})">
        <g id="x-axis" class="axis tick-label" bind:this={xAxis} />
        <path stroke="currentColor" d="M{$marginLeft},{0}H{$plotWidth}" />
        <text 
            class="axis-label"  
            text-anchor="end" 
            alignment-baseline="text-after-edge" 
            x={$plotWidth-$gapSize} 
            y={-$gapSize}
        >
            {x}
        </text>
    </g>
{/if}

{#if y}
    <g transform="translate({$marginLeft},0)">
        <g id="y-axis" class="axis" bind:this={yAxis}/>
        <path stroke="currentColor" d="M{0},{0}V{$plotHeight-marginBottom}" />
        <text 
            class="axis-label" 
            alignment-baseline="text-before-edge"
            x={$gapSize}
        >{y}</text>
    </g>    
{/if}


<g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
        <circle id="{i}" 
            cx={x ? xScale(d[x]) || $marginLeft : $marginLeft} 
            cy={y ? yScale(d[y]) || ($plotHeight - marginBottom) : $plotHeight - marginBottom} stroke="black" r="2.5"/>
    {/each}
</g>
