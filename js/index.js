const loadCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await response.json();
  const categoryData = data.data.news_category;
  // display category
  displayCategory(categoryData);
};
// category container
const categoryContainer = document.getElementById("category-container");

// display category
const displayCategory = (data) =>
  data.forEach((category) => {
    const id = category.category_id;
    const div = document.createElement("div");
    div.innerHTML = `<a onclick=loadNewsHandle('${id}') class="tab text-xl">${category.category_name}</a> `;
    categoryContainer.appendChild(div);
  });

// loadNewsHandle
const loadNewsHandle = async (id, isShowAll) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${id}`
  );
  const data = await response.json();
  const showAllBtn = document.getElementById("show-all-btn")

  let news = data.data;

  if (isShowAll) {
    // Load all news without limiting the number
  } else {
    news = news.slice(0, 6);
  }
  // if (data.data.length > 6) {
  //   showAllContainer.classList.remove("hidden");
  // } else {
  //   showAllContainer.classList.add("hidden");
  // }
  if (data.data.length > 6 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
    showAllBtn.onclick = () => handleShowAll(id);
  } else {
    showAllBtn.classList.add("hidden");
  }
  // display news

  displayNews(news, newsContainer);
};

// display news
const displayNews = (news, newsContainer) =>
  news.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl pt-6">
    <figure><img src="${data.image_url}" alt="" /></figure>
    <div class="card-body">
      <div class="flex gap-4 items-center">
      <h2 class="card-title">${data.title.slice(0, 50)}...</h2>
      <button class="btn btn-primary">${data.rating.badge}</button>
      </div>
      <p>${data.details.slice(0, 100)} . . .</p>
      <p class="font-semibold">Views: ${
        data.total_view != null ? data.total_view : "No views"
      }</p>
      <p class="font-semibold">Rating: ${data.rating.number}</p>
      <div class="card-actions justify-between">
        <div class="flex items-center gap-3">
            <img class="w-12 rounded-full" src="${data.author.img}">
            <h4 class='font-semibold text-lg'>${
              data.author.name != null ? data.author.name : "No Name"
            }</h4>
        </div>
        <button class="btn btn-neutral">Read More</button>
      </div>
    </div>
  </div>
    
    `;
    newsContainer.appendChild(div);
  });

  const handleShowAll = (categoryId) => {
    loadNewsHandle(categoryId, true); // Pass the categoryId and true to load all news
  };

loadCategory();
loadNewsHandle('08')
