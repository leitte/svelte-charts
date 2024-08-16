<script>

</script>

<nav class="navbar has-shadow is-fixed-top">
    <div class="navbar-brand">
        <label class="navbar-item">Charts</label>
    </div>
    <div class="navbar-menu">
        <div class="navbar-start">
            <div class="navbar-item">
                <nav class="breadcrumb has-succeeds-separator">
                    <ul>
                        <li class="is-active"><a href="#">Data</a></li>
                        <li><a href="#configuration" on:click|preventDefault={() => document.querySelector("#configuration").scrollIntoView({ behavior: 'smooth', block: 'start' })}>Configuration</a></li>
                        <li><a href="#">Chart</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</nav>

<slot/>

<footer class="footer">
    <div class="content">
        <p>footer</p>
    </div>
</footer>

<style>
    /*! debug.css | MIT License | zaydek.github.com/debug.css */
/*     *:not(path):not(g) {
        color:                    hsla(210, 100%, 100%, 0.9) !important;
        background:               hsla(210, 100%,  50%, 0.5) !important;
        outline:    solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;

        box-shadow: none !important;
    } */

    .hero.is-fullheight .hero-body {
        align-items: flex-start;
        flex-direction: column;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
</svelte:head>