#!/bin/sh
set -e

echo "Waiting for database..."
until nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

echo "Running database migrations..."
npx prisma migrate deploy || npx prisma db push

echo "Generating Prisma client..."
npx prisma generate

echo "Starting application..."
exec "$@"
