import os

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

def rename_repos_to_lowercase(repos):
    for repo in repos:
        if os.path.isdir(repo):
            os.rename(repo, repo.lower())
            print(f"Renamed {repo} to {repo.lower()}")

rename_repos_to_lowercase(repos)
