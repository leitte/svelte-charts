<script>
    import * as d3 from 'd3';
  
    export let data;
    export let x;
    export let y;
    export let color;
    export let width = 640;
    export let height = 400;
    export let marginTop = 20;
    export let marginRight = 20;
    export let marginBottom = 20;
    export let marginLeft = 30;
    export let padding = 10; // in pixels

    let xScale;
    let yScale;
    let colorScale;
    let xAxis;
    let yAxis;

    $: if(data) {
        let dataExtent = d3.extent(data, row => row[x]);
        const xScaleFullWidth = d3.scaleLinear(dataExtent, [marginLeft, width - marginRight]);
        let paddingDomain = xScaleFullWidth.invert(marginLeft+padding) - dataExtent[0];
        xScale = d3.scaleLinear([dataExtent[0]-paddingDomain, dataExtent[1]+paddingDomain], [marginLeft, width - marginRight]);

        dataExtent = d3.extent(data, row => row[y]);
        const yScaleFullWidth = d3.scaleLinear(d3.extent(data, row => row[y]), [height - marginBottom, marginTop]);
        paddingDomain = yScaleFullWidth.invert(marginTop-padding) - dataExtent[1];
        yScale = d3.scaleLinear([dataExtent[0]-paddingDomain, dataExtent[1]+paddingDomain], [height - marginBottom, marginTop]);
    }
  
    $: d3.select(xAxis).call(d3.axisBottom(xScale));
    $: d3.select(yAxis).call(d3.axisLeft(yScale));
  </script>

<p>Scatterplot {x} vs. {y}</p>

  <svg id="svg" width={width} height={height}>
    <g bind:this={xAxis} transform="translate(0,{height - marginBottom})" />
    <g bind:this={yAxis} transform="translate({marginLeft},0)" />
    <text class="x label" x={width-marginRight} y={height-6-marginBottom} text-anchor="end">{x}</text>
    <text class="y label" x={6} y={marginTop-6}>{y}</text>
    <g fill="white" stroke="currentColor" stroke-width="1.5">
      {#each data as d, i}
        <circle key={i} cx={xScale(d[x])} cy={yScale(d[y])} r="2.5" />
      {/each}        
    </g>
  </svg>

<style>
    svg {
        background-color: white;
    }

    .label {
        font-size: 70%;
    }
</style>