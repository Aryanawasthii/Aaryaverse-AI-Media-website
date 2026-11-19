(function(){
"use strict";
var C=window.AARYA,$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var esc=function(t){return String(t).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};

/* ---------- socials / contact ---------- */
var ICON={
 instagram:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
 linkedin:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3 9h3v12H3zM9 9h3v1.7c.5-1 1.800-2 3.700-2 3.500 0 4.300 2.300 4.300 5.300V21h-3v-6c0-1.500 0-3.300-2-3.300s-2.100 1.600-2.100 3.200V21H9z"/></svg>',
 facebook:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 8V6.500c0-.7.200-1 1.200-1H17V2h-2.600C11.500 2 10 3.700 10 6.200V8H8v3.500h2V22h4V11.500h2.800L17.300 8z"/></svg>',
 email:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'};
var links=[["instagram",C.social.instagram,"Instagram"],["linkedin",C.social.linkedin,"LinkedIn"],["facebook",C.social.facebook,"Facebook"],["email",C.email?"mailto:"+C.email:"","Email"]];
$$("[data-socials]").forEach(function(box){box.innerHTML=links.filter(function(l){return l[1]}).map(function(l){
 var ext=l[0]!=="email";return '<a href="'+esc(l[1])+'" aria-label="'+l[2]+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+ICON[l[0]]+'</a>'}).join("")});
["mail-link","mail-link2"].forEach(function(id){var a=$("#"+id);a.href="mailto:"+C.email;a.textContent=C.email});
$("#yr").textContent=new Date().getFullYear();
if(C.whatsappNumber){var wa=$("#wa");wa.href="https://wa.me/"+C.whatsappNumber.replace(/\D/g,"")+"?text="+encodeURIComponent(C.whatsappMessage);wa.hidden=false}

/* ---------- nav ---------- */
var burger=$(".burger"),menu=$("#menu");
burger.onclick=function(){var o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)};
menu.addEventListener("click",function(e){if(e.target.tagName==="A"){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}});

/* ---------- renderers ---------- */
var explore=[["Digital Marketing","Strategy, channels and growth basics."],["AI & Technology","Tools and developments, explained."],["Creativity & Content","Ideas, storytelling and formats."],["Innovation & Business","New ideas and how businesses grow."]];
$("#explore").innerHTML=explore.map(function(e){return '<article class="card"><h3>'+e[0]+'</h3><p>'+e[1]+'</p></article>'}).join("");
$("#collab-list").innerHTML=window.COLLAB.map(function(c){return "<li>"+esc(c)+"</li>"}).join("");
$("#learn-grid").innerHTML=window.LEARN.map(function(l){return '<article class="card"><span class="badge">Guides coming soon</span><h3 style="margin-top:.6rem">'+l[0]+'</h3><p>'+l[1]+'</p></article>'}).join("");

function card(a){return '<article class="card"><div class="meta"><span class="cat">'+esc(a.cat)+'</span><span>'+a.date+'</span><span>'+a.read+' min read</span><span class="badge">Sample</span></div><h3><a href="#/post/'+a.slug+'">'+esc(a.title)+'</a></h3><p>'+esc(a.excerpt)+'</p></article>'}
function filters(box,cats,cb){box.innerHTML=cats.map(function(c,i){return '<button type="button" aria-pressed="'+(i===0)+'">'+c+'</button>'}).join("");
 box.onclick=function(e){if(e.target.tagName!=="BUTTON")return;$$("button",box).forEach(function(b){b.setAttribute("aria-pressed",b===e.target)});cb(e.target.textContent)}}
function insights(c){var l=window.ARTICLES.filter(function(a){return c==="All"||a.cat===c});$("#insight-grid").innerHTML=l.length?l.map(card).join(""):'<p class="empty">No articles in this category yet.</p>'}
function trends(c){var l=window.TRENDS.filter(function(t){return c==="All"||t.cat===c});$("#trend-grid").innerHTML=l.map(function(t){return '<article class="card"><div class="meta"><span class="cat">'+t.cat+'</span><span class="badge">Topic, not news</span></div><h3>'+t.title+'</h3><p>'+t.text+'</p></article>'}).join("")}
filters($("#insight-filters"),window.INSIGHT_CATS,insights);insights("All");
filters($("#trend-filters"),window.TREND_CATS,trends);trends("All");
var f=window.ARTICLES.filter(function(a){return a.featured})[0]||window.ARTICLES[0];
$("#featured").innerHTML='<div><div class="meta"><span class="cat" style="color:var(--blue);font-weight:700">Featured · '+esc(f.cat)+'</span> <span class="badge">Sample</span></div><h3>'+esc(f.title)+'</h3><p>'+esc(f.excerpt)+'</p></div><a class="btn" href="#/post/'+f.slug+'">Read article</a>';
function blog(q){q=q.toLowerCase();var l=window.ARTICLES.filter(function(a){return(a.title+a.cat+a.excerpt).toLowerCase().indexOf(q)>-1});$("#blog-grid").innerHTML=l.length?l.map(card).join(""):'<p class="empty">No articles match “'+esc(q)+'”. Try another word.</p>'}
blog("");$("#search").oninput=function(){blog(this.value)};

/* ---------- article view / routing ---------- */
var av=$("#article-view"),mainEl=$("#main"),title0=document.title;
function show(){
 var h=location.hash,m=h.match(/^#\/post\/([\w-]+)$/);
 if(m){var a=window.ARTICLES.filter(function(x){return x.slug===m[1]})[0];
  if(a){var url=(C.siteUrl||location.href.split("#")[0])+"#/post/"+a.slug,u=encodeURIComponent(url),t=encodeURIComponent(a.title);
   var rel=window.ARTICLES.filter(function(x){return x.slug!==a.slug}).sort(function(x,y){return(y.cat===a.cat)-(x.cat===a.cat)}).slice(0,3);
   av.innerHTML='<article><a class="back" href="#blogs">← Back to blogs</a><h1>'+esc(a.title)+'</h1><div class="meta"><span class="cat" style="color:var(--blue);font-weight:700">'+esc(a.cat)+'</span> &nbsp; '+a.date+' &nbsp; '+a.read+' min read &nbsp; <span class="badge">Sample article</span></div>'+a.body.map(function(p){return "<p>"+esc(p)+"</p>"}).join("")+
   '<div class="share"><span>Share:</span><a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url='+u+'">LinkedIn</a><a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u='+u+'">Facebook</a><a target="_blank" rel="noopener" href="https://wa.me/?text='+t+'%20'+u+'">WhatsApp</a><button type="button" id="copy">Copy link</button></div></article><h2>Related articles</h2><div class="grid g3">'+rel.map(card).join("")+'</div>';
   av.hidden=false;mainEl.hidden=true;document.title=a.title+" — Aaryaverse AI Media";window.scrollTo(0,0);
   $("#copy").onclick=function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject()).then(function(){b.textContent="Link copied"},function(){b.textContent="Copy not available"})};return}}
 av.hidden=true;mainEl.hidden=false;document.title=title0;
 if(h&&h.length>1&&h.indexOf("#/")!==0){var el=document.getElementById(h.slice(1));if(el)setTimeout(function(){el.scrollIntoView()},0)}
 else if(h.indexOf("#/")===0){av.hidden=false;av.innerHTML='<p>Article not found. <a class="back" href="#blogs">Back to blogs</a></p>';mainEl.hidden=true}
}
window.addEventListener("hashchange",show);show();

/* ---------- scroll reveal + active nav ---------- */
if("IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
 $$(".reveal").forEach(function(n){io.observe(n)});
 var nav=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$$("#menu a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id||(e.target.id==="collaborate"||e.target.id==="contact")&&a.getAttribute("href")==="#contact")})}})},{rootMargin:"-45% 0px -50% 0px"});
 $$("main section[id]").forEach(function(s){nav.observe(s)})}else{$$(".reveal").forEach(function(n){n.classList.add("in")})}

/* ---------- enquiry form (never fakes success) ---------- */
var form=$("#collab-form"),st=$("#form-status");
form.addEventListener("submit",function(e){
 e.preventDefault();st.className="";
 if(form.company_website.value)return; // spam trap
 if(!form.checkValidity()){st.className="err";st.textContent="Please complete the required fields with valid details.";form.reportValidity();return}
 var d={name:form.name.value,email:form.email.value,brand:form.brand.value,link:form.link.value,type:form.type.value,message:form.message.value};
 if(!C.formEndpoint){
  var body=encodeURIComponent("Name: "+d.name+"\nEmail: "+d.email+"\nBrand: "+d.brand+"\nLink: "+d.link+"\nCollaboration: "+d.type+"\n\n"+d.message);
  st.className="err";st.innerHTML='The online form is not connected yet, so nothing was sent. <a href="mailto:'+C.email+'?subject='+encodeURIComponent("Collaboration enquiry: "+d.type)+'&body='+body+'">Send this enquiry by email instead</a>.';return}
 var btn=$("button",form);btn.disabled=true;st.textContent="Sending…";
 fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(d)})
 .then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){if(!j||!j.ok)throw 0;form.reset();st.textContent="Thank you — your enquiry has been received. We review every request before replying."})
 .catch(function(){st.className="err";st.innerHTML='We could not confirm that your enquiry was sent. Please email <a href="mailto:'+C.email+'">'+C.email+'</a>.'})
 .then(function(){btn.disabled=false});
});
})();
