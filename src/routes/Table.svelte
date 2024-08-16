<script>
    import {TabulatorFull as Tabulator} from 'tabulator-tables';
    import {onDestroy, onMount} from 'svelte';
  
    export let data;
  
    let tableComponent;
    let table;
  
    onMount(() => {
      table = init_table();
    });

    function init_table() {
        return new Tabulator(tableComponent, {
            layout: "fitColumns",
            reactiveData: true, //enable data reactivity
            data: data, //link data to table
            autoColumns: true,        
            //responsiveLayout:"hide",
            pagination:true,
            paginationSize: 10,
        });
    }
  </script>

<div bind:this={tableComponent}></div>

<svelte:head>
<link href="https://unpkg.com/tabulator-tables@4.9.1/dist/css/tabulator_simple.min.css" rel="stylesheet">
</svelte:head>