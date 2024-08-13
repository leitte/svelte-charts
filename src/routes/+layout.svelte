<script>
    import './styles.css';
</script>

<div class="app">
    <main>
        <slot />
    </main>

    <footer>
        <p>Footer</p>
    </footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 50rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

    footer {
		display: flex;
		flex-direction: column;
        width: 100%;
        max-width: 50rem;
        margin: 0 auto;
		align-items: left;
		padding: 12px;
	}
</style>