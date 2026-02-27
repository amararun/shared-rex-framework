> [\!NOTE]
> This repository is a working example of the concept described below. It may not yet include all recommended security hardening measures. My newer repositories now have robust security at both frontend and backend layers — rate limiting, SQL validation, concurrency controls, error sanitization, and more. You can use this repo to understand the core concept, but please apply security best practices before deploying to production. See my [80+ item Security Checklist](https://tigzig.com/security) and [live hardened examples](https://tigzig.com/security-examples) for reference.

## Getting Started
Follow these instructions to set up and run the project locally.
   - My app is deployed on Vercel, which offers a one-click deploy feature.
   - You can also use other platforms like Netlify or any of the numerous other deployment platforms available.


### 1. Clone the Repository
First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/amararun/shared-rex-framework .
```
**Note:** Check for the latest shared repository name in case it has changed.


### 2. Remove Statcounter Web Analytics Code Patch
I have a Statcounter web analytics code patch in `index.html`. You can remove that.


### 3. Install Dependencies (in root directory)
Install the necessary dependencies using npm:
```bash
npm install
```

### 3. Run the Development Server
Start the development server:
```bash
npm run dev
```
That's it. The application should now be running locally. 

## Important:
1. This is just the navigation framework along with the help and build menus.  
2. All the individual apps, including the Analyzer AI, are standalone applications and are embeds of their individual published URLs.
3. It would work right off the bat but would be displaying my published apps.  
4. As a next step, you would want to replace them with your individual customized apps. For instance:
   - For the Analyzer AI app, you can clone that individual repo, customize it, publish it, and replace the URL with that of your published app.  
5. The framework provides you with the flexibility to customize the navigation menu as per your requirements and embed your individual apps.

Remove existing git file, initialize your git repository and push your changes to your remote repository.
## Author

Built by [Amar Harolikar](https://www.linkedin.com/in/amarharolikar/)

Explore 30+ open source AI tools for analytics, databases & automation at [tigzig.com](https://tigzig.com)
