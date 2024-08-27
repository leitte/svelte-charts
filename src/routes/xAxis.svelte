<script>
    export let attribute;
    export let data;

    let scale;
    $: if(data && attribute) {
        scale = d3.scaleLinear()
    }
</script>

<g id="xAxis">
    <text x=100 y=200>{attribute}</text>
</g>