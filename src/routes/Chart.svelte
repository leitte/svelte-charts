<script>
    import { getContext, onMount, setContext } from 'svelte';
    import { createStyle, loadTheme } from '$lib/charting';
    import { marginTop, marginBottom, gapSize } from './store';
    import { writable } from 'svelte/store';

    let chartTheme;
    let chartStyle;

    export let width;
    export let height;
    export let title;
    export let subtitle;
    export let notes;
    export let dataSource;
    export let xAttribute;

    let chartIsVisible;
    //let marginTop = 0;

    setContext('width', writable(width));
    setContext('height', writable(height));
    setContext('plotWidth', writable(width - 2*$gapSize));
    setContext('plotHeight', writable(height - $marginTop - $marginBottom))

    $: getContext('width').set(width);
    $: getContext('height').set(height);
    $: getContext('plotWidth').set(width - 2*$gapSize)
    $: getContext('plotHeight').set(height - $marginTop - $marginBottom)

    //$: width = chartTheme?.chart_width || width;
    //$: height = chartTheme?.chart_height || height;

    $: chartIsVisible && (title || subtitle || notes || $gapSize || width || height) && updateHeader();

    onMount(async () => {
        chartTheme = await loadTheme();
        chartStyle = createStyle(chartTheme);
        updateHeader();
        chartIsVisible = true;
    })

    function updateHeader () {
        $marginTop = $gapSize + (document.getElementById('header')?.getBBox().height || 0);
        $marginBottom = $gapSize + (document.getElementById('footer')?.getBBox().height || 0);
        getContext('plotHeight').set(height - $marginTop - $marginBottom);
    }

</script>

<svg id="chart" width={width} height={height}>
    {@html chartStyle}
    <g id="header" transform="translate({$gapSize},{$gapSize})">
        <text dominant-baseline="hanging">
            <tspan id="chart-title" alignment-baseline="text-before-edge">{title}</tspan>
        </text>
        <text id="chart-subtitle" dominant-baseline="hanging">
            {#each subtitle.replace(/\\n/g, '\n').split('\n') as line, i}
                <tspan x="0" dy="{i === 0 ? 2 : 1.2}em" alignment-baseline="text-before-edge">{line}</tspan>
            {/each}
        </text>
    </g>
    <g id="plot" transform="translate({$gapSize},{$marginTop+$gapSize})">
        <slot></slot>
    </g>
    <g id="footer" transform="translate({$gapSize},{height-$gapSize})">
        <slot name="xAxis" />
        <text  alignment-baseline="text-before-edge">
            <tspan id="chart-notes" 
                alignment-baseline="text-after-edge"
                dy="-1.3em"
            >{notes}</tspan>
        </text>
        <text id="chart-references">
            <tspan alignment-baseline="text-after-edge">Source:</tspan>
            <a href="" class="chart-link">
                <tspan alignment-baseline="text-after-edge">{dataSource}</tspan>
            </a>
        </text>
    </g>
</svg>

