# Upload to GitHub

A simple site to upload (paste images) to a GitHub repository.

### Usage

1. Install Deno if you don't have it. [Visit deno.land](https://deno.land/)
2. Copy `.env.sample` to `.env`
3. Update the `.env` file with the correct info
  1. You can use GitHub's new feature "fine-grained personal access tokens" to
     limit this app's permissions to a specific repos.

     Visit [Fine-grained personal access tokens](https://github.com/settings/tokens?type=beta) and generate a token for your repo, with `read and write access in Contents`
4. Run `deno task start` to start the application


