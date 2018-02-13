function getDatabase () {
  return firebase.database();
}

export function getReceipts () {
  const target = getDatabase();

  return new Promise((resolve, reject) => {
    target.ref('/receipts').once('value').then((snapshot) => {
      resolve(snapshot);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function getReceipt (key) {
  const target = getDatabase();

  return new Promise((resolve, reject) => {
    target.ref('/receipts').child(key).once('value').then((snapshot) => {
      resolve(snapshot);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function writeReceipt (spendingDetail, price, description) {
  const target = getDatabase();
  const postData = {
    spendingDetail: spendingDetail, 
    price: price,
    description: description,
    great: 0,
    stupit: 0
  };

  // 입력할 데이터의 key를 얻는다. 
  const key = target.ref().child('receipts').push().key;
  const updates = {};
  updates['/receipts/' + key] = postData;

  return new Promise((resolve, reject) => {
    target.ref().update(updates).then(() => {
      resolve(key);
    }).catch((err) =>  {
      reject(err);
    })
  })
}

export function updateReceipt (id, status, evaluation) {
  const target = getDatabase();
  const postData = {
    id: id,
    status: status,
    evaluation: evaluation
  }

  const key = target.ref().child('receiptsEvaluation').push().key;
  const updates = {};
  updates['/receiptsEvaluation/' + key] = postData;

  return new Promise((resolve, reject) => {
    target.ref().update(updates).then(() => {
      resolve(key);
    }).catch((err) =>  {
      reject(err);
    })
  }) 
}

export function getReceiptEvaluation (key) {
  const target = getDatabase();

  return new Promise((resolve, reject) => {
    target.ref('/receiptsEvaluation').orderByChild("id").equalTo(key).once("value").then((snapshot) => {
      resolve(snapshot);
    }).catch((err) => {
      reject(err);
    });
  });
}
