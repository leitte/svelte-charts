<script>
    import { onMount } from 'svelte';
    import { createStyle, loadTheme } from '$lib/charting';
    import { marginTop, gapSize } from './store';

    let chartTheme;
    let chartStyle;

    export let width = 150;
    export let height = 150;
    export let title;
    export let subtitle;
    export let xAttribute;

    let chartIsVisible;
    //let marginTop = 0;

    $: width = chartTheme?.chart_width || width;
    $: height = chartTheme?.chart_height || height;

    $: chartIsVisible && (title || subtitle || $gapSize) && updateHeader();

    onMount(async () => {
        chartTheme = await loadTheme();
        chartStyle = createStyle(chartTheme);
        updateHeader();
        chartIsVisible = true;
    })

    function updateHeader () {
        let marginTop_tmp = 0;

        // position title and adjust margin
        let titleElement = document.getElementById('chart-title');
        if (titleElement) {
            marginTop_tmp += titleElement.getBBox().height;
            titleElement.setAttribute('y', marginTop_tmp);
        }

        // position subtitle and adjust margin
        let subtitleElement = document.getElementById('chart-subtitle');
        if (subtitleElement) {
            subtitleElement.setAttribute('y', marginTop_tmp + $gapSize);
            marginTop_tmp += subtitleElement.getBBox().height + $gapSize;
        }
        $marginTop = $gapSize + marginTop_tmp + $gapSize;
    }

</script>

<svg id="chart" width={width} height={height}>
    {@html chartStyle}
    <g id="header" transform="translate({$gapSize},{$gapSize})">
        <text id="chart-title">{title}</text>
        <text id="chart-subtitle" style:white-space="normal">
            {#each subtitle.replace(/\\n/g, '\n').split('\n') as line}
                <tspan x="0" dy="{1.2}em">{line}</tspan>
            {/each}
        </text>
    </g>
    <g id="chart" transform="translate(0,{$marginTop})">
        <slot></slot>
    </g>
    <g id="footer">
        <slot name="xAxis" />
    </g>
</svg>
<p class="block">
    {subtitle}
</p>
