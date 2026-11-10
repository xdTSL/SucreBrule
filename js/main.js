(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');
  // header achtergrond na scrollen
  var top=d.getElementById('top');
  function s(){top.classList.toggle('solid',window.scrollY>40)}
  s(); window.addEventListener('scroll',s,{passive:true});
  // reveal: tekst en beeld verschijnen alleen als ze onder de vouw staan; zonder JS of bij verminderde beweging is alles meteen zichtbaar
  var calm=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  d.querySelectorAll('.sec h2,.sec .lead,.story .body>*,.trio>div,.row h3,.row .moment,.noten li,.ml-wrap,.vid').forEach(function(el,i){el.classList.add('rt')});
  d.querySelectorAll('.trio>div,.noten li').forEach(function(el,i){el.style.setProperty('--d',((i%4)*.09)+'s')});
  d.querySelectorAll('.story .body>*').forEach(function(el,i){el.style.setProperty('--d',(i*.08)+'s')});
  var rv=[].slice.call(d.querySelectorAll('.rv,.rt'));
  function show(el){el.classList.add('in')}
  if(!calm && 'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
      // kleine vertraging zodat de verborgen beginstand zeker getekend is: de animatie speelt dan altijd af
      var el=e.target; io.unobserve(el); setTimeout(function(){show(el)},60);
    }})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    rv.forEach(function(el){
      if(el.closest('.hero'))return; // alleen de hero staat er meteen
      el.style.transition='none'; el.classList.add('pre'); void el.offsetWidth; el.style.transition=''; io.observe(el);
    });
    // vangnet per element bij scrollen
    var tick=false;
    function check(){tick=false;rv.forEach(function(el){if(el.classList.contains('pre')&&!el.classList.contains('in')){var r=el.getBoundingClientRect();if(r.top<window.innerHeight*.8&&r.bottom>0)show(el)}})}
    window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(check)}},{passive:true});
    window.addEventListener('resize',function(){if(!tick){tick=true;requestAnimationFrame(check)}});
    window.addEventListener('load',function(){setTimeout(check,700)});
  }
  // beelden alvast decoderen zodat ze niet pas bij het scrollen "laden"
  window.addEventListener('load',function(){[].forEach.call(d.images,function(im){if(im.decode)im.decode().catch(function(){})})});
  // beeldstrook: slepen met de muis (aanraking en toetsenbord werken van zichzelf)
  var st=d.querySelector('.strip'),sx=0,sl=0,dn=false;
  if(st){
    st.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;sx=e.clientX;sl=st.scrollLeft;st.classList.add('drag')});
    window.addEventListener('pointermove',function(e){if(dn)st.scrollLeft=sl-(e.clientX-sx)});
    window.addEventListener('pointerup',function(){dn=false;st.classList.remove('drag')});
  }
  // magnetische CTA: trekt zacht naar de cursor (alleen transform, geen re-render)
  if(window.matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){
    [].forEach.call(d.querySelectorAll('.round .c'),function(c){
      var a=c.parentNode;
      a.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.translate=((e.clientX-r.left-r.width/2)*.25)+'px '+((e.clientY-r.top-r.height/2)*.25)+'px'});
      a.addEventListener('pointerleave',function(){c.style.translate=''});
    });
  }
})();
