<script>
    export let id;
</script>

<section class="section" id={id}>
    <p class="title">
        <slot name="title"/>
    </p>
    <p class="subtitle">
        <slot name="subtitle"/>
    </p>

    <div class="columns">
        <div class="column is-one-third">
            <slot name="menu" />
        </div>
        <div class="column is-two-thirds">
            <slot name="content" />
        </div>
    </div>
</section>

<style>
    section.section:nth-of-type(odd) {
        background-color: hsl(0, 0%, 98%);
    }
</style>