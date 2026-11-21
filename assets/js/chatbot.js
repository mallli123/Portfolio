/* Portfolio chatbot: a simple question-and-answer helper for recruiters.
   It runs fully in the browser (no server, no AI service). To change an answer,
   edit the PROFILE block below. */
(function () {
	'use strict';

	/* ============ EDIT YOUR DETAILS HERE ============ */
	var PROFILE = {
		name: 'Mallikarjuna Reddy Perla',
		role: 'MIS Analyst',
		company: 'Mangatrai Jewellers',
		since: 'Sep 2026',
		location: 'Madhapur, Hyderabad',
		relocation: 'Yes, I am open to relocating to any city.',
		notice: '60 days',
		salary: 'My expected salary is negotiable and based on the role and responsibilities. I am happy to discuss it once I know more about the position.',
		resumeUrl: 'assets/resume/Mallikarjuna_Reddy_Resume.pdf',
		hours: '10:00 AM to 8:00 PM',
		experience: '3 years of experience in data analysis, MIS reporting and automation.',
		education: 'B.Tech from Vel Tech University (2022).',
		email: 'perlamalli444@gmail.com',
		phone: '+91 63029 08417',
		phoneLink: '+916302908417',
		linkedin: 'https://www.linkedin.com/in/mallli/',
		github: 'https://github.com/mallli123'
	};
	/* ================================================= */

	var A = function (href, text) {
		return '<a href="' + href + '" target="_blank" rel="noopener">' + text + '</a>';
	};

	// Each topic: keywords (any match counts), a label for the quick-reply chip, and the answer.
	var TOPICS = [
		{
			id: 'role', chip: 'Current role & company',
			words: ['role', 'designation', 'company', 'employer', 'organization', 'organisation', 'position',
				'job title', 'where do you work', 'currently work', 'working as', 'working at', 'current job', 'present job'],
			answer: function () {
				return 'I am currently working as an <b>' + PROFILE.role + '</b> at <b>' + PROFILE.company +
					'</b>, Hyderabad (since ' + PROFILE.since + ').';
			}
		},
		{
			id: 'location', chip: 'Current location',
			words: ['location', 'city', 'based', 'where do you live', 'where are you', 'address', 'hyderabad', 'live in', 'staying'],
			answer: function () { return 'I am based in <b>' + PROFILE.location + '</b>.'; }
		},
		{
			id: 'notice', chip: 'Notice period',
			words: ['notice', 'join', 'joining', 'available', 'availability', 'how soon', 'start date', 'when can you'],
			answer: function () {
				return 'My notice period is <b>' + PROFILE.notice + '</b>.';
			}
		},
		{
			id: 'hours', chip: 'Working timings',
			words: ['timing', 'timings', 'hours', 'shift', 'schedule', 'office time', 'work time', 'working time', 'time to call', 'best time'],
			answer: function () {
				return 'My current working hours are <b>' + PROFILE.hours + '</b>. For calls, it is best to message first so we can fix a time.';
			}
		},
		{
			id: 'relocation', chip: 'Open to relocation?',
			words: ['relocate', 'relocation', 'move to', 'other city', 'other cities', 'shift to', 'outside hyderabad', 'bangalore', 'bengaluru', 'pune', 'chennai', 'mumbai', 'delhi', 'remote', 'hybrid', 'work from home', 'wfh'],
			answer: function () { return PROFILE.relocation; }
		},
		{
			id: 'salary', chip: 'Expected salary',
			words: ['salary', 'ctc', 'package', 'expected', 'lpa', 'compensation', 'current pay', 'hike', 'negotiable', 'negotiation', 'pay scale'],
			answer: function () { return PROFILE.salary; }
		},
		{
			id: 'resume', chip: 'Download resume',
			words: ['resume', 'cv', 'curriculum vitae', 'download', 'profile pdf'],
			answer: function () {
				return 'You can download my resume here:<br><a class="cb-dl" href="' + PROFILE.resumeUrl +
					'" download="Mallikarjuna_Reddy_Resume.pdf"><i class="fas fa-download" aria-hidden="true"></i> Download resume (PDF)</a>';
			}
		},
		{
			id: 'experience', chip: 'Experience',
			words: ['experience', 'years', 'how long', 'background', 'about you', 'yourself', 'introduce'],
			answer: function () { return PROFILE.experience + ' I work with SQL, Power BI, Excel and Python.'; }
		},
		{
			id: 'skills', chip: 'Skills',
			words: ['skill', 'skills', 'tool', 'tools', 'tech', 'technology', 'stack', 'sql', 'mysql', 'power bi', 'powerbi', 'excel', 'python', 'pandas', 'looker', 'dax', 'rfm', 'segmentation'],
			answer: function () {
				return 'My main skills: <b>MySQL</b>, <b>Power BI</b> (DAX), <b>Advanced Excel</b>, <b>Python</b> (Pandas, Matplotlib, Seaborn), Looker Studio, Google Sheets, data cleaning, EDA, KPI reporting and RFM customer segmentation.';
			}
		},
		{
			id: 'projects', chip: 'Projects',
			words: ['project', 'projects', 'portfolio', 'work sample', 'dashboard', 'github', 'code'],
			answer: function () {
				return 'My projects, each with code on GitHub:<ul>' +
					'<li>' + A('https://github.com/mallli123/Bi_SQL-Project', 'Pizza Analysis (SQL + Power BI)') + '</li>' +
					'<li>' + A('https://github.com/mallli123/Python_Project', 'Exploratory Data Analysis (Python)') + '</li>' +
					'<li>' + A('https://github.com/mallli123/Music_store-SQL-', 'Music Store Analysis (SQL)') + '</li>' +
					'<li>' + A('https://github.com/mallli123/Excel_Project', 'Coffee Shop Sales Analysis (Excel)') + '</li></ul>';
			}
		},
		{
			id: 'education', chip: 'Education',
			words: ['education', 'degree', 'qualification', 'college', 'university', 'study', 'studied', 'graduate', 'b.tech', 'btech', 'cgpa'],
			answer: function () { return PROFILE.education; }
		},
		{
			id: 'contact', chip: 'Contact',
			words: ['contact', 'email', 'mail', 'phone', 'call', 'number', 'reach', 'linkedin', 'whatsapp', 'connect', 'hire', 'hiring', 'interview'],
			answer: function () {
				return 'You can reach me here:<ul>' +
					'<li>Email: ' + A('mailto:' + PROFILE.email, PROFILE.email) + '</li>' +
					'<li>Phone: ' + A('tel:' + PROFILE.phoneLink, PROFILE.phone) + '</li>' +
					'<li>' + A(PROFILE.linkedin, 'LinkedIn') + ' &middot; ' + A(PROFILE.github, 'GitHub') + '</li></ul>';
			}
		}
	];

	var GREETING = ['hi', 'hello', 'hey', 'hii', 'namaste', 'good morning', 'good afternoon', 'good evening'];
	var THANKS = ['thank', 'thanks', 'thx', 'great', 'ok thanks'];

	function norm(s) { return ' ' + s.toLowerCase().replace(/[^a-z0-9.+ ]/g, ' ').replace(/\s+/g, ' ').trim() + ' '; }

	function has(text, word) {
		// whole-word / phrase match so "sql" does not match inside other words
		return text.indexOf(' ' + word + ' ') !== -1 || text.indexOf(' ' + word + 's ') !== -1;
	}

	function reply(question) {
		var t = norm(question);
		var out = [];
		if (!t.trim()) return out;

		var scored = [];
		TOPICS.forEach(function (topic, idx) {
			var score = 0;
			topic.words.forEach(function (w) { if (has(t, w)) score += w.indexOf(' ') !== -1 ? 2 : 1; });
			if (score > 0) scored.push({ topic: topic, score: score, idx: idx });
		});
		scored.sort(function (a, b) { return b.score - a.score || a.idx - b.idx; });

		scored.slice(0, 3).forEach(function (s) { out.push(s.topic.answer()); });

		if (!out.length) {
			if (GREETING.some(function (w) { return has(t, w); })) {
				out.push('Hello! You can ask me about my current role, location, notice period or working hours.');
			} else if (THANKS.some(function (w) { return t.indexOf(w) !== -1; })) {
				out.push('You are welcome! Feel free to ask anything else, or email me at ' + A('mailto:' + PROFILE.email, PROFILE.email) + '.');
			} else {
				out.push('I am not sure about that one. Please email me at ' + A('mailto:' + PROFILE.email, PROFILE.email) +
					' or call ' + A('tel:' + PROFILE.phoneLink, PROFILE.phone) + ' and I will get back to you.');
			}
		}
		return out;
	}

	/* ---------- UI ---------- */
	function el(tag, cls, attrs) {
		var n = document.createElement(tag);
		if (cls) n.className = cls;
		if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
		return n;
	}

	function build() {
		var launcher = el('button', 'cb-launcher', { type: 'button', 'aria-label': 'Open chat', 'aria-expanded': 'false', 'aria-controls': 'cbPanel' });
		launcher.innerHTML = '<i class="fas fa-comment-dots" aria-hidden="true"></i><span>Ask me</span>';

		var panel = el('section', 'cb-panel', { id: 'cbPanel', role: 'dialog', 'aria-label': 'Chat with ' + PROFILE.name, hidden: '' });
		panel.innerHTML =
			'<header class="cb-head">' +
				'<div class="cb-avatar" aria-hidden="true">M</div>' +
				'<div class="cb-title"><strong>Ask about ' + PROFILE.name + '</strong><span>Quick answers for recruiters</span></div>' +
				'<button type="button" class="cb-close" aria-label="Close chat"><i class="fas fa-times" aria-hidden="true"></i></button>' +
			'</header>' +
			'<div class="cb-log" role="log" aria-live="polite"></div>' +
			'<div class="cb-chips" aria-label="Suggested questions"></div>' +
			'<form class="cb-form" autocomplete="off">' +
				'<input class="cb-input" type="text" maxlength="200" placeholder="Type your question..." aria-label="Your question" />' +
				'<button class="cb-send" type="submit" aria-label="Send"><i class="fas fa-paper-plane" aria-hidden="true"></i></button>' +
			'</form>';

		document.body.appendChild(launcher);
		document.body.appendChild(panel);

		var log = panel.querySelector('.cb-log');
		var chips = panel.querySelector('.cb-chips');
		var form = panel.querySelector('.cb-form');
		var input = panel.querySelector('.cb-input');
		var started = false;

		function addBot(html) {
			var m = el('div', 'cb-msg cb-bot'); m.innerHTML = html; log.appendChild(m);
			log.scrollTop = log.scrollHeight;
		}
		function addUser(text) {
			var m = el('div', 'cb-msg cb-user'); m.textContent = text; log.appendChild(m);
			log.scrollTop = log.scrollHeight;
		}
		function ask(text) {
			addUser(text);
			var typing = el('div', 'cb-msg cb-bot cb-typing'); typing.innerHTML = '<i></i><i></i><i></i>';
			log.appendChild(typing); log.scrollTop = log.scrollHeight;
			setTimeout(function () {
				typing.remove();
				reply(text).forEach(addBot);
			}, 420);
		}

		TOPICS.forEach(function (topic) {
			var b = el('button', 'cb-chip', { type: 'button' });
			b.textContent = topic.chip;
			b.addEventListener('click', function () { ask(topic.chip); });
			chips.appendChild(b);
		});

		function open() {
			panel.hidden = false; launcher.setAttribute('aria-expanded', 'true'); launcher.classList.add('is-open');
			if (!started) {
				started = true;
				addBot('Hi! I am the assistant for <b>' + PROFILE.name + '</b>. Tap a question below or type your own. For example: <i>notice period</i>, <i>current location</i> or <i>working hours</i>.');
			}
			setTimeout(function () { input.focus(); }, 50);
		}
		function close() {
			panel.hidden = true; launcher.setAttribute('aria-expanded', 'false'); launcher.classList.remove('is-open'); launcher.focus();
		}

		launcher.addEventListener('click', function () { panel.hidden ? open() : close(); });
		panel.querySelector('.cb-close').addEventListener('click', close);
		document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close(); });
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var v = input.value.trim();
			if (!v) return;
			input.value = '';
			ask(v);
		});

		// exposed for testing
		window.__chatbotReply = reply;
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
