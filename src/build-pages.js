const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({});
const Mustache = require('mustache');
const fs = require("fs");
const df = require("./date-format.js")
//sd = df.shortDate("2022-09-21T06:34:38Z")


/* Past these on your shell before you run locally
export owner=narutaro
export repo=blog
export target_issue_id=1198469728
*/

// Build
octokit.rest.issues.listForRepo({
  owner: process.env.owner,
  repo: process.env.repo,
})
.then(issues => {

  issues.owner = process.env.owner
  issues.repo = process.env.repo

  // Format issue object
  issues.data.map(issue => issue.updated_at_short = df.shortDate(issue.updated_at))
  console.log("issues: ", issues)

  // Build index
  const index_template = fs.readFileSync("template/index.template.html", "utf8").toString();
  const index_html = Mustache.render(index_template, issues)
  fs.writeFileSync("index.html", index_html, "utf8");

  // Build post
  target_issue = issues.data.filter((ti) => {
    return ti.id == process.env.target_issue_id
  });
  target_issue = target_issue[0]

  markdown = target_issue.body
  const issue_template = fs.readFileSync("template/post.template.html", "utf8").toString();
  octokit.rest.markdown.render({"text": markdown, "mode": "gfm"})
    .then(issue_html => {

      target_issue.issue_html = issue_html
      console.log("target_issue: ", target_issue)

      const issue_page = Mustache.render(issue_template, target_issue)
      // console.log(issue_page)
      fs.writeFileSync("posts/" + process.env.target_issue_id + ".html", issue_page, "utf8");
  })

});
