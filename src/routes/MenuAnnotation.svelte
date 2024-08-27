<script>
    export let title = "Chart Example Title";
    export let subtitle;
</script>

<div class="field">
    <label class="block">Title</label>
    <div class="control">
        <input
            bind:value={title}
            class="input"
            type="text"
            placeholder="Enter a title text."
        />
    </div>
</div>

<div class="field">
    <label class="block">Subtitle</label>
    <div class="control">
        <input
            bind:value={subtitle}
            class="input"
            type="text"
            placeholder="Enter a text for the subtitle."
        />
    </div>
    <p class="help">Use \n for line breaks.</p>
</div>
