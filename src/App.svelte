<script>
	import Router from "svelte-spa-router";
	import routes from "./routes";
</script>

<nav>
	<header>
	  <section class="logocontainer">
		<img class="logo" src="./public/wwf_logo.png" alt="WWF Logo" />
	  </section>
	  <ul>
		<li><a href="#/">Home</a></li>
		<li><a href="#/about">About Us</a></li>
		<li><a href="#/quartett">Quartett</a></li>
		<li><a href="#/cards">Cards</a></li>
		<li><button class="button" on:click={() => window.location.href = '#/game'}>Explore</button></li>
	  </ul>
	</header>
  </nav>

  <Router {routes} />
  
  <style>
	header {
	  display: grid;
	  justify-content: space-between;
	  align-items: center;
	  padding: 20px;
	  grid-template-columns: repeat(12, 1fr);
	  gap: 10px;
	  padding: 20px 0;
	}
	ul {
	  grid-column: 6 / span 4;
	}
	.logocontainer {
	  grid-column: 2 / span 1;
	  height: 15rem;
	  /* 60px */
	  width: 15rem;
	  /* 60px */
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  overflow: hidden;
	}
	nav {
	  grid-column: 7 / span 4;
	}
  
	nav ul {
	  display: flex;
	  list-style: none;
	  justify-content: space-between;
	  align-items: center;
	}
  
	nav ul li a {
	  text-decoration: none;
	  color: #333;
	}
  
	.logo {
	  width: 100%;
	  height: 100%;
	  object-fit: contain;
	}

	@media (max-width: 1200px) {
		ul {
			flex-direction: column;
			align-items: center;
			}
		.logocontainer {
				grid-column: 1 / -1;
				display: flex;
				justify-content: center;
				display: none;
			}
		ul {
				grid-column: 1 / -1;
				display: flex;
				justify-content: center;
			}
		}

		@media (max-width: 600px) {	
			nav ul {
				grid-column: 1 / 12;
				flex-direction: column;
				align-items: center;
			}
			.logo {
				content: url('./public/frog.png');
			}
		}

  </style>
  
