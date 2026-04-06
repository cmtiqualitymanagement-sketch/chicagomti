fetch('https://chicagomti.com/')
  .then(res => res.text())
  .then(text => {
    console.log(text.substring(0, 5000));
  })
  .catch(err => console.error(err));
