<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import YAML from 'yaml';
  
    export let data;
    export let x;
    export let y;
    export let color;
    export let width = 640;
    export let height = 400;
    export let padding = 10; // in pixels
    const margin = {top: 70, right: 20, bottom: 20, left: 30}

    let chart_theme;

    let title = "Scatterplot of penguins"
    let subtitle = "Here comes more information"

    let xScale;
    let yScale;
    let colorScale;
    let xAxis;
    let yAxis;



    $: if (data) {
        console.log("-- updating scales")
        let dataExtent = d3.extent(data, row => row[x]);
        const xScaleFullWidth = d3.scaleLinear(dataExtent, [margin.left, width - margin.right]);
        let paddingDomain = xScaleFullWidth.invert(margin.left+padding) - dataExtent[0];
        xScale = d3.scaleLinear([dataExtent[0]-paddingDomain, dataExtent[1]+paddingDomain], [margin.left, width - margin.right]);
        xScale = d3.scaleLinear(d3.extent(data, row => row[x]), 
                                [margin.left+padding, width - margin.right-padding]);

        dataExtent = d3.extent(data, row => row[y]);
        const yScaleFullWidth = d3.scaleLinear(d3.extent(data, row => row[y]), [height - margin.bottom, margin.top]);
        paddingDomain = yScaleFullWidth.invert(margin.top-padding) - dataExtent[1];
        yScale = d3.scaleLinear([dataExtent[0]-paddingDomain, dataExtent[1]+paddingDomain], [height - margin.bottom, margin.top]);

        if (color) {
            colorScale = d3.scaleOrdinal()
                .domain(data.map(d => d[color]))
                .range(d3.schemeCategory10);
        }
    }

    $: console.log("axis changed", xAxis);
    /* , d3.select('#mygroup')?.select('svg')?.node()?.getBBox()); */

  
    $: d3.select(xAxis).call(d3.axisBottom(xScale));
    $: d3.select(yAxis).call(d3.axisLeft(yScale)) && adjustTextPosition();

    let dynamicStyles = getThemeComponents("chart");

    onMount(async () => {
        await load_theme();

        dynamicStyles = getThemeComponents("chart");
        console.log("dynamic style", dynamicStyles)

        adjustTextPosition();
    });

    async function load_theme() {
        const response = await fetch('/static/chart_theme.yaml');
        const theme_text = await response.text();
        chart_theme = YAML.parse(theme_text);
        console.log("### chart theme", chart_theme)

        const chartThemeStructured = {};
        for (const [key, value] of Object.entries(chart_theme)) {
            const [element, property] = key.split('_');
            if (!chartThemeStructured[element]) {
                chartThemeStructured[element] = {};
            }
            chartThemeStructured[element][property] = value;
        }
        console.log(chartThemeStructured)
        console.log(JSON.stringify(chartThemeStructured, null, 2))

        let mystyle = "";
        for (const [key, value] of Object.entries(chartThemeStructured)) {
            mystyle += `#${key}: `+JSON.stringify(value).replace(/"/g, '');
        }
        console.log("mystyle ", mystyle)
    }
    
    function adjustTextPosition() {
        console.log("+++ computing positions")
        let margin_top = 0;

        let text = document.getElementById('chart-title');
        if (text) {
            let bbox = text.getBBox();
            text.setAttribute('y', bbox.height);
            margin_top += bbox.height;
        }
        text = document.getElementById('chart-subtitle');
        if (text) {
            let bbox_sub = text.getBBox();
            text?.setAttribute("y", margin_top + bbox_sub.height + 5);
            margin_top += bbox_sub.height;
        }

        margin.top = margin_top + 25;

        text = document.getElementById('y-axis');
        if (text) {
            let w = text.getBBox().width;
            if (w > 0) {
                margin.left = w + 2;
                console.log("margin left", margin.left, "width", text.getBBox().width)
                /* let dataExtent = d3.extent(data, row => row[x]);
                const xScaleFullWidth = d3.scaleLinear(dataExtent, [margin.left, width - margin.right]);
                let paddingDomain = xScaleFullWidth.invert(margin.left+padding) - dataExtent[0];
                xScale = d3.scaleLinear([dataExtent[0]-paddingDomain, dataExtent[1]+paddingDomain], [margin.left, width - margin.right]);
                d3.select(xAxis).call(d3.axisBottom(xScale)); */
                xScale = d3.scaleLinear(d3.extent(data, row => row[x]), 
                                [margin.left+padding, width - margin.right-padding]);
                d3.select(xAxis).call(d3.axisBottom(xScale));
            }
            //margin.left =  + 2;
            
        }
        
    }

    

    function getThemeComponents(component) {
        if (!chart_theme) {
            return ""
        }

        const chartThemeStructured = {};
        for (const [key, value] of Object.entries(chart_theme)) {
            const [element, property] = key.split('_');
            if (!chartThemeStructured[element]) {
                chartThemeStructured[element] = {};
            }
            chartThemeStructured[element][property] = value;
        }

        let mystyle = "";
        const classes = ['axis-label', 'tick-label'];
        const elements = ['text','svg']
        for (const [key, value] of Object.entries(chartThemeStructured)) {
            let prefix = classes.includes(key) ? '.' : (elements.includes(key)? '' : '#');

            mystyle += `\n${prefix}${key} `+JSON.stringify(value).replace(/"/g, '').replace(/,/g, ';');
        }

        const fonts = "@import url('https://fonts.googleapis.com/css?family=Roboto');"

        return `<style> ${fonts}${mystyle}\n</style>`
    }
  </script>

<div class="content" style:all="unset">
    <svg id="chart" width={width} height={height}>
        {@html dynamicStyles}
        <!-- <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto');
            svg {background-color: pink}
            text {font-family: Roboto, sans-serif; font-size: 1em}
            .chart-title {font-size: 160%; font-weight: 600;}
            .chart-subtitle {font-size: 120%}
            .chart-axis {font-size: 80%}
            .chart-axis-label {font-size: 100%}
        </style> -->
        <g id="header">
            <text id="chart-title" class="chart-title" x="4">{title}</text>
            <text id="chart-subtitle" class="chart-subtitle" x="4">{subtitle}</text>
        </g>
        <g id="x-axis" class="axis tick-label" on:change={(e) => console.log('hi group', e)} bind:this={xAxis} transform="translate(0,{height - margin.bottom})" />
        <g id="y-axis" class="axis tick-label" bind:this={yAxis} transform="translate({margin.left},0)" />
        <text class="axis-label" x={width-margin.right} y={height-6-margin.bottom} text-anchor="end">{x}</text>
        <text class="axis-label" x={margin.left+3} y={margin.top+10}>{y}</text>
        <g fill="white" stroke="currentColor" stroke-width="1.5">
          {#each data as d, i}
            <circle key={i} cx={xScale(d[x])} cy={yScale(d[y])} r="2.5" stroke={colorScale(d[color])}/>
          {/each}        
        </g>
      </svg>
</div>



<style>
/*     svg {
        background-color: white;
    }

    .label {
        font-size: 70%;
    }


    .axis {
        font-size: 150%;
    } */
</style>