// Dynamic animated background (particles-like) lightweight vanilla JS
const canvas = document.createElement('canvas');
const dBg = document.getElementById('dynamic-bg');
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.position = 'absolute';
canvas.style.inset = '0';
canvas.style.zIndex = '0';
dBg.appendChild(canvas);

const ctx = canvas.getContext('2d');
let w, h, particles = [];

function resize(){
  const rect = dBg.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(devicePixelRatio, devicePixelRatio);
  w = rect.width; h = rect.height;
}
window.addEventListener('resize', () => { resize(); initParticles(); });
resize();

function rand(min, max){ return Math.random()*(max-min)+min }
function initParticles(){
  particles = [];
  const count = Math.max(12, Math.round(w/80));
  for(let i=0;i<count;i++){
    particles.push({
      x: rand(0,w),
      y: rand(0,h),
      r: rand(20,90),
      vx: rand(-0.15,0.15),
      vy: rand(-0.05,0.05),
      hue: rand(160,200),
      alpha: rand(0.06,0.18)
    });
  }
}
initParticles();

function draw(){
  ctx.clearRect(0,0,w,h);
  for(const p of particles){
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < -100) p.x = w + 100;
    if(p.x > w + 100) p.x = -100;
    if(p.y < -100) p.y = h + 100;
    if(p.y > h + 100) p.y = -100;
    const g = ctx.createRadialGradient(p.x, p.y, p.r*0.1, p.x, p.y, p.r);
    g.addColorStop(0, `hsla(${p.hue},80%,60%,${p.alpha})`);
    g.addColorStop(1, `hsla(${p.hue+40},70%,10%,0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', ()=> navList.classList.toggle('show'));

// set year
document.getElementById('year').textContent = new Date().getFullYear();

// simple contact form handler (no backend) - simulate send
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  formMsg.textContent = 'جاري الإرسال...';
  // simulate network latency
  await new Promise(r=>setTimeout(r,900));
  formMsg.textContent = 'تم الاستلام — سنرد عليك قريباً. شكراً!'; 
  form.reset();
});

// accessibility: close nav on link click (mobile)
document.querySelectorAll('.nav-list a').forEach(a=>{
  a.addEventListener('click', ()=> navList.classList.remove('show'));
});
