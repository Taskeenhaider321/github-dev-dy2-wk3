const darkButton = document.getElementById("darkButton");
const brightButton = document.getElementById("brightButton");

const sunIcon = document.querySelector("ion-icon[name='sunny-outline']");
const moonIcon = document.querySelector("ion-icon[name='moon']");

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const iconToggle = () => {
  moonIcon.classList.toggle("display-none");
  sunIcon.classList.toggle("display-none");
};

const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("display-none");
    brightButton.classList.add("hidden");
    return;
  }
  sunIcon.classList.add("display-none");
  darkButton.classList.remove("hidden");
};

const toggleTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  iconToggle();
  darkButton.classList.toggle("hidden");
  brightButton.classList.toggle("hidden");
};

darkButton.addEventListener("click", () => {
  toggleTheme("dark");
});

brightButton.addEventListener("click", () => {
  toggleTheme("light");
});

themeCheck();

const input = document.querySelector("#search");
const card = document.querySelector("#card");
const button = document.querySelector("#btn");
const githubURL = "https://api.github.com/users/";

const getUser = async (userName) => {
  fetch(githubURL + userName)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toDateString() : "Not Available";
      };

      const createLink = (url, label) => {
        return url ? `<a href="${url}" target="_blank">${label}</a>` : "Not Available";
      };

      card.innerHTML = `
        <div class="w-16 h-16">
          <img class="rounded-full" src="${data.avatar_url}" alt="">
        </div>
        <div class="w-full p-5 dark:text-white flex flex-col gap-5">
          <div class="flex justify-between">
            <div class="">
              <h1>${data.name || "Not Available"}</h1>
              <h2 class="text-blue-400">${createLink(data.html_url, `@${data.login}`)}</h2>
            </div>
            <div class="">
              <h2>${formatDate(data.created_at)}</h2>
            </div>
          </div>

          <div class=""><h2>${data.bio || "Not Available"}</h2></div>
          <div class="flex bg-[#F4F7FE] dark:bg-[#141C2F] p-4 rounded-xl w-[100%]">
            <div class="flex flex-row w-[100%] justify-around gap-4">
              <div class="flex flex-col">
                <p class="text-black dark:text-white ">Following</p>
                <p class="text-black font-bold text-2xl dark:text-white ">${data.following || 0}</p>
              </div>
              <div class="flex flex-col">
                <p class="text-black dark:text-white ">Repo</p>
                <p class="text-black font-bold text-2xl dark:text-white ">${data.public_repos || 0}</p>
              </div>
              <div class="flex flex-col">
                <p class="text-black dark:text-white ">Followers</p>
                <p class="text-black font-bold text-2xl dark:text-white ">${data.followers || 0}</p>
              </div>
            </div>
          </div>
          
          <div class="flex flex-row justify-start w-full">
            <div class="flex gap-2 w-1/2">
              <span><ion-icon name="location"></ion-icon></span>
              <p>${data.location || "Not Available"}</p>
            </div>
            <div class="mr-3 flex gap-2">
              <span><ion-icon name="logo-twitter"></ion-icon></span>
              <p>${createLink(`https://twitter.com/${data.twitter_username}`, "Twitter")}</p>
            </div>
          </div>

          <div class="flex flex-row justify-start">
            <div class="flex gap-2 w-1/2">
              <span><ion-icon name="logo-github"></ion-icon></span>
              <p>${createLink(data.html_url, "GitHub")}</p>
            </div>
            <div class="flex gap-2">
              <span><ion-icon name="globe-sharp"></ion-icon></span>
              <p>${createLink(data.organizations_url, "Website")}</p>
            </div>
          </div>

          <div class="flex flex-row justify-start">
          <div class="flex gap-2 w-1/2">
            <span><ion-icon name="briefcase-outline"></ion-icon></span>
            <p>${(data.company || "Not Available")}</p>
          </div>
          <div class="flex gap-2">
            <span><ion-icon name="chatbubbles-outline"></ion-icon></span>
            <p>${createLink(data.blog , "Blog" || "Not Available")}</p>
          </div>
        </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("No User Found!")
    });
};

function get() {
  console.log(input.value);
  getUser(input.value);
}