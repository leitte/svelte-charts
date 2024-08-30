<script>
    import Section from "./Section.svelte";
    import Scatterplot from "./Scatterplot.svelte";
    import { data, attributes, title, subtitle, width, height, gapSize, xAxisRangeMax } from "./store";
    import { page } from "$app/stores";
    import Chart from "./Chart.svelte";
    import MenuParameters from "./MenuParameters.svelte";
    import MenuAnnotation from "./MenuAnnotation.svelte";
    import MenuTheme from "./MenuTheme.svelte";
    import { onMount } from "svelte";
    import { loadTheme } from "$lib/charting";
    import XAxis from "./xAxis.svelte";
    import Scatterplot2 from "./Scatterplot2.svelte";
    import MenuMapping from "./MenuMapping.svelte";

    let activeAttributes = [];
    let xAttribute;
    let yAttribute;
    let colorAttribute = "None";

    let chartTheme;

    let xAxisRangeMin;

    $: hash = $page.url.hash;
    $: $attributes && updateChartSettings();
    $: xAttribute && updateXAxisSettings();

    onMount(async () => {
        chartTheme = await loadTheme();
    });

    function updateChartSettings() {
        const activeNumAttributes = Object.entries($attributes)
            .filter(
                ([key, value]) => value.dataType === "number" && value?.active,
            )
            .map(([key]) => key);
        activeAttributes = Object.entries($attributes)
            .filter(([key, value]) => value?.active)
            .map(([key]) => key);
        console.log("active", activeAttributes);
        xAttribute = activeNumAttributes[0] || xAttribute;
        yAttribute = activeNumAttributes[1] || yAttribute;
        return true;
    }

    function updateXAxisSettings () {
        xAxisRangeMin = $data.reduce((min, row) => {
            return row[xAttribute] < min ? row[xAttribute] : min;
        }, Infinity);
        $xAxisRangeMax = $data.reduce((max, row) => {
            return row[xAttribute] > max ? row[xAttribute] : max;
        }, -Infinity);
    }

    function saveSvg(svgEl, name) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var svgData = svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], {
            type: "image/svg+xml;charset=utf-8",
        });
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
</script>

<Section id="visualization">
    <span slot="title">Visualize</span>
    <span slot="subtitle">Create a chart for your data.</span>
    <div slot="menu">
        <div class="tabs is-boxed is-small">
            <ul>
                <li id="parameters" class={hash === "#parameters" ? "is-active" : ""}>
                    <a href="#parameters">Chart</a>
                </li>
                <li id="mapping" class={hash === "#mapping" ? "is-active" : ""}>
                    <a href="#mapping">Mapping</a>
                </li>
                <li id="annotation" class={hash === "#annotation" ? "is-active" : ""}>
                    <a href="#annotation">Annotation</a>
                </li>
                <li id="theme" class={hash === "#theme" ? "is-active" : ""}>
                    <a href="#theme">Theme</a>
                </li>
            </ul>
        </div>

        {#if hash === "#parameters"}
            <MenuParameters
                bind:width={$width}
                bind:height={$height}
                bind:gapSize={$gapSize}
                bind:xAttribute
                bind:yAttribute
                bind:colorAttribute
                bind:activeAttributes
            />
        {:else if hash === "#mapping"}
            <MenuMapping 
                bind:xAxisRangeMin
                bind:xAxisRangeMax={$xAxisRangeMax}
                on:resetXAxis={updateXAxisSettings}
            />
        {:else if hash === "#annotation"}
            <MenuAnnotation bind:title={$title} bind:subtitle={$subtitle} />
        {:else if hash === "#theme"}
            <MenuTheme theme={chartTheme} />
        {/if}

        <button
            class="button is-primary mt-5"
            on:click={() =>
                saveSvg(document.getElementById("chart"), "test.svg")}
        >
            Download svg
        </button>

        <p class="block">{$width}</p>
    </div>

    <div slot="content">
        <Chart
            title={$title}
            subtitle={$subtitle}
            notes="Here are notes"
            dataSource="My data source"
            width={$width}
            height={$height}
        >
            <Scatterplot2 
                data={$data} 
                x={xAttribute} 
                y={yAttribute} 
                color={colorAttribute} 
                size=5 
                {xAxisRangeMin}
                let:myvar={xtext}>
                {xtext}
            </Scatterplot2>
            <!-- <XAxis slot="xAxis" attribute={xAttribute} data={$data} /> -->

        </Chart>

        <!-- {#if ($data.length > 0) && xAttribute && yAttribute}
            <Scatterplot data={$data} x={xAttribute} y={yAttribute} color={colorAttribute}/>
        {/if} -->
    </div>
</Section>
