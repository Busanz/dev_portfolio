const GITHUB_USERNAME = 'busanz';
const API_URL = `https://api.github.com/users/busanz/repos`;
const portfolioWrapper = document.querySelector('#portfolioWrapper');

const fetchGitHubProjects = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    const hiddenRepo = ['fg_assigment_03'];
    const repos = await response.json();
    const portfolioRepos = repos.filter(
      (repo) => repo.has_pages === true && !hiddenRepo.includes(repo.name)
    );
    const projectImage = {
      dev_portfolio: './img/portfolio/dev_portfolio.png',
      'web-game-treasure-box': './img/portfolio/web-game-treasure-box.png',
      'fg-02-js-text-game': './img/portfolio/fg-02-js-text-game.png',
      versioncontrol_group_09: './img/portfolio/versioncontrol_group_09.png',
    };
    const projectTitle = {
      dev_portfolio: 'Portfolio Website',
      'web-game-treasure-box': 'Treasure Box Game',
      'fg-02-js-text-game': 'Text Base Web Game',
      versioncontrol_group_09: 'Version Control Blog',
    };

    portfolioRepos.forEach((repo) => {
      const publishUrl = `https://${GITHUB_USERNAME}.github.io/${repo.name}/`;

      const imageSrc =
        projectImage[repo.name] || './img/portfolio/project-placeholder.png';

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

        <h1 class="article_title">${titleOfProject}</h1>
        <p class="hero__description">
          ${repo.description || 'No description provided.'}
        </p>

        <div class="article_icons">
          <a href="${
            repo.html_url
          }" target="_blank" aria-label="GitHub Repository Link">
            <img src="./img/github.svg" alt="Git hub icon" width="30" height="30" />
          </a>

          <a href="${publishUrl}" target="_blank" aria-label="Live Project">
            <img
              src="./img/globe.svg"
              alt="Live site icon"
              width="30"
              height="30"
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
