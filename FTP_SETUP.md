# FTP Deployment Setup Guide

## Setting up GitHub Secrets for FTP Deployment

To enable automatic FTP deployment, you need to add the following secrets to your GitHub repository:

### Required Secrets

1. **FTP_SERVER** - Your FTP server hostname (e.g., `ftp.your-domain.com`)
2. **FTP_USERNAME** - Your FTP username
3. **FTP_PASSWORD** - Your FTP password

### How to Add Secrets

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each of the required secrets:
   - Name: `FTP_SERVER`, Value: `your-ftp-hostname`
   - Name: `FTP_USERNAME`, Value: `your-ftp-username`
   - Name: `FTP_PASSWORD`, Value: `your-ftp-password`

### Deployment Process

- The workflow deploys to the `/clock/` directory on your FTP server
- Deployment triggers automatically on push to `main` or `master` branch
- You can also trigger deployment manually from the Actions tab
- The build process includes testing before deployment

### File Structure on Server

After deployment, your files will be available at:
```
your-domain.com/clock/
├── index.html
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── vendor-[hash].js
└── [other static files]
```

Your Space Clock will be accessible at: `https://your-domain.com/clock/`
