document.querySelector('.container').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = event.target.querySelector('#icon_prefix2').value;
  const category = event.target.querySelector('.browser-default').value;
  const content = event.target.querySelector('.ql-editor').innerHTML;
  console.log(category);
  await axios.post('/add', {
    title,
    category,
    content,
  });
});
