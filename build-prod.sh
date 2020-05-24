cd dist
rm -r sorting-website sorting-website.zip

ng build --prod true --base-href /sorting-website/
zip -r sorting-website.zip sorting-website/
rm -r sorting-website/