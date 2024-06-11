import os

def rename_repos_to_temporary_names(repos):
    temp_suffix = "_temp"
    for repo in repos:
        temp_name = repo.lower() + temp_suffix
        if os.path.isdir(repo):
            os.rename(repo, temp_name)
            print(f"Renamed {repo} to {temp_name}")
    return temp_suffix

def rename_repos_to_lowercase(repos, temp_suffix):
    for repo in repos:
        temp_name = repo.lower() + temp_suffix
        if os.path.isdir(temp_name):
            os.rename(temp_name, repo.lower())
            print(f"Renamed {temp_name} to {repo.lower()}")

repos = [
    "Blog-card",
    "Order-summary-component",
    "Profile-card-component",
    "Qr-code",
    "Recipe-page",
    "Results-summary",
    "Single-price-grid-component",
    "Social-links-profile",
    "Stats-preview-card-component",
    "nft-preview-card-component",
    "product-preview-card-component"
]

temp_suffix = rename_repos_to_temporary_names(repos)

rename_repos_to_lowercase(repos, temp_suffix)

os.system('git add -A')
os.system('git commit -m "Renamed directories to lowercase"')
