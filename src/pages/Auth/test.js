function intersection(arr) {
  const length = arr.length; // length
  let intersectionArr = [];

  for (let i = 0; i < length; i++) {
    const currentArr = arr[i];
    const nextArr = arr[i + 1];

    console.log();
    let filteredArray = [];
    if (intersectionArr.length > 0) {
      filteredArray = intersectionArr.filter((value) => currentArr.includes(value));
    } else {
      filteredArray = currentArr.filter((value) => nextArr.includes(value));
    }
    intersectionArr = [...filteredArray];
    console.log("filtered arr", filteredArray);
  }

  return intersectionArr;
}

console.log("ans =>", intersection([[], [], []]));
