import "./styles.css";

const onClickAdd = () => {
  //　テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //li生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p生成
  const p = document.createElement("p");
  p.innerText = text;

  //ボタン（完了）の生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.closest("li"));
    //押されたボタンの親タグ(li)未完了リストから取り出す
    const addTarget = completeButton.closest("li");
    //TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;
    //div以下を初期化
    addTarget.firstElementChild.textContent = null;

    //liタグを生成
    const li = document.createElement("li");
    li.innerText = text;

    //buttonタグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      console.log("戻す");
      //押された戻すボタンの親タグを完了リストから削除
      const deleteTarget = backButton.closest("li");
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //divタグの子要素に各要素を設定
    addTarget.lastElementChild.appendChild(p);
    addTarget.lastElementChild.appendChild(backButton);

    //完了リストに取り出したものを追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //ボタン（削除）の生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ(li)未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest("li"));
  });

  //divタグの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
