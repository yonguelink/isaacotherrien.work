@echo off
aws s3 sync . s3://dianeouellet.ca --exclude ".git/*" --exclude "LICENSE" --exclude "*.md" --exclude ".git*" --exclude "*.bat"