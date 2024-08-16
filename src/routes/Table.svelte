<script>
    import {TabulatorFull as Tabulator} from 'tabulator-tables';
    import {onMount} from 'svelte';
  
    export let data;
    export let columns = undefined;
  
    let tableComponent;
    let table;

    $: if (data.length > 0) {
        table = init_table();
        console.log('update data');
    }
  
    onMount(() => {
      table = init_table();
    });

    function init_table() {
        return new Tabulator(tableComponent, {
        data: data, //link data to table
        reactiveData:true, //enable data reactivity
        //columns: columns, //define table columns
        autoColumns: true,
        layout: "fitColumns",
        responsiveLayout:"hide",
        pagination:true,
        paginationSize: 10,
      });
    }
  </script>

<div class="container is-scrollable">
    <div bind:this={tableComponent}></div>
</div>

<!-- {JSON.stringify(data, null, 2)}
 -->
<style>
    .is-scrollable {
        max-width: 100%;
        width: 100%;
        overflow-x: hidden;
        /* border: 1px solid black; */
    }
</style>

  <svelte:head>
    <link href="https://unpkg.com/tabulator-tables@4.9.1/dist/css/tabulator_simple.min.css" rel="stylesheet">
  </svelte:head>