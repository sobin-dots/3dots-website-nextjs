
module.exports = {
  apps: [
    {
      name: "3dots",
      cwd: "/root/3dots-website-nextjs",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        DATABASE_URL: "postgresql://threedots_user:3dotsdevA1!@localhost:5432/threedots_db",
        // add all your env variables here
      }
    }
  ]
}
