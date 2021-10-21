const show = document.getElementById("posts");

async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

interface ITodo {
  userId: string;
  id: string;
  title: string;
  body: string;
}

const data = http<ITodo[]>("https://jsonplaceholder.typicode.com/posts").then(
  (dataList) => {
    let html = "";
    for (let i = 0; i < dataList.length; i++) {
      html += `<li>${dataList[i].id} ${dataList[i].title}</li>`;
    }
    show.innerHTML = html;
  }
);

const obj: ITodo[] = [
  {
    userId: "1",
    id: "1",
    title: "one",
    body: "body 1",
  },
  {
    userId: "2",
    id: "2",
    title: "two",
    body: "body 2",
  },
];

const patch = (value: string, item: ITodo): ITodo => {
  return { ...item, title: value };
};

const updateObjectInArray = (
  initialArray: ITodo[],
  keyToFind: string,
  newValue: string,
  callback: Function
): ITodo[] => {
  const clonedArray = initialArray.map((item) => {
    if (item.id === keyToFind) {
      return callback(newValue, item);
    }
    return item;
  });
  return clonedArray;
};

console.log(updateObjectInArray(obj, "1", "changed", patch));
