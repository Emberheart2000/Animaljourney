<script>
    import Card from "../components/Card.svelte";
    import animalData from "../assets/data/animaldata.js";

    import { fetchAnimalExcerpt } from "../js/functions";
    let apianswer = "";
    let filteredAnimals = [];
    filteredAnimals = animalData.filter(animal => animal.name.toLowerCase() === 'scorpion');

function init() {
    fetchAnimalExcerpt('Scorpion').then(data => {
        apianswer = data.extract;
        const apicontent = document.querySelector('.apicontent');
        apicontent.innerHTML = apianswer;
    }).catch(error => {
        console.error('Error fetching animal excerpt:', error);
    });
}
init();
</script>

<main>
    <!-- <button class="button" on:click={async () => {
        const data = await fetchAnimalExcerpt("Cheetah")
        let apianswer = data.extract;
        alert(data.extract);
        // animalExcerpt = data.extract;
        }}
        >Scorpion</button> -->

    
    <div class="cardandapicontainer">
        <div class="cardcontainer">
            {#each filteredAnimals as animal}
            <Card class={animal.groupname.replace(/\s+/g, '')} name={animal.name} groupnumber={animal.group_number} group={animal.group} imagename={animal.name.toLowerCase()} size={animal.max_length} weight={animal.max_weight} age={animal.max_age} deaths={animal.deaths} speed={animal.top_speed} litter_size={animal.litter_size} trivia={animal.trivia}/>
            {/each}
        </div>
        <div class="apicontainer">
            <div class="apiheader"><div class="description">You discovered a</div><h1>Scorpion</h1></div>
            <div class="apicontent"></div>
            <button class="button" onclick={() => window.location.href = '/#/game'}>Mehr Tiere finden</button>
            <div></div>
        </div>
    </div>
</main>

<style>
    main{
        display: flex;
    }
    .cardandapicontainer {
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: start;
        margin: 0 auto;
        grid-template-columns: 1 / span 12;
        gap: 4rem;
        padding-top: 10vh;
    }

    .cardcontainer{
        width: 30vw;
    }

    .apicontainer{
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    .apicontent{
        width: 30vw;
        font-size: 4rem;
        padding: 10rem;
        background-color: rgba(74, 74, 74, 0.5);
        color: #ffffff;
        border-radius: 4rem;
    }

.apiheader{
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: center;
}
    h1{
        font-size: 24rem;
        margin: 0;
        font-weight: 400;
    }

    .description{
        font-size: 4rem;
        font-weight: 400;
    }

    @media (max-width: 1000px) {
        .cardandapicontainer {
            flex-direction: column;
            align-items: center;
            padding-top: 0;
        }
        .cardcontainer{
            width: 80vw;
            justify-content: center;
        }

    }
</style>