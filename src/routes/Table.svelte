<script>
    import {TabulatorFull as Tabulator} from 'tabulator-tables';
    import {onMount} from 'svelte';
  
    export let data;
    export let columns = undefined;
  
    let tableComponent;
  
    onMount(() => {
      new Tabulator(tableComponent, {
        data: data, //link data to table
        reactiveData:true, //enable data reactivity
        //columns: columns, //define table columns
        autoColumns: true,
        layout: "fitColumns",
        pagination:true,
        paginationSize: 15,
      });
    });
  </script>
  
  <div bind:this={tableComponent}></div>
  
  <svelte:head>
    <link href="https://unpkg.com/tabulator-tables@4.9.1/dist/css/tabulator_simple.min.css" rel="stylesheet">
  </svelte:head>