const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({});
const Mustache = require('mustache');
const fs = require("fs");

octokit.rest.issues.listForRepo({
	owner: 'narutaro',
	repo: 'blog',
})
.then(issues => {

	/* Build index */
	console.log(issues)
	const index_template = fs.readFileSync("template/index.template.html", "utf8").toString();
	const index_html = Mustache.render(index_template, issues)
	console.log(index_html)
	fs.writeFileSync("index.html", index_html, "utf8");

	/* Build post */
	issue_id = "1221768777" // context.issue.id
	target_issue = issues.data.filter((issue) => {
		console.log(issue.id)
		return issue.id == issue_id 
	});

	markdown = target_issue[0].body
	console.log(markdown)
	const issue_template = fs.readFileSync("template/post.template.html", "utf8").toString();
  octokit.request('POST /markdown', {"text": markdown, "mode": "gfm"})
	.then(issue_html => {
		console.log(issue_html)
		const issue_page = Mustache.render(issue_template, issue_html)
	  fs.writeFileSync("posts/issue_id.html", issue_page, "utf8");
		console.log(issue_html.data)
	})

});


// id 1221768777
//html = octokit.request('POST /markdown', {"text": context.payload.issue.body, "mode": "gfm"})
//console.log(html.data)
