# Getting Started with Alamo Watched

## What You'll Need

1. **Docker Desktop** installed on your machine
2. Your **Alamo Drafthouse purchase history** JSON data

## How to Get Your Alamo Data

### Option 1: From Alamo Drafthouse Website
1. Log into your Alamo Drafthouse account
2. Navigate to your purchase history
3. Look for an export or API option
4. Copy the JSON data

### Option 2: From Browser Developer Tools
1. Log into drafthouse.com
2. Open browser Developer Tools (F12)
3. Go to Network tab
4. Navigate to your purchase history page
5. Find the API call that returns your purchase data
6. Copy the JSON response

The JSON should have this structure:
```json
{
  "data": {
    "purchaseHistory": {
      "purchases": [...]
    }
  }
}
```

## Running the Application

### Step 1: Start the Application

Open your terminal and navigate to the project directory:

```bash
cd /Users/matthewklein/Documents/personal/alamo_watched
```

Start the Docker containers:

```bash
docker-compose up --build
```

**First time setup will take a few minutes** as Docker:
- Downloads base images
- Installs all npm dependencies
- Sets up the database
- Runs migrations

### Step 2: Access the Application

Once you see:
```
✓ Ready in XXXms
```

Open your browser to:
```
http://localhost:3000
```

### Step 3: Analyze Your Data

1. **Paste your JSON** into the text area
2. **Wait for validation** - the border will turn green when valid
3. **Click "Analyze My Movies"**
4. **View your results!**

## What You'll See

### Summary Cards
- Total movies watched
- Total hours spent
- Your top market
- Average movie runtime

### Comparative Stats
- How you rank against other users
- Percentage of users you've watched more than
- Average movies per user

### Visualizations
- Movies by month (timeline of your year)
- Movies by day of week (are you a weekend warrior?)
- Movies by time of day (morning, afternoon, evening, late night)
- Rating distribution (G, PG, PG-13, R, etc.)

### Top Movies
- Your 10 most-watched films
- View counts for each
- Movie posters (when available)

### Favorite Movie Spotlight
- Your most-watched film
- Full details: year, runtime, director
- Movie poster

## Stopping the Application

Press `Ctrl+C` in the terminal where docker-compose is running, or:

```bash
docker-compose down
```

## Restarting Later

Next time you want to use it:

```bash
docker-compose up
```

No need for `--build` unless you've made code changes.

## Troubleshooting

### Port 3000 Already in Use

If you see an error about port 3000:

```bash
# Find what's using port 3000
lsof -ti:3000

# Kill that process
lsof -ti:3000 | xargs kill -9

# Try again
docker-compose up
```

### Database Connection Issues

```bash
# Restart just the database
docker-compose restart db

# Or start fresh
docker-compose down -v
docker-compose up --build
```

### "Invalid JSON" Error

Make sure your JSON:
- Is valid JSON (use jsonlint.com to check)
- Has the structure: `data.purchaseHistory.purchases`
- Contains at least one purchase

### Container Won't Start

```bash
# View logs
docker-compose logs app

# Clean rebuild
docker-compose down -v
docker system prune -f
docker-compose up --build
```

## Tips

### Save Your Results

Your results are saved in the database! Bookmark the results URL to view them again later:
```
http://localhost:3000/results/[your-session-id]
```

### Multiple Years

Want to compare different years? Just paste different JSON data and you'll get a new session each time.

### Privacy

- All data is stored locally in your Docker container
- No data is sent to external services
- Sessions are anonymous (no user accounts)
- You can delete all data by running: `docker-compose down -v`

## Next Steps

Once you're comfortable with the basics:

1. **Deploy to production** - See [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Customize the UI** - Edit files in `src/components/`
3. **Add new analytics** - Modify `src/lib/analyzer.ts`
4. **Share with friends** - Set up Cloudflare Tunnel

## Need Help?

Check these files:
- **QUICKSTART.md** - Detailed development guide
- **DEPLOYMENT.md** - Production deployment
- **README.md** - Project overview
- **decision-log.md** - Architecture decisions

## Example JSON Structure

Here's what a minimal valid JSON looks like:

```json
{
  "data": {
    "purchaseHistory": {
      "purchases": [
        {
          "marketName": "Los Angeles",
          "cinemaName": "DTLA",
          "sessionDateTimeUtc": "2025-11-22T18:42:46Z",
          "isRefunded": false,
          "film": {
            "slug": "the-long-kiss-goodnight1",
            "title": "THE LONG KISS GOODNIGHT",
            "year": "1996",
            "runtimeMinutes": 121,
            "rating": "R",
            "director": "Renny Harlin",
            "cast": "Geena Davis, Samuel L. Jackson",
            "posterImage": "https://..."
          }
        }
      ]
    }
  }
}
```

Enjoy exploring your movie-watching habits! 🎬
