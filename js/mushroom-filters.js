const cards = document.querySelectorAll('.mushroom-guide .card');
const seasonalFilter = document.querySelector('#season');
const edibleFilter = document.querySelector('#edible');
const noMatches = document.querySelector('.no-matches');

const currentFilters = {
  season: 'all',
  edible: 'all',
};

cards.forEach((card, i) => {
  const mushroomId = `musroom-${i}`;

  card.style.viewTransitionName = `card-${mushroomId}`;
});

seasonalFilter.addEventListener('change', updateFilter);
edibleFilter.addEventListener('change', updateFilter);

function updateFilter(event) {
  const filterType = event.target.name;
  currentFilters[filterType] = event.target.value;

  // console.log(currentFilters);
  document.startViewTransition(filterCards);
}

function filterCards() {
  let hasVisibleCards = false;
  cards.forEach((card) => {
    const season = card.querySelector('[data-season]').dataset.season;
    const edible = card.querySelector('[data-edible]').dataset.edible;

    // console.log(season, edible);

    const matchSeason = currentFilters.season === season;
    const matchEdible = currentFilters.edible === edible;

    if (
      (matchSeason || currentFilters.season === 'all') &&
      (matchEdible || currentFilters.edible === 'all')
    ) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }

    noMatches.hidden = hasVisibleCards;
  });
}

function enableFilters() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFilters();
