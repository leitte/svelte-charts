<script>
    import * as d3 from "d3";
    import { width, height, marginLeft, marginBottom, marginTop, gapSize } from "./store";

    export let data;
    export let x;
    export let y;
    export let color;
    export let size;

    let offset = 4;

    $: plotHeight = $height - $marginTop;
    $: plotWidth = $width;


    let myvar = "hello world";
    let xScale;
    let yScale;
    let xAxis;
    let yAxis;

    $: if (x || y) {
        // do the layout
        updateCoordinateSystem();
        // compute sizes for offset
        $marginBottom = $gapSize + (xAxis?.getBBox().height || 0);
        $marginLeft = $gapSize + (yAxis?.getBBox().width || 0);
        // apply the offset
        updateCoordinateSystem();
    }

    function updateCoordinateSystem () {
        xScale = d3.scaleLinear(d3.extent(data, (row) => row[x]),
                                [$marginLeft + $gapSize, $width - 2*$gapSize]);
        yScale = d3.scaleLinear(d3.extent(data, (row) => row[y]),
                                [$gapSize, plotHeight-$marginBottom - $gapSize]);
        d3.select(xAxis).call(d3.axisBottom(xScale));
        d3.select(yAxis).call(d3.axisLeft(yScale));
    }

</script>

<slot {myvar}></slot>

{#if x}
    <g transform="translate(0,{plotHeight-$marginBottom})">
        <g id="x-axis" class="axis tick-label" bind:this={xAxis} />
        <path stroke="currentColor" d="M{$marginLeft},{0}H{plotWidth-$gapSize}" />
        <text 
            class="axis-label"  
            text-anchor="end" 
            alignment-baseline="text-after-edge" 
            x={plotWidth-offset} 
            y={-offset}
        >
            {x}
        </text>
    </g>
{/if}

{#if y}
    <g transform="translate({$marginLeft},0)">
        <g id="y-axis" class="axis" bind:this={yAxis}/>
        <path stroke="currentColor" d="M{0},{0}V{plotHeight-$marginBottom}" />
        <text 
            class="axis-label" 
            alignment-baseline="text-before-edge"
            x={offset}
        >{y}</text>
    </g>    
{/if}


<g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
        <circle id="{i}" 
            cx={x ? xScale(d[x]) : $marginLeft} 
            cy={y ? yScale(d[y]) : plotHeight - $marginBottom} stroke="black" r="2.5"/>
    {/each}
</g>
