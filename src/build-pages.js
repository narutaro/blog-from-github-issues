const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({});
const Mustache = require('mustache');
const fs = require("fs");


// context for running local
/*
const context = {
	repo: {
		owner: 'narutaro',
		repo: 'blog'
	},
	payload: {
		issue: {
			id: 1221768777
		}
	}
}
*/

octokit.rest.issues.listForRepo({
	owner: context.repo.owner,
	repo: context.repo.repo,
})
.then(issues => {

	// Build index
	const index_template = fs.readFileSync("template/index.template.html", "utf8").toString();
	const index_html = Mustache.render(index_template, issues)
	fs.writeFileSync("index.html", index_html, "utf8");

	// Build post
	target_issue = issues.data.filter((ti) => {
		return ti.id == context.payload.issue.id
	});

	markdown = target_issue[0].body
	const issue_template = fs.readFileSync("template/post.template.html", "utf8").toString();
  octokit.rest.markdown.render({"text": markdown, "mode": "gfm"})
	.then(issue_html => {
		const issue_page = Mustache.render(issue_template, issue_html)
	  fs.writeFileSync("posts/" + context.payload.issue.id + ".html", issue_page, "utf8");
	})

});
