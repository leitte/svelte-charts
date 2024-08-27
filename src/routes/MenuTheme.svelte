<script>
    export let theme;
    let value = JSON.stringify(theme, null, 2);
</script>

<div class="block">
    <textarea bind:value class="textarea" placeholder="e.g. Hello world"></textarea>
</div>

