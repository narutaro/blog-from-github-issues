const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({});
const Mustache = require('mustache');
const fs = require("fs");

octokit.rest.issues.listForRepo({
	owner: 'narutaro',
	repo: 'blog',
}).then(issues => {
	console.log(issues)
	const template = fs.readFileSync("../template/index.template.html", "utf8").toString();
	let html = Mustache.render(template, issues)
	console.log(html)
	fs.writeFileSync("index.local.html", html);
});
