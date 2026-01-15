const GITHUB_USERNAME = 'busanz';
const API_URL = `https://api.github.com/users/busanz/repos`;
const portfolioWrapper = document.querySelector('#portfolioWrapper');

const fetchGitHubProjects = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos = await response.json();
    const visibleRepos = repos.filter((repo) => repo.has_pages === true);

    visibleRepos.forEach((repo) => {
      const publishUrl = `https://${GITHUB_USERNAME}.github.io/${repo.name}/`;

      const projectImage = {
        dev_portfolio: '../img/portfolio/dev_portfolio.png',
        'web-game-treasure-box': '../img/portfolio/web-game-treasure-box.png',
      };
      const projectTitle = {
        dev_portfolio: 'Portfolio Website',
        'web-game-treasure-box': 'Treasure Box Game',
      };
      const imageSrc = projectImage[repo.name];
      const titleOfProject = projectTitle[repo.name];

      const article = document.createElement('article');
      article.classList.add('wrapper__article');

      article.innerHTML = `
        <div class="article_image">
          <img
            src="${imageSrc}"
            alt="${repo.name}"
            class="project_image"
          />
        </div>

        <h3 class="article_title">${titleOfProject}</h3>

        <p class="article_description">
          ${repo.description || 'No description provided.'}
        </p>

        <div class="article_icons">
          <a href="${
            repo.html_url
          }" target="_blank" aria-label="GitHub Repository">
            <img src="./img/github.svg" alt="Git hub icon" width="40" height="40" />
          </a>

          <a href="${publishUrl}" target="_blank" aria-label="Live Demo">
            <img
              src="./img/globe.svg"
              alt="Live site icon"
              width="40"
              height="40"
            />
          </a>
        </div>
      `;

      portfolioWrapper.appendChild(article);
    });
  } catch (error) {
    console.error(error);
    portfolioWrapper.innerHTML =
      '<p>Unable to load projects at the moment.</p>';
  }
};

fetchGitHubProjects();
