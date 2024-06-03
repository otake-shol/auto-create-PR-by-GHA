function onFormSubmit(e) {
  var token = PropertiesService.getScriptProperties().getProperty("TOKEN"); // GitHubのPersonal Access Token

  var payload = {
    ref: "master", // 実行したいブランチ
    inputs: formData,
  };

  var options = {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    headers: {
      Authorization: `token ${token}`,
    },
    payload: JSON.stringify(payload),
  };

  var responses = e.response.getItemResponses();

  var formData = {
    field1: responses[1], // 質問1の回答
    //field2: responses[2], // 質問2の回答
    // 必要に応じて他の質問の回答も追加
  };

  var userName =
    PropertiesService.getScriptProperties().getProperty("USER_NAME");
  var repo = PropertiesService.getScriptProperties().getProperty("REPO"); // リポジトリ
  var workflowId =
    PropertiesService.getScriptProperties().getProperty("WORKFLOW_ID"); // 実行したいワークフローのIDまたはファイル名 (例: "main.yml")

  console.log("処理開始");
  var url = `https://api.github.com/repos/${userName}/${repo}/actions/workflows/${workflowId}/dispatches`;
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
  console.log("処理完了");
}
