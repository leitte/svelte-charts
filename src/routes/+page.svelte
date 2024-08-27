<script>
    import { data } from "./store";
    import DataSection from "./DataSection.svelte";
    import ConfigurationSection from "./ConfigurationSection.svelte";
    import VisualizationSection from "./VisualizationSection.svelte";

    $: if(!$data) {
        document.querySelector("#data").scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
</script>

<DataSection />

<ConfigurationSection />

<VisualizationSection />


    
