fetch('https://buudy.com/products/buudy-red-torch').then(r=>r.text()).then(t=>{
  const m=t.match(/https?:\/\/[^\s`"']+\.(?:png|jpg|jpeg|webp)/g);
  if(m){ console.log(Array.from(new Set(m)).join('\n')) }
});
