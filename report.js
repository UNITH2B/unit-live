(()=>{function l(n){return n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}function g(n){let e=l(n).split(`
`),t="",i=null,a=[],p=o=>o.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/(^|[^*\w])\*([^*\n]+?)\*(?=[^*\w]|$)/g,"$1<i>$2</i>").replace(/(^|\W)_(.+?)_(?=\W|$)/g,"$1<i>$2</i>").replace(/`([^`]+)`/g,"<code>$1</code>"),s=()=>{i&&(t+=`</${i}>`,i=null)},c=()=>{if(!a.length)return;let o=a.filter(r=>!/^\s*\|?\s*:?-{2,}/.test(r));t+="<table>"+o.map((r,d)=>"<tr>"+r.replace(/^\s*\||\|\s*$/g,"").split("|").map(f=>(d?"<td>":"<th>")+p(f.trim())+(d?"</td>":"</th>")).join("")+"</tr>").join("")+"</table>",a=[]};for(let o of e){if(/^\s*\|/.test(o)){s(),a.push(o);continue}c();let r;if(r=/^\s*[-*]\s+(.*)/.exec(o)){i!=="ul"&&(s(),t+="<ul>",i="ul"),t+=`<li>${p(r[1])}</li>`;continue}if(r=/^\s*\d+[.)]\s+(.*)/.exec(o)){i!=="ol"&&(s(),t+="<ol>",i="ol"),t+=`<li>${p(r[1])}</li>`;continue}if(s(),r=/^#{1,4}\s+(.*)/.exec(o)){t+=`<h3>${p(r[1])}</h3>`;continue}o.trim()&&(t+=`<p>${p(o)}</p>`)}return s(),c(),t}function m({title:n,subtitle:e,body:t,project:i,snapshot:a,date:p}){let c=new Date(p||Date.now()).toLocaleDateString("ro-RO",{day:"numeric",month:"long",year:"numeric"});return`<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${l(n)}</title>
<style>
  :root { --accent: #D4005F; --ink: #121214; --ink-2: #3e3e44; --ink-3: #6f6f77; --line: #d3d3d6; --paper: #f4f4f2; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font: 15px/1.55 Inter, system-ui, -apple-system, "Segoe UI", sans-serif; }
  .page { max-width: 820px; margin: 40px auto; background: #fff; padding: 56px 64px 64px; }
  header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 18px; border-bottom: 2px solid var(--ink); }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: .02em; }
  .brand i { width: 18px; height: 18px; background: #000; display: inline-block; }
  .meta { color: var(--ink-3); font-size: 13px; text-align: right; }
  h1 { font-size: 34px; line-height: 1.15; letter-spacing: -0.02em; margin: 34px 0 6px; }
  .sub { color: var(--ink-2); font-size: 17px; margin: 0 0 26px; }
  figure { margin: 0 0 28px; }
  figure img { width: 100%; display: block; border: 1px solid var(--line); }
  figcaption { color: var(--ink-3); font-size: 12px; margin-top: 6px; }
  h3 { font-size: 18px; margin: 26px 0 8px; padding-top: 14px; border-top: 1px solid var(--line); }
  p { margin: 0 0 10px; }
  b { color: var(--accent); }
  ul, ol { margin: 0 0 12px; padding-left: 22px; }
  li { margin-bottom: 4px; }
  table { border-collapse: collapse; width: 100%; margin: 6px 0 16px; font-size: 14px; }
  th, td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { font-weight: 650; border-bottom: 2px solid var(--ink); }
  code { font-size: 13px; background: var(--paper); padding: 0 4px; }
  footer { margin-top: 36px; padding-top: 14px; border-top: 1px solid var(--line); color: var(--ink-3); font-size: 12px; }
  .print { position: fixed; right: 24px; bottom: 24px; border: 0; background: var(--accent); color: #fff; padding: 12px 18px; font: 600 14px Inter, system-ui, sans-serif; cursor: pointer; }
  @media print {
    body { background: #fff; }
    .page { margin: 0; max-width: none; padding: 0; }
    .print { display: none; }
    h3, table, figure { break-inside: avoid; }
  }
</style>
</head>
<body>
<button class="print" onclick="window.print()">Salveaza ca PDF</button>
<article class="page">
  <header>
    <span class="brand"><i></i>THE UNIT</span>
    <span class="meta">${l(i||"")}<br>${l(c)}</span>
  </header>
  <h1>${l(n)}</h1>
  ${e?`<p class="sub">${l(e)}</p>`:""}
  ${a?`<figure><img src="${a}" alt=""><figcaption>Vedere din modelul federat, Trimble Connect</figcaption></figure>`:""}
  ${g(t||"")}
  <footer>Raport generat de UNIT Live (agent AI THE UNIT) direct din modelul BIM din Trimble Connect. Cifrele sunt citite din model la data raportului; ce lipseste din model este semnalat, nu estimat.</footer>
</article>
</body>
</html>`}var x=n=>{let e=atob(n.replace(/-/g,"+").replace(/_/g,"/")),t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t};async function u(n){let e=new Blob([x(n)]).stream().pipeThrough(new DecompressionStream("gzip"));return JSON.parse(await new Response(e).text())}async function h(){let n=location.hash.slice(1);if(!n){document.body.textContent="Raportul lipseste din link.";return}let e=await u(n),t=m({...e,date:e.date?new Date(e.date):new Date});document.open(),document.write(t),document.close()}h().catch(n=>{document.body.textContent="Raportul nu a putut fi citit: "+n.message});})();
