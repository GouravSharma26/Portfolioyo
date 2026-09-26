
// hero-fx.js
document.addEventListener('DOMContentLoaded', () => {
  // Hero Editor Typing Logic
  const snippets = [
    {
      tabId: 'tab-0',
      html: `<span class="kw">export default function</span> <span class="fn">ProjectCard</span>({ project }) {\n  <span class="kw">return</span> (\n    <span class="tag">&lt;div</span> className=<span class="str">"card hover-effect"</span><span class="tag">&gt;</span>\n      <span class="tag">&lt;h3&gt;</span>{project.title}<span class="tag">&lt;/h3&gt;</span>\n      <span class="tag">&lt;p&gt;</span>{project.tagline}<span class="tag">&lt;/p&gt;</span>\n      <span class="tag">&lt;TechStack</span> stack={project.tech} /<span class="tag">&gt;</span>\n    <span class="tag">&lt;/div&gt;</span>\n  );\n}`
    },
    {
      tabId: 'tab-1',
      html: `<span class="kw">from</span> django.http <span class="kw">import</span> JsonResponse\n<span class="kw">from</span> .models <span class="kw">import</span> Project\n\n<span class="kw">def</span> <span class="fn">get_projects</span>(request):\n    <span class="cmt"># Fetch active projects ordered by date</span>\n    projects = Project.objects.filter(is_active=<span class="kw">True</span>).order_by(<span class="str">'-date'</span>)\n    data = [{<span class="str">'id'</span>: p.id, <span class="str">'title'</span>: p.title} <span class="kw">for</span> p <span class="kw">in</span> projects]\n    <span class="kw">return</span> JsonResponse({<span class="str">'status'</span>: <span class="str">'success'</span>, <span class="str">'data'</span>: data})`
    },
    {
      tabId: 'tab-2',
      html: `<span class="kw">SELECT</span> p.id, p.title, c.name <span class="kw">AS</span> category\n<span class="kw">FROM</span> projects p\n<span class="kw">INNER JOIN</span> categories c <span class="kw">ON</span> p.category_id = c.id\n<span class="kw">WHERE</span> p.is_active = <span class="kw">true</span>\n<span class="kw">ORDER BY</span> p.created_at <span class="kw">DESC</span>\n<span class="kw">LIMIT</span> <span class="str">10</span>;`
    }
  ];

  const typeArea = document.getElementById('editor-typing');
  const tabs = document.querySelectorAll('.hero-editor .tab');
  
  if (typeArea && tabs.length > 0) {
    const parseSnippet = (htmlStr) => {
      const parts = [];
      let inTag = false;
      let currentPart = "";
      for (let i = 0; i < htmlStr.length; i++) {
        const char = htmlStr[i];
        if (char === '<') {
          inTag = true;
          currentPart = "<";
        } else if (char === '>') {
          inTag = false;
          currentPart += ">";
          parts.push({ type: 'tag', content: currentPart });
          currentPart = "";
        } else if (inTag) {
          currentPart += char;
        } else {
          parts.push({ type: 'char', content: char });
        }
      }
      return parts;
    };

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const runTypingLoop = async () => {
      let snippetIdx = 0;
      while (document.contains(typeArea)) {
        const snippet = snippets[snippetIdx];
        tabs.forEach(t => t.classList.remove('active'));
        document.getElementById(snippet.tabId).classList.add('active');
        
        const chunks = parseSnippet(snippet.html);
        typeArea.innerHTML = '';
        let currentHTML = '';
        
        for (const chunk of chunks) {
          if (!document.contains(typeArea)) return;
          currentHTML += chunk.content;
          typeArea.innerHTML = currentHTML + '<span class="cursor blink">|</span>';
          if (chunk.type === 'char') await sleep(30 + Math.random() * 30);
        }
        
        await sleep(2000);
        
        for (let i = chunks.length - 1; i >= 0; i--) {
          if (!document.contains(typeArea)) return;
          currentHTML = currentHTML.slice(0, -chunks[i].content.length);
          typeArea.innerHTML = currentHTML + '<span class="cursor blink">|</span>';
          if (chunks[i].type === 'char') await sleep(15);
        }
        
        await sleep(500);
        snippetIdx = (snippetIdx + 1) % snippets.length;
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const snippet = snippets[0];
      tabs.forEach(t => t.classList.remove('active'));
      document.getElementById(snippet.tabId).classList.add('active');
      typeArea.innerHTML = snippet.html;
    } else {
      runTypingLoop();
    }
  }

  // Hero Role Typewriter
  const roleWords = [
    "Aspiring Software Developer",
    "Full Stack Web Developer",
    "React & Django Enthusiast"
  ];
  const roleEl = document.getElementById('hero-typewriter');
  if (roleEl) {
    let rWordIdx = 0;
    let rCharIdx = 0;
    let rIsDeleting = false;
    const typeRole = () => {
      const currentWord = roleWords[rWordIdx];
      if (rIsDeleting) {
        roleEl.textContent = currentWord.substring(0, rCharIdx - 1);
        rCharIdx--;
      } else {
        roleEl.textContent = currentWord.substring(0, rCharIdx + 1);
        rCharIdx++;
      }
      let delay = rIsDeleting ? 50 : 70;
      if (!rIsDeleting && rCharIdx === currentWord.length) {
        delay = 1500;
        rIsDeleting = true;
      } else if (rIsDeleting && rCharIdx === 0) {
        rIsDeleting = false;
        rWordIdx = (rWordIdx + 1) % roleWords.length;
        delay = 500;
      }
      setTimeout(typeRole, delay);
    };
    setTimeout(typeRole, 500);
  }
});
