<script>
  import Card from "../components/Card.svelte";
  import animalData from "../assets/data/animaldata.js";

    let animals = []
    let filteredAnimals = [];
    filteredAnimals = animalData;

 
</script>

<main>
    <div id="grid">
        {#each filteredAnimals as animal}
        <Card class={animal.groupname.replace(/\s+/g, '')} name={animal.name} groupnumber={animal.group_number} group={animal.group} imagename={animal.name.toLowerCase()} size={animal.max_length} weight={animal.max_weight} age={animal.max_age} deaths={animal.deaths} speed={animal.top_speed} litter_size={animal.litter_size} trivia={animal.trivia}/>
        {/each}
    </div>
</main>

<style>
    #grid{
    background-color: transparent;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 4em;
    height: 900vh;
    grid-column: span 12;
}

@media (max-width: 1000px) {
    #grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    #grid {
        grid-template-columns: 1fr;
    }
}
</style>