// fetch ('http://localhost:3000/api/food/foodData')
// .then(res => {
//   if (!res.ok) {
//     console.log('Problem');
//     return;
//   }
//   return res.json();
// })
// .then(data => {
//   console.log(data);
// })
// .catch(error => {
//   console.log(error);
// })

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/api/food/foodData", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const foods = result.data; // Ambil data dari properti "data"
    console.log("List Food:", foods);

  } catch (error) {
    console.error("Error fetching food data:", error);
  }
}

fetchData();
