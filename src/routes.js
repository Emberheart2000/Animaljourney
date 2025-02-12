// Components
import Home from "./pages/Home.svelte";
import Game from "./pages/Game.svelte";
import Cards from "./pages/Cards.svelte";
import Tierquartett from "./pages/Tierquartett.svelte";
import About from "./pages/About.svelte";
import NotFound from "./pages/404.svelte";

export default {
	"/": Home,
	"/game": Game,
	"/cards": Cards,
	"/Quartett": Tierquartett,
	"/about": About,
	"*": NotFound,
};
