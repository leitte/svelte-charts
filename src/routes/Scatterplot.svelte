<script>
    import { text } from '@sveltejs/kit';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
  
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

    const margin = {top: 70, right: 20, bottom: 20, left: 30}

    let title = "Scatterplot of penguins"
    let subtitle = "Here comes more information"

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
        const yScaleFullWidth = d3.scaleLinear(d3.extent(data, row => row[y]), [height - marginBottom, margin.top]);
        paddingDomain = yScaleFullWidth.invert(margin.top-padding) - dataExtent[1];
        yScale = d3.scaleLinear([dataExtent[0]-paddingDomain, dataExtent[1]+paddingDomain], [height - marginBottom, margin.top]);

        if (color) {
            colorScale = d3.scaleOrdinal()
                .domain(data.map(d => d[color]))
                .range(d3.schemeCategory10);
        }
    }

    $: console.log("axis changed", xAxis?.getBBox());
    /* , d3.select('#mygroup')?.select('svg')?.node()?.getBBox()); */

  
    $: d3.select(xAxis).call(d3.axisBottom(xScale));
    $: d3.select(yAxis).call(d3.axisLeft(yScale));

    onMount(() => {
        adjustTextPosition();
    });
    
    function adjustTextPosition() {
        console.log("+++ computing positions")
        let text = document.getElementById('title');
        let bbox = text.getBBox();
        text.setAttribute('y', bbox.height)

        text = document.getElementById('subtitle');
        let bbox_sub = text.getBBox();
        text?.setAttribute("y", bbox.height + bbox_sub.height + 5)

        margin.top = bbox.height + bbox_sub.height + 25;
    }


  </script>

  <svg id="svg" width={width} height={height}>
    <style>
        @import url('https://fonts.googleapis.com/css?family=Lato');
        text {
            font-family: Lato;
        }
    </style>
    <g id="header">
        <text id="title" x="4" font-size="120%">{title}</text>
        <text id="subtitle" x="4">{subtitle}</text>
    </g>
    <g on:change={(e) => console.log('hi group', e)} bind:this={xAxis} transform="translate(0,{height - marginBottom})" />
    <g bind:this={yAxis} transform="translate({marginLeft},0)" />
    <text class="x subtitle is-7" x={width-marginRight} y={height-6-marginBottom} text-anchor="end">{x}</text>
    <text class="y subtitle is-7" x={margin.left+3} y={margin.top+10}>{y}</text>
    <g fill="white" stroke="currentColor" stroke-width="1.5">
      {#each data as d, i}
        <circle key={i} cx={xScale(d[x])} cy={yScale(d[y])} r="2.5" stroke={colorScale(d[color])}/>
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


    .axis {
        font-size: 150%;
    }
</style>